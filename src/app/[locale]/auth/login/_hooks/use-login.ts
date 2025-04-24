import { useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { LoginInputs } from '@/lib/schemes/auth.schema';
import { signIn } from "next-auth/react";
import { AuthenticationError } from "@/lib/utils/app-errors";

export default function useLogin(){
    const SearchParams=useSearchParams()
     const {isPending, error, mutate}=useMutation({
        mutationFn:async({email,password}:LoginInputs)=>{
            const response =await signIn("credentials",{
                email,
                password,
                redirect:false,
                callbackUrl:decodeURIComponent(SearchParams.get("callbackUrl")||"/en/dashboard")
            })
            if(response?.error)throw new AuthenticationError(response.error)
                return response;
        },
        onSuccess:(data)=>{
            window.location.href=data?.url||"/en/dashboard"
            console.log(data,"data")
        }
     })
    return {isPending,error, login:mutate};
}