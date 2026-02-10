<script lang="ts" setup>
const { getServiceById, oneService, errorMessage, finishService } = userServices();
const router = useRoute()
const route = useRouter()
const id = router.params.id
if (id) {
  await getServiceById(id.toString());
}

const handleFinishService = async (id: string) => {
  await finishService(id);
  route.push("/");
}

</script>

<template>
  <div>
    <section v-if="errorMessage">
      <h1>{{ errorMessage }}</h1>
    </section>
    <section v-if="id && oneService" class="w-full items-center justify-center flex">
      <UCard
        :ui="{ root: 'w-1/2 bg-card border-0 shadow-none ring-0', body: 'border-0', header: 'border-0', footer: 'border-0' }">
        <template #header>
          <div class="flex justify-between items-center ">
            <h1>Cliente: {{ oneService.clientName }}</h1>
            <span>Codigo: {{ oneService.userCode }}</span>
          </div>
        </template>
        <section class="space-y-4">
          <div>
            <span class="text-balance">Descirção: {{ oneService.description }}</span>
          </div>
          <div>
            <span>Data de entrega: {{ formatDate(oneService.deliveryDate) }}</span>
          </div>
          <div>
            <span>Orçamento: {{ formatMoney(oneService.budget.price) }}</span>
          </div>
          <div>
            <span>Status: {{ oneService.budget.status }}</span>
          </div>
        </section>
        <template #footer>
          <div v-if="!oneService.isFinished" class="items-center flex justify-between">
            <ModalComponent :id="oneService.id" :code="oneService.userCode"
              :money="formatMoney(oneService.budget.price)" :description="oneService.description"
              :title="oneService.clientName" :date="formatDateForInput(oneService.deliveryDate)" />
            <UButton color="primary" @click="handleFinishService(id.toString())">Finalizar</UButton>
          </div>
        </template>
      </UCard>
    </section>
  </div>
</template>