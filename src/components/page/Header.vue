<script setup lang="ts">
import { useTabs } from '@/composables/useTabs';
import { tabsMap } from '@/shared/tabs';
import { headerHeight } from '@/shared/ui';

const { switchTab, activeTabName } = useTabs();
const tabsCount = Object.keys(tabsMap).length
</script>

<style lang="scss" src="./Header.scss"/>

<template>
	<header class="content-header">
		<div class="header__tabs">
			<template v-for="(value, key, index) in tabsMap" :key="key">
				<button class="header__tabs__button" @click="switchTab(key)">
					<component
						class="header__tabs__button__icon"
						:class="{ 'header__tabs__button__icon--active': activeTabName === key, 'header__tabs__button__icon--inactive': activeTabName !== key }"
						v-if="value.icon" :is="value.icon"
					/>
					<template v-if="activeTabName === key">
						<UITabButton class="header__tabs__button__active-decorator"/>
						<Stripes class="header__tabs__button__active-stripes-pattern right--9px top-0px"
							:w="10" :h="62" :angle="45"
							color="#313739" :stripes-px="10" :gap-px="1"
						/>
						<Stripes class="header__tabs__button__active-stripes-pattern left--9px top-0px"
							:w="10" :h="62" :angle="-45"
							color="#313739" :stripes-px="10" :gap-px="1"
						/>
						<Stripes class="header__tabs__button__active-stripes-pattern left--8px bottom-0px"
							w="120%" :h="15" :angle="-0"
							color="#313739" :stripes-px="2" :gap-px="1"
						/>
					</template>
				</button>
				<div class="header__tabs__button__divider" v-if="index < tabsCount - 1"/>
			</template>
		</div>
	</header>
</template>
