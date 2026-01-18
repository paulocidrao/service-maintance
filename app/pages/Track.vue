<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent, FormErrorEvent } from "@nuxt/ui";
import type { IService } from "~/types/service";

const config = useRuntimeConfig();

const schema = z.object({
  otp: z
    .array(z.string())
    .length(5, { message: "Digite um código OTP válido de 5 dígitos" }),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  otp: [],
});

const errorMessage = ref<string | null>(null);
const isModalOpen = ref(false);
const isLoading = ref(false);
const service = ref<IService | null>(null);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  errorMessage.value = null;
  if (event.isTrusted) {
    isLoading.value = true;
    const otp = event.data.otp;
    await $fetch<IService>(`${config.public.apiBase}/job/${otp.join("")}`, {
      method: "GET",
      onResponse({ response }) {
        if (response.ok) {
          isModalOpen.value = true;
          service.value = response._data;
          state.otp = []
          isLoading.value = false;
        }
      },
      onResponseError({ response }) {
        if (!response.ok) {
          errorMessage.value = response._data.message;
          isLoading.value = false;
        }
      },
    });
  }
}

const handleClose = () => {
  isModalOpen.value = false;
};

function onError(event: FormErrorEvent) {
  errorMessage.value = null;
  if (event.errors[0]?.message) {
    errorMessage.value = event.errors[0]?.message;
  }
}
</script>

<template>
  <ClientOnly>
    <UContainer class="flex h-screen justify-center items-center">
      <section
        class="flex flex-col space-y-4 rounded p-4 bg-card items-center w-full max-w-sm mx-auto min-h-[250px] justify-around">
        <h1 class="text-2xl text-white font-bold">Busque pelo seu serviço</h1>
        <UForm class="space-y-8" :validate-on="['input']" :schema="schema" :state="state" @submit="onSubmit"
          @error="onError">
          <UPinInput v-model="state.otp" autofocus otp type="text" size="xl" class="gap-5" color="neutral" highlight
            :length="5" />
          <p v-show="errorMessage" class="text-red-600 text-sm font-bold text-center">
            {{ errorMessage }}
          </p>
          <UButton type="submit" label="Verificar serviço" color="neutral" :disabled="isLoading"
            class="justify-center font-bold flex w-full" />
        </UForm>
      </section>
    </UContainer>

    <CardTrackComponent v-if="service" :is-modal-open="isModalOpen" :service="service" @close-modal="handleClose" />
  </ClientOnly>
</template>
