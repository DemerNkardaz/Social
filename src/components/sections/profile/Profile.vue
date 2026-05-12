<script setup lang="ts">
import { createIcon } from '@/scripts/icons';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

interface IconEntry {
  readonly component: any;
  url: string;
  wrapperColor?: string;
  componentColor?: string;
  iconClass?: string;
  class?: string;
  svg?: {
    viewBox?: string;
  };
}

const socialIcons: Record<string, IconEntry> = {
  github: createIcon('github', 'socials/', {
    componentColor: '#F7F7F7',
    wrapperColor: '#101411',
    svg: { viewBox: '0 0 97 96' },
    url: 'https://github.com/DemerNkardaz'
  }),
  twitter: createIcon('twitter', 'socials/', {
    componentColor: '#F7F7F7',
    wrapperColor: '#179CF0',
    url: 'https://x.com/NKARDAZ'
  }),
  koFi: createIcon('ko-fi', 'socials/', {
    wrapperColor: '#FF5A16',
    svg: { viewBox: '0 0 241 194' },
    iconClass: 'no-fill wh-110%',
    url: 'https://ko-fi.com/yalla'
  })
}
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
									v-for="(icon, key) in socialIcons"
									:key="key"
									class="profile__socials__icon-wrapper"
									:style="{ '--wrapper-color': icon.wrapperColor }"
									:href="icon.url"
									target="_blank"
									rel="noopener noreferrer"
								>
									<component
										class="profile__socials__icon"
										:class="icon.iconClass"
										:is="icon.component"
										:style="{ color: icon.componentColor }"
										v-bind="icon.svg"
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
