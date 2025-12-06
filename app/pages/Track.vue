<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent, FormErrorEvent } from "@nuxt/ui";
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

function onSubmit(event: FormSubmitEvent<Schema>) {
  errorMessage.value = null;
  console.log("EVENT", event);
  if (event.isTrusted) {
    const otp = event.data.otp;
    console.log("otp", otp.join(""));
    console.log(event.data.otp);
  }
}

function onError(event: FormErrorEvent) {
  console.log("  event.errors[0]?.message", event.errors);
  if (event.errors[0]?.message) {
    errorMessage.value = event.errors[0]?.message;
  }
}
</script>
<template>
  <ClientOnly>
    <UContainer class="flex h-screen justify-center items-center">
      <section
        class="flex flex-col space-y-4 rounded p-4 bg-card items-center w-full max-w-sm mx-auto min-h-[250px] justify-around"
      >
        <h1 class="text-2xl text-white font-bold">Busque pelo seu serviço</h1>
        <UForm
          class="space-y-8"
          :validate-on="['input']"
          @submit="onSubmit"
          :schema="schema"
          :state="state"
          @error="onError"
        >
          <UPinInput
            autofocus
            otp
            type="text"
            size="xl"
            class="gap-5"
            color="neutral"
            highlight
            :length="5"
            v-model="state.otp"
          />
          <p
            v-show="errorMessage"
            class="text-red-600 text-sm font-bold text-center"
          >
            {{ errorMessage }}
          </p>
          <UButton
            type="submit"
            label="Verificar serviço"
            color="neutral"
            class="justify-center font-bold flex w-full"
          />
        </UForm>
      </section>
    </UContainer>
  </ClientOnly>
</template>
