<script lang="ts" setup>
import dayjs from "dayjs";
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
const { updateService, wasUpdated } = useUpdateService();


const props = defineProps<{
  id: string,
  title: string;
  code: string;
  description: string;
  money: string;
  date: string;
}>();

const isOpen = ref(false);

const schema = z.object({
  description: z.string().min(1, "Digite a descrição do problema"),
  deliveryDate: z.string().min(1, "Escolha uma data"),
})
type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  deliveryDate: dayjs(props.date).format('YYYY-MM-DD'),
  description: props.description,
});

const handleUpdateService = async (event: FormSubmitEvent<Schema>) => {
  try {
    await updateService(props.id, {
      deliveryDate: event.data.deliveryDate, description: event.data.description,
    });
    if (wasUpdated.value) {
      isOpen.value = false;
    }
  } finally {
    isOpen.value = false;
  }
};
</script>

<template>
  <UModal v-model:open="isOpen" :dismissible="true" :title="title" :ui="{
    content: 'bg-card',
    overlay: 'bg-black/60 transition-opacity',
    close: 'hover:bg-black',
  }">
    <UButton label="Atualizar" color="neutral" class="cursor-pointer" @click="isOpen = true" />

    <template #body>
      <section>
        <UForm :schema="schema" :state="state" class="flex flex-col space-y-4" @submit="handleUpdateService">
          <UFormField size="xl" label="Descrição do problema" name="description">
            <UTextarea v-model="state.description" autoresize highlight class="w-full" color="neutral"
              :ui="{ base: 'placeholder:text-white' }" />
          </UFormField>
          <UFormField size="xl" name="money" label="Orçamento">
            <span>{{ money }}</span>
          </UFormField>
          <UFormField size="xl" name="code" label="Código do cliente">
            <span>{{ code }}</span>
          </UFormField>
          <UFormField size="xl" label="Data de entrega" name="deliveryDate">
            <UInput v-model="state.deliveryDate" highlight type="date" color="neutral" class="w-full"
              :min="dayjs().format('YYYY-MM-DD')" :ui="{ base: 'placeholder:text-white' }" />
          </UFormField>
          <UButton class="items-center justify-center flex cursor-pointer font-bold" color="neutral" type="submit">
            Atualizar
          </UButton>
        </UForm>
      </section>
    </template>
  </UModal>
</template>