<script lang="ts" setup></script>
<template>
  <UContainer class="flex h-screen justify-center items-center">
    <section
      class="flex flex-col space-y-4 rounded p-4 bg-card items-center w-full max-w-sm mx-auto min-h-[250px] justify-around"
    >
      <h1 class="text-2xl text-white font-bold">Busque pelo seu serviço</h1>
      <UPinInput
        size="xl"
        class="gap-5"
        color="neutral"
        highlight
        :length="5"
      />

      <UButton
        label="Verificar serviço"
        color="neutral"
        class="justify-center font-bold flex w-full"
      />
    </section>
  </UContainer>
</template>
