<script lang="ts" setup>
import HeaderComponent from "~/components/Header/HeaderComponent.vue";
const routes = useRoute();
</script>

<template>
  <UApp>
    <HeaderComponent v-show="routes.path !== '/track'" />
    <NuxtPage />
  </UApp>
</template>
