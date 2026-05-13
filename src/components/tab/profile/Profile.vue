<script setup lang="ts">
const { t } = useI18n()

interface IconEntry {
	component: Component
	componentColor?: string
	wrapperColor?: string
	iconClass?: string
	url: string,
	titleLocaleKey?: string
}

const socialIcons: IconEntry[] = [
	{
		component: LogoGithub,
		componentColor: 'var(--icon-fill-a-1, currentColor)',
		wrapperColor: '#101411',
		url: 'https://github.com/DemerNkardaz',
		titleLocaleKey: 'github',
	},
	{
		component: LogoTwitter,
		componentColor: 'var(--icon-fill-a-1, currentColor)',
		wrapperColor: '#179CF0',
		url: 'https://x.com/NKARDAZ',
		titleLocaleKey: 'twitter',
	},
	{
		component: LogoKoFi,
		wrapperColor: '#FF5A16',
		iconClass: 'no-fill wh-110%',
		url: 'https://ko-fi.com/yalla',
		titleLocaleKey: 'ko-fi',
	}
]
</script>

<style lang="scss" src="./Profile.scss"></style>

<template>
	<article class="profile">
		<header class="profile__header">

		</header>
		<main class="profile__main">

			<div class="profile__main__middle-block">
				<div class="profile__socials-wrapper">
					<p class="profile__socials__title text-medium heading-decorator">{{ t('profile.socials.title') }}</p>
						<div class="profile__socials__icons">
								<a
									v-for="icon in socialIcons"
									:key="icon.url"
									class="profile__socials__icon-wrapper"
									:style="{ '--wrapper-color': icon.wrapperColor }"
									:href="icon.url"
									target="_blank"
									rel="noopener noreferrer"
									:title="icon.titleLocaleKey ? t(`profile.socials.links.${icon.titleLocaleKey}`) : undefined"
								>
									<component
										class="profile__socials__icon"
										:class="icon.iconClass"
										:is="icon.component"
										:style="{ color: icon.componentColor }"
									/>
								</a>
							</div>
				</div>
			</div>
		</main>
		<footer class="profile__footer">
		</footer>
	</article>
</template>
