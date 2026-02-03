import { useCustomToast } from "~/components/Toast/Toast";
import type { IProfile } from "~/types/profile";
export const useProfile = () => {
  const config = useRuntimeConfig();
  const router = useRouter();
  const { errorToast } = useCustomToast();
  const cookie = useCookie<{ token: string }>("token");
  const profile = useState<IProfile | null>("profile", () => null);
  const profileErrorMessage = useState<string | null>(
    "profileErrorMessage",
    () => null,
  );
  const getProfile = async () => {
    await $fetch(`${config.public.apiBase}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
      onResponse({ response }) {
        if (response.ok) {
          profile.value = response._data;
        }
        if (response.status === 401) {
          router.push("/login");
        }
        if (!response.ok) {
          profileErrorMessage.value = response._data.message;
        }
      },
    });
  };
  const deleteProfile = async () => {
    await $fetch(`${config.public.apiBase}/user/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookie.value.token}`,
      },
      onResponse({ response }) {
        if (response.ok) {
          router.push("/login");
        } else {
          errorToast({
            title: "Ooops!",
            description: "Erro ao deletar o seu usuário!",
          });
        }
      },
    });
  };
  return {
    getProfile,
    deleteProfile,
    profile,
    profileErrorMessage,
  };
};
