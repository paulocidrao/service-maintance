<script lang="ts" setup>
import { z } from "zod";
import dayjs from "dayjs";
import type { FormSubmitEvent } from "@nuxt/ui";
import { useCustomToast } from "~/components/Toast/Toast";
const config = useRuntimeConfig();
const { successToast, errorToast } = useCustomToast();
const cookie = useCookie<{ token: string }>("token");
const schema = z.object({
  userEmail: z.email("Digite um email válido"),
  clientName: z.string("Digite um nome válido"),
  deliveryDate: z.string("Escolha uma data"),
  price: z
    .number({ error: "Insira um número" })
    .nonnegative("O numero dever ser positivo")
    .min(0.01, { message: "Digite um valor acima de 0" })
    .optional(),
  description: z.string("Digite a descrição do problema"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  clientName: undefined,
  deliveryDate: undefined,
  description: undefined,
  price: undefined,
  userEmail: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.isTrusted) {
    const dto: Schema = {
      clientName: event.data.clientName,
      deliveryDate: event.data.deliveryDate,
      description: event.data.description,
      userEmail: event.data.userEmail,
      price: event.data.price,
    };
    await $fetch<Schema>(`${config.public.apiBase}/job`, {
      method: "POST",
      body: dto,
      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
      onResponse({ response }) {
        if (response.ok) {
          successToast({
            title: "Serviço criado com sucesso!",
            description: "Veja os detalhes do seu serviço",
            action: () => {
              console.log("e");
            },
            label: "Veja aqui os detalhes",
          });
        }
      },
      onResponseError({ response }) {
        errorToast({
          description: response._data.message,
          title: "Oops! Aconteceu algo inesperado!",
        });
      },
    });
  }
}
</script>
<template>
  <UContainer>
    <ClientOnly>
      <section class="mt-4 items-center justify-center flex flex-col">
        <UForm
          :schema="schema"
          :state="state"
          :validate-on="['input']"
          class="space-y-4 shadow bg-card p-4 rounded"
          @submit="onSubmit"
        >
          <h1 class="text-white font-bold text-center text-2xl">
            Cadastre um novo serviço
          </h1>
          <UFormField required label="Nome do cliente" name="clientName">
            <UInput
              v-model="state.clientName"
              autofocus
              highlight
              type="text"
              color="neutral"
              placeholder="Digite o nome do cliente"
              class="w-full"
              :ui="{ base: 'placeholder:text-white' }"
            />
          </UFormField>
          <UFormField required label="Email do cliente" name="userEmail">
            <UInput
              v-model="state.userEmail"
              highlight
              type="text"
              color="neutral"
              placeholder="Digite o email do cliente"
              class="w-full"
              :ui="{ base: 'placeholder:text-white' }"
            />
          </UFormField>
          <UFormField required label="Date de entrega" name="deliveryDate">
            <UInput
              v-model="state.deliveryDate"
              highlight
              type="date"
              color="neutral"
              class="w-full"
              :min="dayjs().format('YYYY-MM-DD')"
              :ui="{ base: 'placeholder:text-white' }"
            />
          </UFormField>
          <UFormField label="Orçamento" name="price">
            <UInput
              v-model="state.price"
              highlight
              type="number"
              color="neutral"
              placeholder="Digite um valor estimado"
              class="w-full"
              :ui="{ base: 'placeholder:text-white' }"
            />
          </UFormField>
          <UFormField required label="Descição" name="description">
            <UTextarea
              v-model="state.description"
              autoresize
              highlight
              class="w-full"
              color="neutral"
              :ui="{ base: 'placeholder:text-white' }"
            />
          </UFormField>
          <UButton
            type="submit"
            class="cursor-pointer w-full justify-center"
            inactive-class="font-bold"
            color="neutral"
          >
            Cadastrar serviço
          </UButton>
        </UForm>
      </section>
    </ClientOnly>
  </UContainer>
</template>
