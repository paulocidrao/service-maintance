<script setup lang="ts">
import { reactive } from "vue";
import { vMaska } from "maska/vue";
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import DeleteModal from '~/components/DeleteModal/DeleteModal.vue';

const { getProfile, profile, updateProfile } = useProfile();


const schema = z.object({
  email: z.email("Digite um email válido"),
  phone: z
    .string("Digite um número válido")
    .min(11, "O telefone precisa ter no mínimo 11 dígitos")
});
type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  email: profile.value!.email,
  phone: profile.value!.phone,
})

const handleUpdateUser = async (event: FormSubmitEvent<Schema>) => {
  if (event.isTrusted) {
    await updateProfile(profile.value!.id, event.data)
  }
}

onMounted(async () => {
  await getProfile()
})

</script>
<template>
  <UContainer>
    <main class="flex items-center justify-center flex-col h-full w-full p-4 rounded">
      <section class="gap-4 flex flex-col items-center">
        <UAvatar class="size-16" size="2xl" :alt="profile?.name">
        </UAvatar>
        <h1 class="text-2xl">{{ profile?.name }}</h1>
      </section>
      <USeparator size="xs" color="white" class="w-1/3 mt-3 mb-3" />
      <UForm :schema="schema" :state="state" class="space-y-4 items-center justify-center flex flex-col"
        @submit="handleUpdateUser">
        <h2 class="text-xl">Atualize seus dados</h2>

        <UFormField size="xl" name="phone">
          <UInput v-model="state.phone" v-maska="'(##)#####-####'" highlight type="tel" color="neutral"
            placeholder="(99)99999-9999" class="w-full" :ui="{ base: 'placeholder:text-white' }" />
        </UFormField>
        <UFormField size="xl">
          <UInput v-model="state.email" color="white" highlight placeholder="Digite seu novo email"
            :ui="{ base: 'placeholder:text-white' }" />
        </UFormField>
        <UButton type="submit" class="w-full  font-bold flex justify-center" color="neutral">Salvar</UButton>
        <DeleteModal />
      </UForm>

    </main>
  </UContainer>
</template>
