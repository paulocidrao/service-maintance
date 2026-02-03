import { useCustomToast } from "~/components/Toast/Toast";
import type { IService } from "~/types/service";

export const userServices = () => {
  const config = useRuntimeConfig();
  const router = useRouter();
  const cookie = useCookie<{ token: string }>("token");
  const service = useState<IService[] | null>("services", () => null);
  const errorMessage = useState<string>("servicesError", () => "");
  const { successToast } = useCustomToast();

  const getAllServices = async () => {
    await $fetch(`${config.public.apiBase}/job/all`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
      onResponse({ response }) {
        if (response.ok) {
          service.value = response._data;
        }
        if (response.status === 401) {
          router.push("/login");
        }
        if (!response.ok) {
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
