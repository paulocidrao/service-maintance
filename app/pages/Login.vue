<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const show = ref(false);
const config = useRuntimeConfig();
const router = useRouter();
const erroMessage = ref("");
const cookie = useCookie("token", { sameSite: true });

const schema = z.object({
  email: z.email("Digite um email válido"),
  password: z.string("Digite uma senha válida"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  erroMessage.value = "";
  if (event.isTrusted) {
    const dto: Schema = {
      email: event.data.email,
      password: event.data.password,
    };
    await $fetch<Schema>(`${config.public.apiBase}/auth/login`, {
      method: "POST",
      body: dto,

      onResponse({ response }) {
        if (response.status === 201) {
          cookie.value = response._data;
          router.push("/");
        }
      },
      onResponseError({ response }) {
        erroMessage.value = response._data.message;
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
          class="w-1/3 space-y-4 shadow bg-card p-4 rounded"
          @submit="onSubmit"
        >
          <h1 class="text-white font-bold text-center text-2xl">
            Entre na sua conta!
          </h1>
          <UFormField required label="Email" name="email">
            <UInput
              v-model="state.email"
              autofocus
              highlight
              color="neutral"
              placeholder="Digite seu email"
              class="w-full"
              :ui="{ base: 'placeholder:text-white' }"
              title="Digite o seu email aqui"
              aria-label="Digite o seu email aqui"
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
              title="Digite a sua senha aqui"
              aria-label="Digite a sua senha aqui"
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
            title="Clique aqui para entrar na sua conta"
            aria-label="Clique aqui para entrar na sua conta"
          >
            Entrar
          </UButton>
          <p class="text-destructive-400 flex justify-center">
            {{ erroMessage }}
          </p>
          <USeparator size="xs" color="white" />
          <div class="flex gap-20 justify-center items-center">
            <ULink class="text-blue-600 hover:text-blue-300 underline"
              >Esqueceu a senha?</ULink
            >
            <ULink
              class="text-blue-600 hover:text-blue-300 underline"
              to="/singin"
              >Crie a sua conta!</ULink
            >
          </div>
        </UForm>
      </section>
    </ClientOnly>
  </UContainer>
</template>
