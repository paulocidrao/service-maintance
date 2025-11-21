<script lang="ts" setup>
import UserConfig from "./UserConfig/UserConfigComponent.vue";
</script>

<template>
  <section class="flex items-center justify-between pl-2 pr-2">
    <div>
      <img class="size-22" src="/images/logo.png" alt="Logo" />
    </div>
    <div class="flex">
      <div class="flex items-center gap-4">
        <ULink
          to="/"
          :class="[
            'font-bold p-1 rounded  cursor-pointer',
            { 'bg-white text-black': $route.path === '/' },
          ]"
        >
          Meus serviços
        </ULink>
        <ULink
          to="/createservice"
          :class="[
            'font-bold p-1 rounded  cursor-pointer',
            { 'bg-white text-black': $route.path === '/createservice' },
          ]"
        >
          Criar serviço
        </ULink>

        <UserConfig />
      </div>
    </div>
  </section>
</template>
