"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ForgetPasswordInput,
  useForgetPasswordSechema,
} from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import catchError from "@/lib/utils/catch-error";
import { forgetPassword } from "@/app/api/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  //Hooks
  const forgetPasswordSechema = useForgetPasswordSechema();
  const router=useRouter()
  //Form
  const form = useForm<ForgetPasswordInput>({
    resolver: zodResolver(forgetPasswordSechema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgetPasswordInput> = async (data) =>{
const [res,error]=await catchError(()=>forgetPassword(data.email))
console.log(res, "res");

if(error){
  toast.error(error)
}else {
  toast.success("Check your email!")
  localStorage.setItem("resetEmail",data.email)
  router.push("/en/auth/verfiyCode");
}
  }

  return (
    <div className="flex  items-center justify-center bg-white w-full">
      <div className="bg-white p-8 w-96">
        <h2 className="text-2xl font-bold  text-gray-800 mb-6">
          Forget your password ?
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* email Input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* label */}
                  <FormLabel></FormLabel>
                  {/* Field */}
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  {/* Feddback */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Register Link */}
            <p className="mt-4 text-right text-sm text-customBlue">
              Recover Password?
            </p>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
