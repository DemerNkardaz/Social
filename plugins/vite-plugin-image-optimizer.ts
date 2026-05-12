import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

import type { Plugin, ViteDevServer } from 'vite'
import type {
  Sharp,
  Metadata,
  ResizeOptions,
  AvifOptions,
  WebpOptions,
  PngOptions,
  JpegOptions,
} from 'sharp'

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type OutputFormat = 'avif' | 'webp' | 'png' | 'jpeg' | 'jpg'

export interface AvifCompression extends Partial<AvifOptions> {}
export interface WebpCompression extends Partial<WebpOptions> {}
export interface PngCompression extends Partial<PngOptions> {}
export interface JpegCompression extends Partial<JpegOptions> {}

export type Compression =
  | AvifCompression
  | WebpCompression
  | PngCompression
  | JpegCompression

type ResizeByScale = {
  /** Relative multiplier, e.g. `0.5` halves both dimensions. */
  scale: number
  width?: never
  height?: never
	proportional?: never
	withoutEnlargement?: never
}

type ResizeByDimensions = {
  scale?: never
  /** Target width in pixels. */
  width?: number
  /** Target height in pixels. */
  height?: number
  /**
   * Preserve aspect ratio.
   * - `true` (default) — sharp `fit: inside` / `fit: contain`
   * - `false` — sharp `fit: fill` (may distort)
   */
	proportional?: boolean
	withoutEnlargement?: boolean
}

export type FormatDef = (ResizeByScale | ResizeByDimensions) & {
  /** Output format. */
  type: OutputFormat
  /**
   * Output filename template. `%name%` is replaced with the source basename.
   * E.g. `'%name%-1080'` → `hero-1080.avif`
   * Omit to keep the original name.
   */
  rename?: string
  /** Format-specific compression options passed directly to sharp. */
  compression?: Compression
}

export interface OptimizerConfig {
  /**
   * What to process. Each entry can be:
   *
   * | Kind              | Example                              |
   * |-------------------|--------------------------------------|
   * | Directory         | `'public/images'`                    |
   * | Glob pattern      | `'public/images/backdrop*'`          |
   * | Explicit file     | `'public/images/backdrop.png'`       |
   *
   * Paths are relative to `process.cwd()`.
   * For explicit files and globs, `extensions` is ignored — the path/pattern
   * itself determines which files are selected.
   */
  dirs: string[]
  /**
   * Source file extensions to collect when an entry resolves to a **directory**.
   * Not used for explicit file paths or glob patterns.
   * @default ['png', 'jpg', 'jpeg']
   */
  extensions?: string[]
  /** One or more output format descriptors. */
  formats: FormatDef[]
}

// ---------------------------------------------------------------------------
// Internal types
// ---------------------------------------------------------------------------

interface SimpleLogger {
  info(msg: string): void
  warn(msg: string): void
  error(msg: string): void
}

interface ResolvedSharpOptions {
  resizeOptions: ResizeOptions | null
  outputOptions: AvifOptions | WebpOptions | PngOptions | JpegOptions
}

type EntryKind = 'file' | 'glob' | 'directory'

// ---------------------------------------------------------------------------
// Entry resolution
// ---------------------------------------------------------------------------

const DEFAULT_EXTENSIONS = ['png', 'jpg', 'jpeg']

function normalizeExtensions(extensions?: string[]): string[] {
  return (extensions ?? DEFAULT_EXTENSIONS).map(e =>
    e.replace(/^\./, '').toLowerCase(),
  )
}

/**
 * Detect the kind of a single `dirs` entry.
 *
 * 1. Contains `*` or `?` → glob
 * 2. Exists on disk as a file → file
 * 3. Has a recognised image extension (but may not exist yet) → file
 * 4. Everything else → directory
 */
function classifyEntry(absEntry: string, imageExts: string[]): EntryKind {
  if (absEntry.includes('*') || absEntry.includes('?')) return 'glob'

  try {
    return fs.statSync(absEntry).isFile() ? 'file' : 'directory'
  } catch {
    const ext = path.extname(absEntry).slice(1).toLowerCase()
    return imageExts.includes(ext) ? 'file' : 'directory'
  }
}

/** Expand one `dirs` entry into a list of absolute image file paths. */
function resolveEntry(entry: string, imageExts: string[]): string[] {
  const abs = path.resolve(process.cwd(), entry)
  const kind = classifyEntry(abs, imageExts)

  switch (kind) {
    case 'file':
      return fs.existsSync(abs) ? [abs] : []

    case 'glob':
      return resolveGlob(abs, imageExts)

    case 'directory':
      return collectImagesInDir(abs, imageExts)
  }
}

/**
 * Expand all `dirs` entries of a config into a deduplicated, sorted list of
 * absolute image paths.
 */
function resolveSourceFiles(config: OptimizerConfig): string[] {
  const exts = normalizeExtensions(config.extensions)
  const seen = new Set<string>()
  const files: string[] = []

  for (const entry of config.dirs) {
    for (const file of resolveEntry(entry, exts)) {
      if (!seen.has(file)) {
        seen.add(file)
        files.push(file)
      }
    }
  }

  return files
}

// ---------------------------------------------------------------------------
// Glob resolver (no external deps)
// ---------------------------------------------------------------------------

/**
 * Resolve an absolute glob pattern into matching image file paths.
 *
 * Supported wildcards:
 * - `*` — any sequence of characters within a single path segment
 * - `?` — exactly one character within a single path segment
 *
 * The implementation splits the pattern at the first wildcard segment, uses
 * the prefix as a concrete base directory, then recursively matches the rest.
 */
function resolveGlob(absGlob: string, imageExts: string[]): string[] {
  const sep = path.sep
  const parts = absGlob.split(sep)
  const wildcardIdx = parts.findIndex(p => p.includes('*') || p.includes('?'))

  const baseDir = parts.slice(0, wildcardIdx).join(sep)
  if (!fs.existsSync(baseDir)) return []

  return matchGlobParts(baseDir, parts.slice(wildcardIdx), imageExts)
}

function matchGlobParts(
  currentDir: string,
  remainingParts: string[],
  imageExts: string[],
): string[] {
  if (remainingParts.length === 0) return []

  const [segment, ...rest] = remainingParts
  const segRe = globSegmentToRegex(segment)
  const results: string[] = []

  let entries: fs.Dirent[]
  try {
    entries = fs.readdirSync(currentDir, { withFileTypes: true })
  } catch {
    return []
  }

  for (const entry of entries) {
    if (!segRe.test(entry.name)) continue

    const full = path.join(currentDir, entry.name)

    if (rest.length === 0) {
      // Final segment: collect matching image files, or recurse into dirs
      if (entry.isFile()) {
        const ext = path.extname(entry.name).slice(1).toLowerCase()
        if (imageExts.includes(ext)) results.push(full)
      } else if (entry.isDirectory()) {
        results.push(...collectImagesInDir(full, imageExts))
      }
    } else if (entry.isDirectory()) {
      results.push(...matchGlobParts(full, rest, imageExts))
    }
  }

  return results
}

/** Convert a single path segment glob (no `/`) into a RegExp. */
function globSegmentToRegex(segment: string): RegExp {
  const src = segment
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '[^/\\\\]*')
    .replace(/\?/g, '[^/\\\\]')

  return new RegExp(`^${src}$`, process.platform === 'win32' ? 'i' : undefined)
}

// ---------------------------------------------------------------------------
// Directory walker
// ---------------------------------------------------------------------------

function collectImagesInDir(dir: string, extensions: string[]): string[] {
  if (!fs.existsSync(dir)) return []

  const results: string[] = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...collectImagesInDir(full, extensions))
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).slice(1).toLowerCase()
      if (extensions.includes(ext)) results.push(full)
    }
  }

  return results
}

// ---------------------------------------------------------------------------
// Sharp helpers
// ---------------------------------------------------------------------------

function toFileExt(outputType: string): string {
  return outputType === 'jpeg' ? 'jpg' : outputType
}

function buildOutputOptions(
  type: string,
  compression: Compression = {},
): AvifOptions | WebpOptions | PngOptions | JpegOptions {
  const {
    quality,
    effort,
    lossless,
    chromaSubsampling,
    compressionLevel,
    palette,
    colors,
    dither,
    progressive,
    mozjpeg,
    ...rest
  } = compression as Record<string, unknown>

  switch (type) {
    case 'avif':
      return {
        quality: (quality as number) ?? 60,
        effort: (effort as number) ?? 6,
        chromaSubsampling: (chromaSubsampling as string) ?? '4:4:4',
        lossless: (lossless as boolean) ?? false,
        ...rest,
      } satisfies AvifOptions

    case 'webp':
      return {
        quality: (quality as number) ?? 80,
        effort: (effort as number) ?? 4,
        lossless: (lossless as boolean) ?? false,
        ...rest,
      } satisfies WebpOptions

    case 'png':
      return {
        compressionLevel: (compressionLevel as number) ?? 9,
        palette: (palette as boolean) ?? false,
        ...(palette
          ? { colors: (colors as number) ?? 256, dither: (dither as number) ?? 1.0 }
          : {}),
        ...rest,
      } satisfies PngOptions

    case 'jpeg':
    case 'jpg':
      return {
        quality: (quality as number) ?? 80,
        progressive: (progressive as boolean) ?? false,
        mozjpeg: (mozjpeg as boolean) ?? false,
        ...rest,
      } satisfies JpegOptions

    default:
      return { quality: (quality as number) ?? 80, ...rest }
  }
}

function resolveSharpOptions(
  formatDef: FormatDef,
  metadata: Metadata,
): ResolvedSharpOptions {
  let resizeOptions: ResizeOptions | null = null

  if ('scale' in formatDef && typeof formatDef.scale === 'number' && formatDef.scale > 0) {
    resizeOptions = {
      width: Math.round((metadata.width ?? 0) * formatDef.scale),
      height: Math.round((metadata.height ?? 0) * formatDef.scale),
      fit: 'fill',
    }
  } else {
    const { width, height, proportional = true, withoutEnlargement = true } = formatDef as ResizeByDimensions

    if (width || height) {
      resizeOptions = {}
      if (width) resizeOptions.width = width
      if (height) resizeOptions.height = height

      if (proportional) {
        resizeOptions.fit = width && height ? 'inside' : 'contain'
        resizeOptions.withoutEnlargement = withoutEnlargement
      } else if (width && height) {
        resizeOptions.fit = 'fill'
      }
    }
  }

  return {
    resizeOptions,
    outputOptions: buildOutputOptions(formatDef.type.toLowerCase(), formatDef.compression),
  }
}

// ---------------------------------------------------------------------------
// Core conversion
// ---------------------------------------------------------------------------

async function convertImage(
  srcFile: string,
  formats: FormatDef[],
  sharpFn: (input: string) => Sharp,
  logger: SimpleLogger,
): Promise<void> {
  let metadata: Metadata

  try {
    metadata = await sharpFn(srcFile).metadata()
  } catch (err) {
    logger.error(
      `[image-optimizer] Cannot read "${srcFile}": ${(err as Error).message}`,
    )
    return
  }

  const srcDir = path.dirname(srcFile)
  const srcBase = path.basename(srcFile, path.extname(srcFile))

  for (const formatDef of formats) {
    const outputType = formatDef.type.toLowerCase()
    const fileExt = toFileExt(outputType)

    const outputBase = formatDef.rename
      ? formatDef.rename.replace(/%name%/g, srcBase)
      : srcBase

    const destFile = path.join(srcDir, `${outputBase}.${fileExt}`)

    // Skip if output is already up-to-date
    if (fs.existsSync(destFile)) {
      const srcMtime = fs.statSync(srcFile).mtimeMs
      const destMtime = fs.statSync(destFile).mtimeMs
      if (destMtime >= srcMtime) {
        logger.info(
          `[image-optimizer] up-to-date: ${path.relative(process.cwd(), destFile)}`,
        )
        continue
      }
    }

    try {
      const { resizeOptions, outputOptions } = resolveSharpOptions(formatDef, metadata)

      let pipeline = sharpFn(srcFile)
      if (resizeOptions) pipeline = pipeline.resize(resizeOptions)

      switch (outputType) {
        case 'avif':  pipeline = pipeline.avif(outputOptions as AvifOptions);  break
        case 'webp':  pipeline = pipeline.webp(outputOptions as WebpOptions);  break
        case 'png':   pipeline = pipeline.png(outputOptions as PngOptions);    break
        case 'jpeg':
        case 'jpg':   pipeline = pipeline.jpeg(outputOptions as JpegOptions);  break
        default:
          logger.warn(`[image-optimizer] Unsupported format "${outputType}", skipping.`)
          continue
      }

      await pipeline.toFile(destFile)
      logger.info(`[image-optimizer] ✓ ${path.relative(process.cwd(), destFile)}`)
    } catch (err) {
      logger.error(
        `[image-optimizer] Failed "${destFile}": ${(err as Error).message}`,
      )
    }
  }
}

async function processConfig(
  config: OptimizerConfig,
  sharpFn: (input: string) => Sharp,
  logger: SimpleLogger,
): Promise<void> {
  const files = resolveSourceFiles(config)

  if (files.length === 0) {
    logger.warn(
      `[image-optimizer] No source files found for dirs: [${config.dirs.join(', ')}]`,
    )
    return
  }

  for (const file of files) {
    await convertImage(file, config.formats, sharpFn, logger)
  }
}

// ---------------------------------------------------------------------------
// Watcher helpers
// ---------------------------------------------------------------------------

/**
 * Return the directory that should be watched for a given `dirs` entry.
 *
 * - Explicit file → parent directory
 * - Glob          → base directory (everything before the first wildcard segment)
 * - Directory     → the directory itself
 */
function watchDirForEntry(absEntry: string, _imageExts: string[]): string {
  if (absEntry.includes('*') || absEntry.includes('?')) {
    const parts = absEntry.split(path.sep)
    const wi = parts.findIndex(p => p.includes('*') || p.includes('?'))
    return parts.slice(0, wi).join(path.sep)
  }

  try {
    return fs.statSync(absEntry).isFile() ? path.dirname(absEntry) : absEntry
  } catch {
    return path.dirname(absEntry)
  }
}

/**
 * Check whether `filePath` is covered by a single `dirs` entry.
 * Used to route watcher events to the correct config.
 */
function fileMatchesEntry(
  filePath: string,
  absEntry: string,
  imageExts: string[],
): boolean {
  if (absEntry.includes('*') || absEntry.includes('?')) {
    return fileMatchesGlob(filePath, absEntry, imageExts)
  }

  try {
    if (fs.statSync(absEntry).isFile()) return filePath === absEntry
  } catch { /* entry doesn't exist */ }

  return filePath.startsWith(absEntry + path.sep)
}

function fileMatchesGlob(
  filePath: string,
  absGlob: string,
  imageExts: string[],
): boolean {
  const ext = path.extname(filePath).slice(1).toLowerCase()
  if (!imageExts.includes(ext)) return false

  const escapedSep = process.platform === 'win32' ? '\\\\' : '/'

  const regexSrc = absGlob
    .split(path.sep)
    .map(seg =>
      seg.includes('*') || seg.includes('?')
        ? seg
            .replace(/[.+^${}()|[\]\\]/g, '\\$&')
            .replace(/\*/g, '[^/\\\\]*')
            .replace(/\?/g, '[^/\\\\]')
        : seg.replace(/[.+^${}()|[\]\\]/g, '\\$&'),
    )
    .join(escapedSep)

  return new RegExp(
    `^${regexSrc}$`,
    process.platform === 'win32' ? 'i' : undefined,
  ).test(filePath)
}

// ---------------------------------------------------------------------------
// Plugin factory
// ---------------------------------------------------------------------------

const consoleLogger: SimpleLogger = {
  info: msg => console.log(msg),
  warn: msg => console.warn(msg),
  error: msg => console.error(msg),
}

export default function imageOptimizerPlugin(configs: OptimizerConfig[]): Plugin {
  if (!configs.length) {
    throw new Error('[image-optimizer] At least one config entry is required.')
  }

  for (const [i, cfg] of configs.entries()) {
    if (!cfg.dirs?.length)
      throw new Error(`[image-optimizer] configs[${i}].dirs must not be empty.`)
    if (!cfg.formats?.length)
      throw new Error(`[image-optimizer] configs[${i}].formats must not be empty.`)
  }

  let _sharp: ((input: string) => Sharp) | undefined

  function requireSharp(): (input: string) => Sharp {
    if (_sharp) return _sharp
    try {
      const req = createRequire(import.meta.url)
      _sharp = req('sharp') as (input: string) => Sharp
      return _sharp!
    } catch {
      throw new Error('[image-optimizer] "sharp" is required. Run: npm i -D sharp')
    }
  }

  return {
    name: 'vite-plugin-image-optimizer',
    enforce: 'pre',

    // ── Production build ──────────────────────────────────────────────────
    async buildStart() {
      const sharp = requireSharp()
      for (const config of configs) {
        await processConfig(config, sharp, consoleLogger)
      }
    },

    // ── Dev server ────────────────────────────────────────────────────────
    configureServer(server: ViteDevServer) {
      const sharp = requireSharp()
      const logger: SimpleLogger = server.config.logger as unknown as SimpleLogger

      // Initial scan
      void (async () => {
        for (const config of configs) {
          await processConfig(config, sharp, logger)
        }
      })()

      // Collect watch directories (one per entry, deduplicated)
      const watchDirs = new Set<string>()
      for (const config of configs) {
        const exts = normalizeExtensions(config.extensions)
        for (const entry of config.dirs) {
          watchDirs.add(watchDirForEntry(path.resolve(process.cwd(), entry), exts))
        }
      }

      server.watcher.add([...watchDirs].map(d => `${d}/**`))

      const handleChange = async (filePath: string): Promise<void> => {
        const ext = path.extname(filePath).slice(1).toLowerCase()

        // Find every config that covers this changed file
        const matched = configs.filter(cfg => {
          const exts = normalizeExtensions(cfg.extensions)
          if (!exts.includes(ext)) return false
          return cfg.dirs.some(entry =>
            fileMatchesEntry(filePath, path.resolve(process.cwd(), entry), exts),
          )
        })

        if (matched.length === 0) return

        logger.info(
          `[image-optimizer] source changed: ${path.relative(process.cwd(), filePath)}`,
        )

        for (const config of matched) {
          await convertImage(filePath, config.formats, sharp, logger)
        }

        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.on('add', handleChange)
      server.watcher.on('change', handleChange)
    },
  }
}
