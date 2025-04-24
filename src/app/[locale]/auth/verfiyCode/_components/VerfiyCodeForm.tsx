"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useVerificationCodeSechema, verificationCodeInputs } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import catchError from "@/lib/utils/catch-error";
import { verfiyPassword } from "@/app/api/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function Page() {
  //Hooks
  const verificationCodeSechema=useVerificationCodeSechema()
  const router=useRouter()
  //Form
  const form = useForm<verificationCodeInputs>({
    resolver:zodResolver(verificationCodeSechema),
    defaultValues:{
      code:""
    }
  });

  const onSubmit: SubmitHandler<verificationCodeInputs> = async(data) =>{
    const [res, error] =await catchError(() => verfiyPassword(data.code));
    if(error){
      toast.error(error)
    }else{
      toast.success("reset code finished");
      localStorage.setItem("resetCode",data.code)
      router.push("/en/auth/setPassword")

    }

  }

  return (
    <div className="flex  items-center justify-center bg-white w-full">
      <div className="bg-white p-8  w-96">
        {/* HeadLine */}
        <h2 className="text-2xl font-bold  text-gray-800 mb-6">Verify Code</h2>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          {/* code Input */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                {/* label */}
                <FormLabel></FormLabel>
                {/* Field */}
                <FormControl>
                  <Input placeholder="code" {...field} />
                </FormControl>
                {/* Feddback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Register Link */}
          <p className="mt-4 text-right text-sm text-black">
            Did not receive a code ?
            <span className="text-mainColor">Verfiy</span>
          </p>
          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-3xl mt-4"
          >
            Verfiy
          </Button>
        </form>
        </Form>
      </div>
    </div>
  );
}
