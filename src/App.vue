<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();


</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
	{{  t('Hello') }}
	{{  t('Hello World') }}
</template>

<style scoped></style>
