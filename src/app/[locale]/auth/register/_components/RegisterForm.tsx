"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../_hooks/use-register";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RegistertionInputs, useRegisterSchema } from "@/lib/schemes/auth.schema";

export default function Page() {
  //Hooks
  const registerationSchema = useRegisterSchema();
  const { register } = useRegister();

  //navigation
  //Form

  const form = useForm<RegistertionInputs>({
    resolver: zodResolver(registerationSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  // const onSubmit: SubmitHandler<RegistertionInputs> = (data) =>
  //   console.log(data);
  // Functions
  function onSubmit(values: RegistertionInputs) {
    register(values);
  }

  return (
    <div className="flex  items-center justify-center bg-white w-full">
      <div className="bg-white p-8  w-96 mt-14">
        <h1 className="text-2xl font-bold  text-gray-800 mb-6">Sign Up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* userName Input */}

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel></FormLabel>
                  {/*  Field */}
                  <FormControl>
                    <Input className="mb-2" placeholder="UserName" {...field} />
                  </FormControl>
                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* First name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel></FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input placeholder="first name" {...field} />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LastName Input */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  {/* label */}
                  <FormLabel></FormLabel>
                  {/* Field */}
                  <FormControl>
                    <Input placeholder="last Name" {...field} />
                  </FormControl>
                  {/* Feddback */}
                  <FormMessage />
                </FormItem>
              )}
            />
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
            {/* rePassword Input */}
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
            {/* phone Input */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* label */}
                  <FormLabel></FormLabel>
                  {/* Field */}
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  {/* Feddback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700  rounded-3xl mt-4"
              disabled={form.formState.isSubmitting || (form.formState.isSubmitted && !form.formState.isValid)}>
              Create Account
            </Button>
          </form>
        </Form>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account ?
          <Link href="/register" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
