"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { DiplomaFormValues } from "@/lib/Types/diploma";

export function AddDiplomaModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
 const form= useForm<DiplomaFormValues>();

  const onSubmit = (data: DiplomaFormValues) => {
    const photoFile = data.photo?.[0];
    console.log({
      diplomaName: data.diplomaName,
      description: data.description,
      photo: photoFile,
    });

    onClose();
   form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">
            Add Diploma
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-4">
            <Label
              htmlFor="photo"
              className="cursor-pointer flex items-center justify-center border rounded-full w-12 h-12 text-xl text-gray-500 hover:bg-gray-100"
            >
              <Plus />
              <input
                id="photo"
                type="file"
                className="hidden"
                accept="image/*"
                {...form.register("photo", { required: true })}
              />
            </Label>

            <div className="flex-1 space-y-2">
              <Label htmlFor="diplomaName">Diploma Name</Label>
              <Input
                id="diplomaName"
                {...form.register("diplomaName", { required: "Name is required" })}
              />
              {/* {form.errors.diplomaName && (
                <p className="text-sm text-red-500">
                  {form.errors.diplomaName.message}
                </p>
              )} */}
            </div>

            <div className="flex-1 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...form.register("description")} />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Back
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
