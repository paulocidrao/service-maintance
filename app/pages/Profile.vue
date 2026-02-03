<script setup lang="ts">
import DeleteModal from '~/components/DeleteModal/DeleteModal.vue';

const { getProfile, profile } = useProfile()

onMounted(async () => {
  await getProfile()
})

</script>
<template>
  <UContainer>
    <main class="flex items-center justify-center flex-col h-full w-full p-4 rounded">
      <section class="gap-4 flex flex-col items-center">
        <UAvatar class="size-16" src="https://github.com/benjamincanac.png">
        </UAvatar>
        <h1 class="text-2xl">{{ profile?.name }}</h1>
      </section>
      <USeparator size="xs" color="white" class="w-1/3 mt-3 mb-3" />
      <UForm class="space-y-4 items-center justify-center flex flex-col">
        <h2 class="text-xl">Atualize seus dados</h2>

        <UFormField size="xl">
          <UInput color="white" :default-value="profile?.phone" highlight placeholder="Digite seu numero de telefone"
            :ui="{ base: 'placeholder:text-white' }" />
        </UFormField>
        <UFormField size="xl">
          <UInput color="white" :default-value="profile?.email" highlight placeholder="Digite seu novo email"
            :ui="{ base: 'placeholder:text-white' }" />
        </UFormField>
        <UButton class="w-full  font-bold flex justify-center" color="neutral">Salvar</UButton>
        <DeleteModal />
      </UForm>

    </main>
  </UContainer>
</template>
