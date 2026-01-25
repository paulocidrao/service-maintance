<script lang="ts" setup>
import type { IService } from "~/types/service";
import ModalComponent from "../Modal/ModalComponent.vue";
import { status } from "~/consts";
import dayjs from "dayjs";

defineProps<{
  service: IService;
}>();

</script>

<template>
  <UCard class="w-1/4">
    <template #header>
      <h2 class="text-xl font-bold">Cliente {{ service.clientName }}</h2>
    </template>
    <template #default>
      <section class="flex flex-col gap-1">
        <span>Código do cliente: {{ service.userCode }}</span>
        <span>Data de entrega: {{ dayjs(service.deliveryDate).format("DD/MM/YYYY") }}</span>
        <span>Valor do serviço: {{ service.budget.price.toLocaleString("PT-BR", {
          style: 'currency', currency: "BRL"
        }) }}</span>
        <span class="flex items-center gap-1">Status:
          {{ status[service.budget.status] }}
        </span>
        <p class="text-justify">Descrição: {{ service.description }}</p>
      </section>
    </template>
    <template #footer>
      <section class="flex justify-between">
        <ModalComponent money="00,00" description="Computador com x defeitos" date="dd/mm/yyyy" status="Aprove"
          code="000-00" title="Cliente XPTO" />
        <UButton class="cursor-pointer">Finalizar serviço</UButton>
      </section>
    </template>
  </UCard>
</template>
