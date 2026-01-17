interface Iprops {
  title: string;
  description: string;
  action?: () => void;
  label?: string;
}

export const useCustomToast = () => {
  const toast = useToast();

  const successToast = ({ title, description, action, label }: Iprops) => {
    toast.add({
      title,
      description,
      close: {
        variant: "ghost",
      },
      actions: action
        ? [{ label, onClick: action, color: "white" }]
        : undefined,
    });
  };
  const errorToast = ({ title, description }: Iprops) => {
    toast.add({
      title,
      description,
      color: "error",
      close: {
        variant: "ghost",
      },
    });
  };
  return {
    successToast,
    errorToast,
  };
};
