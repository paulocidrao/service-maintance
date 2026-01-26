import { useCustomToast } from "~/components/Toast/Toast";
import type { IService } from "~/types/service";

const config = useRuntimeConfig();
const cookie = useCookie<{ token: string }>("token");
const service = ref<IService[] | null>(null);
const errorMessage = ref("");
const { successToast } = useCustomToast();
export const userServices = () => {
  const getAllServices = async () => {
    await $fetch(`${config.public.apiBase}/job/all`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
      onResponse({ response }) {
        if (response.ok) {
          console.log("response", response);
          service.value = response._data;
        } else {
          errorMessage.value = response._data.message;
        }
      },
    });
  };
  const finishService = async (id: string) => {
    await $fetch(`${config.public.apiBase}/job/finished/${id}`, {
      method: "PATCH",
      body: {
        isFinished: true,
      },
      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
      async onResponse({ response }) {
        if (response.ok) {
          successToast({
            title: "Sucesso!",
            description: "Serviço concluido!",
          });
          await getAllServices();
        } else {
          errorMessage.value = response._data.message;
        }
      },
    });
  };
  return {
    service,
    errorMessage,
    getAllServices,
    finishService,
  };
};
