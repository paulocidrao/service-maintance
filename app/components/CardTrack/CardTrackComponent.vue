<script lang="ts" setup>
import type { IService } from '~/types/service';
import dayjs from "dayjs";
import { useCustomToast } from '../Toast/Toast';

const config = useRuntimeConfig();
const { successToast, errorToast } = useCustomToast();
const props = defineProps<{
  isModalOpen: boolean;
  service: IService;
}>();



const emit = defineEmits<{
  closeModal: [value: boolean];
}>();

const handleClose = () => {
  emit("closeModal", false);
};

const status: Record<string, string> = {
  "pending": "Aguardando aprovação",
  "reject": "Orçamento negado",
  "accept": "Orçamento aprovado"
}

const handleChangeStatus = async (status: "accept" | "reject") => {
  await $fetch(`${config.public.apiBase}/budget/${props.service.budget.id}`, {
    method: 'patch',
    body: {
      "status": status
    },
    onResponse({ response }) {
      if (response.ok) {
        emit("closeModal", false);
        successToast({
          title: 'Sucesso!',
          description: status === "accept" ? 'Orçamento aprovado!' : "Orçamento reprovado!"
        })
      } else {
        errorToast({
          title: 'Ooops!',
          description: 'Houve algum problema!',
        })
      }
    }
  })
}

</script>

<template>
  <section v-show="props.isModalOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black/60 p-4">
    <div class="bg-card p-6 rounded shadow-2xl w-full space-y-4 sm:max-w-1/2 md:max-w-1/2 lg:max-w-1/2 xl:max-w-1/3">
      <i class="w-full flex items-center justify-end cursor-pointer" @click="handleClose">
        <UIcon name="i-lucide-x" class="size-5" />
      </i>
      <section v-if="service" class="flex flex-col gap-1 text-xl">
        <p>Prestador: {{ service.workerName }}</p>
        <span>Data de entrega: {{ dayjs(service.deliveryDate).format("DD/MM/YYYY") }}</span>
        <span>Orçamento:{{ service.budget.price.toLocaleString("PT-BR", { style: "currency", currency: 'BRL' })
        }}</span>
        <span class="flex items-center gap-1">Status:
          {{ status[service.budget.status] }}
        </span>
      </section>

      <div v-if="service.budget.status === 'pending'">
        <section class="w-full justify-around items-center flex gap-3">
          <UButton color="error" class="w-1/2 font-bold justify-center" label="Recusar orçamento"
            @click="handleChangeStatus('reject')" />
          <UButton class="w-1/2 text-center justify-center font-bold" label="Aprovar orçamento"
            @click="handleChangeStatus('accept')" />
        </section>
      </div>

      <div v-else>
        <UButton label="Fechar" color="white" class="w-full justify-center flex font-bold" @click="handleClose" />
      </div>
    </div>
  </section>
</template>
