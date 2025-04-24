import { RegistertionInputs } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { registerAction } from "../_actions/register.action";
import catchError from "@/lib/utils/catch-error";

export default function useRegister() {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  const language = searchParams.get('lang') || 'en'; // Default to 'en' if no language param

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegistertionInputs) =>
      await catchError(registerAction(fields)),
    onSuccess: () => {
      // Redirect to the login page upon successful registration
      router.push(`/${language}/auth/Login`);
    },
  });

  return { isPending, error, register: mutate };
}
