<script lang="ts" setup>
import type { IService } from "~/types/service";
import ModalComponent from "../Modal/ModalComponent.vue";
import { status } from "~/consts";
const { finishService } = userServices();
defineProps<{
  service: IService;
}>();


</script>

<template>
  <UCard v-if="!service.isFinished" class="w-full">
    <template #header>
      <h2 class="text-xl font-bold">Cliente {{ service.clientName }}</h2>
    </template>
    <template #default>
      <section class="flex flex-col gap-1">
        <span>Código do cliente: {{ service.userCode }}</span>
        <span>Data de entrega: {{ formatDate(service.deliveryDate) }}</span>
        <span>Valor do serviço: {{ formatMoney(service.budget.price) }}</span>
        <span class="flex items-center gap-1">Status:
          {{ status[service.budget.status] }}
        </span>
        <p class="text-justify">Descrição: {{ service.description }}</p>
      </section>
    </template>
    <template #footer>
      <section class="flex justify-between">
        <ModalComponent :id="service.id" :money="formatMoney(service.budget.price)" :description="service.description"
          :date="formatDateForInput(service.deliveryDate)" :code="service.userCode" :title="service.clientName" />
        <UButton class="cursor-pointer" @click="finishService(service.id)">Finalizar serviço</UButton>
      </section>
    </template>
  </UCard>
</template>
