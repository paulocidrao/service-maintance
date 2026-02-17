<script lang="ts" setup>
import CardComponent from "~/components/CardDemand/CardComponent.vue";
const { getAllServices, errorMessage, service } = userServices()
const currentPage = ref(1)
const perPage = computed(() => service.value?.perPage ?? 10);
const total = computed(() => service.value?.total ?? 0);

onMounted(async () => {
  await getAllServices(1);
})


watch(currentPage, () => {
  refreshNuxtData()
});

const pageChange = async (value: number) => {
  await getAllServices(value)
}

</script>
<template>
  <div class="p-2">
    <h1 class="text-2xl font-bold mb-4 mt-4 p-2">Suas demandas</h1>
    <section v-if="errorMessage" class="flex items-center justify-center">
      <p>{{ errorMessage }}</p>
    </section>
    <section v-else>
      <section v-if="service?.data?.length === 0" class="flex items-center justify-center">
        <p>Você não tem nenhum serviço no momento!</p>
      </section>
      <section v-else class="grid grid-cols-3 gap-4">
        <CardComponent v-for="item in service?.data" :key="item.id" :service="item" />
      </section>
      <div class="w-full items-center  p-2">
        <UPagination v-model="currentPage" :total="total" :items-per-page="perPage" size="lg"
          @update:page="pageChange" />
      </div>
    </section>
  </div>
</template>
