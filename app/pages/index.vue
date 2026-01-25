<script lang="ts" setup>
import CardComponent from "~/components/CardDemand/CardComponent.vue";
import type { IService } from "~/types/service";
const config = useRuntimeConfig();
const cookie = useCookie<{ token: string }>("token");
const errorMessage = ref("");
const service = ref<IService[] | null>(null);
const getAllServices = async () => {
  await $fetch(`${config.public.apiBase}/job/all`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookie.value.token}`,
    },
    onResponse({ response, }) {
      if (response.ok) {
        console.log("response", response)
        service.value = response._data
      } else {
        errorMessage.value = response._data.message
      }
    }
  })
}

onMounted(async () => {
  await getAllServices();
})


</script>
<template>
  <div class="p-2">
    <h1 class="text-2xl font-bold mb-4 mt-4 p-2">Suas demandas</h1>
    <section v-if="errorMessage" class="flex items-center justify-center">
      <p>{{ errorMessage }}</p>
    </section>
    <section v-else>
      <section v-if="service?.length === 0" class="flex items-center justify-center">
        <p>Você não tem nenhum serviço no momento!</p>
      </section>
      <section v-else class="grid grid-cols-3 gap-4">
        <CardComponent v-for="item in service" :key="item.id" :service="item" />
      </section>
    </section>
  </div>
</template>
