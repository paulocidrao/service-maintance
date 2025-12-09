<script lang="ts" setup>
import ModalComponent from "../Modal/ModalComponent.vue";
</script>

<template>
  <UCard class="w-1/4">
    <template #header>
      <h2 class="text-xl font-bold">Cliente XPTO</h2>
    </template>
    <template #default>
      <section class="flex flex-col gap-1">
        <p>Computador com x defeitos</p>
        <span>Código do cliente: 000-00</span>
        <span>Data de entrega: dd/mm/yyyy</span>
        <span>Valor do serviço: R$ 00,00</span>
        <span class="flex items-center gap-1"
          >Status:
          <div class="rounded-full p-1 bg-green-600 w-0.5 h-0.5" />
          Orçamento aprovado</span
        >
      </section>
    </template>
    <template #footer>
      <section class="flex justify-between">
        <ModalComponent
          money="00,00"
          description="Computador com x defeitos"
          date="dd/mm/yyyy"
          status="Aprove"
          code="000-00"
          title="Cliente XPTO"
        />
        <UButton class="cursor-pointer">Finalizar serviço</UButton>
      </section>
    </template>
  </UCard>
</template>
