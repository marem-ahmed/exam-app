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
import { SetPasswordInputs, useSetPasswordSechema } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import catchError from "@/lib/utils/catch-error";
import { resetPassword } from "@/app/api/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {

  //variables
  const resetEmail=localStorage.getItem("resetEmail")
  const resetCode=localStorage.getItem("resetCode")

  //Hooks 
  const setPasswordSchema=useSetPasswordSechema()
  const router=useRouter()
  // Form
  const form = useForm<SetPasswordInputs>({
    resolver:zodResolver(setPasswordSchema),
    defaultValues:{
      password:"",
      rePassword:""
    }
  });

  const onSubmit: SubmitHandler<SetPasswordInputs> =async (data) =>{
      if (!resetEmail || !resetCode) {
      toast.error("Reset info missing. Please restart the process.");
      return;
    }
    const [res,error]=await catchError(()=> resetPassword(resetEmail, resetCode, data.password, data.rePassword))
     if (error) {
      toast.error(error);
    } else {
      toast.success("Password has been successfully reset!");
      router.push("/en/auth/login");
    }
  

  } 

  return (
    <div className="flex  items-center justify-center bg-white w-full">
      <div className="bg-white p-8  w-96">
        <h2 className="text-2xl font-bold  text-gray-800 mb-6">
          Set a password
        </h2>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/*Email Input */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* label */}
                <FormLabel></FormLabel>
                {/* Field */}
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                {/* Feddback */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* re-create Password Input */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                {/* label */}
                <FormLabel></FormLabel>
                {/* Field */}
                <FormControl>
                  <Input placeholder="rePassword" {...field} />
                </FormControl>
                {/* Feddback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Login Button */}
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700  rounded-3xl mt-4"
           disabled={
                form.formState.isSubmitting ||
                (form.formState.isSubmitted && !form.formState.isValid)
              }>
            Sign In

          </Button>
        </form>
        </Form>
      </div>
    </div>
  );
}
