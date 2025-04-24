"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginInputs, useLoginSechema } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../_hooks/use-login";

export default function Page() {
  //Hooks
  const loginSchema = useLoginSechema();
  const {login ,isPending, error}=useLogin()
  //Form
  const form = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) =>login(data);

  return (
    <div className="flex  items-center justify-center bg-white w-full">
      <div className="bg-white p-8  w-96">
        <h2 className="text-2xl font-bold  text-gray-800 mb-6">Login</h2>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
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
            {/* Password Input */}
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

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-3xl mt-4"
              disabled={
                form.formState.isSubmitting ||
                (form.formState.isSubmitted && !form.formState.isValid)
              }
            >
              Sign In
            </Button>
          </form>
        </Form>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Do not have an account?
          <Link href="/auth/Register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}






