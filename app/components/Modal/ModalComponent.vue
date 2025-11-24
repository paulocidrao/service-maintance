<script lang="ts" setup>
const statusValue = ref(["Done", "Pending", "Cancel", "Aprove"]);
defineProps<{
  title: string;
  code: string;
  description: string;
  money: string;
  date: string;
  status: "Done" | "Pending" | "Cancel" | "Aprove";
}>();
</script>

<template>
  <UModal
    :dismissible="false"
    :title="title"
    :ui="{
      content: 'bg-card',
      overlay: 'bg-black/60 transition-opacity',
      close: 'hover:bg-black',
    }"
  >
    <UButton label="Atualizar" color="neutral" class="cursor-pointer" />
    <template #body="{ close }">
      <section>
        <UForm class="flex flex-col space-y-4">
          <UFormField
            size="xl"
            label="Descrição do problema"
            name="description"
          >
            <UInput
              color="neutral"
              aria-label="Atualize a descrição do serviço"
              placeholder="Digite o novo nome do serviço"
              highlight
              class="w-full"
              :default-value="description"
              autofocus
            />
          </UFormField>
          <UFormField size="xl" name="money" label="Orçamento">
            <UInput
              aria-label="Atualize o valor do seu orçamento"
              placeholder="Digite um novo valor de orçamento"
              color="neutral"
              highlight
              :default-value="money"
              class="w-full"
            />
          </UFormField>
          <UFormField size="xl" name="code" label="Código do cliente">
            <span class="">{{ code }}</span>
          </UFormField>
          <UFormField size="xl" label="Data de entrega" name="date">
            <UInput
              color="neutral"
              aria-label="Atualize a sua data de entrega"
              placeholder="Digite uma nova data de entrega"
              highlight
              class="w-full"
              type="date"
              :default-value="date"
            />
          </UFormField>
          <UFormField size="xl" label="Status" name="status">
            <USelect
              color="neutral"
              aria-label="Selecione um novo status para o serviço"
              highlight
              class="w-full"
              type="item"
              :default-value="status"
              :items="statusValue"
              :ui="{
                group: 'bg-card',
              }"
            />
          </UFormField>
          <UButton
            class="items-center justify-center flex cursor-pointer font-bold"
            color="neutral"
            @click="close"
            >Atualizar</UButton
          >
        </UForm>
      </section>
    </template>
  </UModal>
</template>
