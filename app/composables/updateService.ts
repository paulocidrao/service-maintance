import type { IUpdateService } from "~/types/service";
import { useCustomToast } from "~/components/Toast/Toast";

const wasUpdated = ref(false);

export const useUpdateService = () => {
  const { successToast, errorToast } = useCustomToast();
  const { getAllServices } = userServices();
  const config = useRuntimeConfig();
  const cookie = useCookie<{ token: string }>("token");
  const updateService = async (id: string, data: IUpdateService) => {
    await $fetch(`${config.public.apiBase}/job/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
      body: data,
      async onResponse({ response }) {
        if (response.ok) {
          successToast({
            title: "Serviço atualizado!",
            description: "Seu serviço foi atualizado com sucesso!",
          });
          wasUpdated.value = !wasUpdated.value;
          await getAllServices();
        } else {
          errorToast({
            title: "Oops!",
            description: response._data.message,
          });
          wasUpdated.value = false;
        }
      },
    });
  };
  return {
    wasUpdated,
    updateService,
  };
};
