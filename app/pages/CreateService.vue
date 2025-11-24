<script lang="ts" setup></script>
<template>
  <UContainer>
    <ClientOnly>
      <section class="mt-4 items-center justify-center flex flex-col">
        <UForm class="space-y-4 shadow bg-card p-4 rounded">
          <h1 class="text-white font-bold text-center text-2xl">
            Cadastre um novo serviço
          </h1>
          <UFormField required label="Nome do cliente" name="name">
            <UInput
              autofocus
              highlight
              type="text"
              color="neutral"
              placeholder="Digite o nome do cliente"
              class="w-full"
              :ui="{ base: 'placeholder:text-white' }"
            />
          </UFormField>
          <UFormField required label="Email do cliente" name="email">
            <UInput
              highlight
              type="text"
              color="neutral"
              placeholder="Digite o email do cliente"
              class="w-full"
              :ui="{ base: 'placeholder:text-white' }"
            />
          </UFormField>
          <UFormField required label="Date de entrega" name="date">
            <UInput
              highlight
              type="date"
              color="neutral"
              class="w-full"
              :ui="{ base: 'placeholder:text-white' }"
            />
          </UFormField>
          <UFormField label="Orçamento" name="date">
            <UInput
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
