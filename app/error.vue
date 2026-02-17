<script lang="ts" setup>
import { useError } from '#app'
const errorPage = useError();
</script>

<template>
  <NuxtLayout name="404">
    <div>
      <div class="flex items-center justify-center text-white gap-1.5">
        <h2 class="text-2xl ">Erro: {{ errorPage?.statusCode }}</h2>
        <UIcon name="i-lucide-bot" class="size-12 " />
      </div>
      <p class="text-xl text-white font-semibold">A página {{ errorPage?.url }}</p>
    </div>
    <NuxtLink to="/" class="bg-white p-2 rounded text-black font-bold mt-4">Ir para página inicial</NuxtLink>
  </NuxtLayout>
</template>
