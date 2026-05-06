<script setup lang="ts">
import { locale } from '@/i18n';
import { TwitterLogo, GitHubLogo, PronounsPageLogo, SpotifyLogo, TelegramLogo } from '@/icons';
import { computed, type ComputedRef } from 'vue';

type socialIcon = {
	component: any,
	componentColor?: string,
	wrapperColor?: string,
	class?: string,
	iconClass?: string,
	svg?: {
		viewBox?: string
	},
	url: string | ComputedRef<string>
}

type localeRules = {
	pronounsPage: 'en' | 'ru',
}

const socialIcons = {
	github: {
		component: GitHubLogo,
		componentColor: '#F7F7F7',
		wrapperColor: '#101411',
		svg: { viewBox: '0 0 97 96' },
		url: 'https://github.com/DemerNkardaz'
	},
	twitter: {
		component: TwitterLogo,
		componentColor: '#F7F7F7',
		wrapperColor: '#179CF0',
		url: 'https://x.com/NKARDAZ'
	},
	telegram: {
		component: TelegramLogo,
		wrapperColor: '#28a8e9',
		svg: { viewBox: '0 0 1000 1000' },
		iconClass: 'no-fill hide-circles wh-150',
		url: 'https://t.me/maple_palace'
	},
	spotify: {
		component: SpotifyLogo,
		componentColor: '#F7F7F7',
		wrapperColor: '#1ed760',
		svg: { viewBox: '0 0 168 168' },
		url: 'https://open.spotify.com/user/dbwiago3y8g6nze1jjkrz8rry'
	},
	pronounsPage: {
		component: PronounsPageLogo,
		componentColor: '#F7F7F7',
		wrapperColor: '#c71585',
		url: computed(() => {
			const validLocales: Array<localeRules['pronounsPage']> = ['en', 'ru'];
			const prefix = validLocales.includes(locale.value as any) ? `${locale.value}.` : '';
			return `https://${prefix}pronouns.page/@nkardaz`;
		})
	},
} as Record<string, socialIcon>

</script>

<style lang="scss" src="./Profile.scss"></style>

<template>
	<article class="profile">
		<header class="profile__header"></header>
		<main class="profile__main"></main>
		<footer class="profile__footer">
			<div class="profile__socials">
				<a
					class="profile__socials__icon-wrapper"
					:class="icon.class"
					v-for="icon in socialIcons"
					:style="{ '--wrapper-color': icon.wrapperColor }"
					:href="typeof icon.url === 'string' ? icon.url : icon.url.value" target="_blank" rel="noopener noreferrer">
					<component
						class="profile__socials__icon"
						:class="icon.iconClass"
						:is="icon.component"
						:style="{ '--icon-color': icon.componentColor }"
						v-bind="icon.svg" />
				</a>
			</div>
			<!-- <TwitterLogo /> -->
		</footer>
	</article>
</template>
