<script lang="ts" setup>
const router = useRoute()
console.log(router.params.id)
</script>

<template>
  <section class="w-full items-center justify-center flex">
    <UCard
      :ui="{ root: 'w-1/2 bg-card border-0 shadow-none ring-0', body: 'border-0', header: 'border-0', footer: 'border-0' }">
      <template #header>
        <div class="flex justify-between items-center ">
          <h1>Nome do cliente</h1>
          <span>Codigo: 12345</span>
        </div>
      </template>
      <section>
        content
      </section>
      <template #footer>
        <div class="items-center flex justify-between">
          <UButton color="white">Atualizar</UButton>
          <UButton color="primary">Finalizar</UButton>
        </div>
      </template>
    </UCard>
  </section>
</template>