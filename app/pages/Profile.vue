<script setup lang="ts"></script>
<template>
  <UContainer>
    <main
      class="flex items-center justify-center flex-col h-full w-full p-4 rounded"
    >
      <section class="gap-4 flex flex-col items-center">
        <UAvatar class="size-16" src="https://github.com/benjamincanac.png">
        </UAvatar>
        <h1 class="text-2xl">Cidrão</h1>
      </section>
      <USeparator size="xs" color="white" class="w-1/3 mt-3 mb-3" />
      <UForm class="space-y-4 items-center justify-center flex flex-col">
        <h2 class="text-xl">Atualize seus dados</h2>
        <UFormField label="Sua atuação" size="xl" class="w-full">
          <USelect
            color="white"
            highlight
            class="w-full"
            multiple
            placeholder="Escolha sua atuação"
            :ui="{
              group: 'bg-card',
              placeholder: 'text-white',
            }"
          ></USelect>
        </UFormField>
        <UFormField size="xl">
          <UInput
            color="white"
            highlight
            placeholder="Digite seu numero de telefone"
            :ui="{ base: 'placeholder:text-white' }"
          />
        </UFormField>
        <UFormField size="xl">
          <UInput
            color="white"
            highlight
            placeholder="Digite seu novo email"
            :ui="{ base: 'placeholder:text-white' }"
          />
        </UFormField>
        <UFormField class="w-full" size="xl">
          <UTextarea
            class="w-full"
            autoresize
            color="white"
            highlight
            placeholder="Fale um pouco sobre você..."
            :ui="{ base: 'placeholder:text-white' }"
          />
        </UFormField>
        <UButton class="w-full r font-bold flex justify-center" color="neutral"
          >Salvar</UButton
        >
      </UForm>
    </main>
  </UContainer>
</template>
