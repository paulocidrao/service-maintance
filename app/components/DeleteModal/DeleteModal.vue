<script lang="ts" setup>
const isOpen = ref(false);
const { deleteProfile } = useProfile();
</script>
<template>
  <UModal v-model:open="isOpen" :dismissible="true" title="Você tem certeza ?" :ui="{
    content: 'bg-card',
    overlay: 'bg-black/60 transition-opacity',
    close: 'hover:bg-black',
    footer: 'flex items-center justify-between'
  }">
    <UButton label="Delete sua conta" class="mt-2 flex justify-center text-white  font-bold w-full cursor-pointer"
      color="error" @click="isOpen = true" />
    <template #body>
      <p>Ao deletear a sua conta, você perdera todos os seus serviços e dados</p>
    </template>
    <template #footer>
      <UButton label="Cancelar" color="neutral" @click="isOpen = false" />
      <UButton label="Confirmar" class="mt-2 flex justify-center text-white  font-bold  cursor-pointer" color="error"
        @click="deleteProfile()" />
    </template>
  </UModal>
</template>
