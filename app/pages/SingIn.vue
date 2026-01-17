<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { vMaska } from "maska/vue";
const show = ref(false);
const router = useRouter();
const schema = z.object({
  name: z
    .string("Digite um nome válido")
    .refine((value) => !/\d/.test(value), "O nome não pode conter números"),
  email: z.email("Digite um email válido"),
  phone: z
    .string("Digite um número válido")
    .min(11, "O telefone precisa ter no mínimo 11 dígitos"),
  document: z
    .string("Digite um CPF válido")
    .min(11, "O CPF precisa ter no mínimo 11 dígitos"),
  password: z.string("Digite uma senha válida"),
});

type Schema = z.output<typeof schema>;

const config = useRuntimeConfig();
const errorMessage = ref("");
const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
  document: undefined,
  name: undefined,
  phone: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  errorMessage.value = "";
  if (event.isTrusted) {
    const dto: Schema = {
      document: event.data.document,
      email: event.data.email,
      name: event.data.name,
      password: event.data.password,
      phone: event.data.phone,
    };

    await $fetch<Schema>(`${config.public.apiBase}/user/create`, {
      method: "POST",
      body: dto,
      onResponse({ response }) {
        if (response.status === 201) {
          router.push("/login");
        }
      },
      onResponseError({ response }) {
        errorMessage.value = response._data.message;
      },
    });
  }
}
</script>

<template>
  <UContainer>
    <ClientOnly>
      <section class="min-h-dvh items-center justify-center flex flex-col">
        <UForm
          :schema="schema"
          :state="state"
          :validate-on="['input']"
          class="space-y-4 shadow bg-card p-4 rounded"
          @submit="onSubmit"
        >
          <h1 class="text-white font-bold text-center text-2xl">
            Crie sua conta
          </h1>
          <UFormField required label="Seu nome" name="name">
            <UInput
              v-model="state.name"
              autofocus
              highlight
              type="text"
              color="neutral"
              placeholder="Digite seu nome"
              class="w-full"
              :ui="{ base: 'placeholder:text-white' }"
            />
          </UFormField>
          <UFormField required label="Email" name="email">
            <UInput
              v-model="state.email"
              highlight
              type="email"
              color="neutral"
              placeholder="Digite seu email"
              class="w-full"
              :ui="{ base: 'placeholder:text-white' }"
            />
          </UFormField>

          <UFormField required label="Telefone" name="phone">
            <UInput
              v-model="state.phone"
              v-maska="'(##)#####-####'"
              highlight
              type="tel"
              color="neutral"
              placeholder="(99)99999-9999"
              class="w-full"
              :ui="{ base: 'placeholder:text-white' }"
            />
          </UFormField>

          <UFormField required label="CPF" name="document">
            <UInput
              v-model="state.document"
              v-maska="'###.###.###-##'"
              highlight
              type="text"
              color="neutral"
              placeholder="999.999.999-99"
              class="w-full"
              :ui="{ base: 'placeholder:text-white' }"
            />
          </UFormField>
          <UFormField required label="Senha" name="password">
            <UInput
              v-model="state.password"
              :ui="{ trailing: 'pe-1', base: 'placeholder:text-white' }"
              :type="show ? 'text' : 'password'"
              color="neutral"
              highlight
              placeholder="Digite sua senha"
              class="w-full"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="show ? 'Hide password' : 'Show password'"
                  :aria-pressed="show"
                  aria-controls="password"
                  @click="show = !show"
                />
              </template>
            </UInput>
          </UFormField>
          <UButton
            type="submit"
            class="cursor-pointer w-full justify-center"
            inactive-class="font-bold"
            color="neutral"
          >
            Criar conta
          </UButton>
          <p class="text-destructive-400 flex justify-center">
            {{ errorMessage }}
          </p>
          <ULink
            to="/login"
            class="flex items-center justify-center text-blue-600 hover:text-blue-300 underline"
            >Já tem uma conta? Faça login</ULink
          >
        </UForm>
      </section>
    </ClientOnly>
  </UContainer>
</template>
