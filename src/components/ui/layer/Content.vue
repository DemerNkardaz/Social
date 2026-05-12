<script setup lang="ts"></script>

<style lang="scss" src="./Content.scss"/>

<template>
	<div class="content-layer">
		<PageHeader />
		<PageMain>
			<slot name="layer-content"/>
		</PageMain>
	</div>
</template>
