<script lang="ts" setup>
const props = defineProps<{
  isModalOpen: boolean;
}>();

const emit = defineEmits<{
  closeModal: [value: boolean];
}>();

const handleClose = () => {
  emit("closeModal", false);
};

console.log("CloseModal", emit);
console.log("IsmodalOpen", props.isModalOpen);
</script>

<template>
  <section
    v-show="props.isModalOpen"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black/60 p-4"
  >
    <div
      class="bg-card p-6 rounded shadow-2xl w-full space-y-4 sm:max-w-1/2 md:max-w-1/2 lg:max-w-1/2 xl:max-w-1/3"
    >
      <i
        class="w-full flex items-center justify-end cursor-pointer"
        @click="handleClose"
      >
        <UIcon name="i-lucide-x" class="size-5" />
      </i>
      <section class="flex flex-col gap-1 text-xl">
        <p>Prestador: Cidrão</p>
        <span
          >Data de entrega: {{ new Date().toLocaleDateString("pt-BR") }}</span
        >
        <span>Orçamento: R$:00,00</span>
        <span class="flex items-center gap-1"
          >Status:
          <div class="rounded-full p-1.5 bg-green-600 w-0.5 h-0.5" />
          Orçamento aprovado</span
        >
      </section>

      <section
        v-show="true"
        class="w-full justify-around items-center flex gap-3"
      >
        <UButton
          color="error"
          class="w-1/2 font-bold justify-center"
          label="Recusar orçamento"
          @click="handleClose"
        />
        <UButton
          class="w-1/2 text-center justify-center font-bold"
          label="Aprovar orçamento"
          @click="handleClose"
        />
      </section>

      <section v-show="false">
        <UButton
          size="xl"
          color="neutral"
          class="w-full font-bold cursor-pointer justify-center text-center"
          label="Fechar"
          @click="handleClose"
        />
      </section>
    </div>
  </section>
</template>
