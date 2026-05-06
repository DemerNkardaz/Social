<script setup lang="ts">
import { TwitterLogo, GitHubLogo, KoFiLogo } from '@/icons';

type socialIcon = {
	component: any,
	componentColor?: string,
	wrapperColor?: string,
	class?: string,
	iconClass?: string,
	svg?: {
		viewBox?: string
	},
	url: string
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
	koFi: {
		component: KoFiLogo,
		wrapperColor: '#FF5A16',
		svg: { viewBox: '0 0 241 194' },
		iconClass: 'no-fill wh-110',
		url: 'https://ko-fi.com/yalla'
	}
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
