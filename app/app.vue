<script lang="ts" setup>
import HeaderComponent from "~/components/Header/HeaderComponent.vue";
import { jwtDecode } from 'jwt-decode'
const routes = useRoute();
onMounted(() => {
  const token = useCookie<{ token: string }>("token")
  if (!token.value.token) {
    navigateTo("/login")
  }
  if (token.value) {
    const decodeToken = jwtDecode(token.value.token)
    const currentTime = Date.now() / 1000;
    if (decodeToken.exp! < currentTime) {
      navigateTo("/login")
    }
  }
})
</script>

<template>
  <UApp>
    <HeaderComponent v-show="routes.path !== '/track' && routes.path !== '/login' && routes.path !== '/singin'" />
    <NuxtPage />
  </UApp>
</template>
