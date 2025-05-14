import { RegistertionInputs } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../_actions/register.action";
import catchError from "@/lib/utils/catch-error";
import { useRouter } from "@/i18n/navigation";

export default function useRegister() {
  // Navigation
  const router = useRouter();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegistertionInputs) => await catchError(registerAction(fields)),
    onSuccess: () => {
      // Redirect to the login page upon successful registration
      router.push("/auth/login");
    },
  });

  return { isPending, error, register: mutate };
}
