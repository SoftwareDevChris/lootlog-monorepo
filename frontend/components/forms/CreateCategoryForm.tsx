"use client";
import { useState } from "react";

import toast from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { TCategory } from "@/types/article.types";
import { createCategory } from "@/lib/category";

import { Label } from "../ui/label/Label";
import { SubmitFormButton } from "../buttons/SubmitFormButton";

export const CreateCategoryForm = () => {
  const [statusMessage, setStatusMessage] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Partial<TCategory>>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<Partial<TCategory>> = async (data) => {
    const res = await createCategory(data);
    const status = await res?.json();

    if (res?.ok) {
      toast.success("User updated successfully");
      window.location.href = "/dashboard/admin/categories";
      return;
    }

    setStatusMessage([status.message]);
  };

  return (
    <div
      className="form-wrapper"
      style={{ maxWidth: "30rem", margin: "0 auto" }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Create category</h1>
      {statusMessage.length > 0 &&
        statusMessage.map((msg, index) => (
          <p key={index} className="form-error-message">
            {msg}
          </p>
        ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <Label htmlFor="name">Name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <input {...field} type="text" required />}
          />
          {errors.name?.message && (
            <p className="input-error">{errors.name.message}</p>
          )}
        </div>

        <SubmitFormButton title="Submit" disabled={isSubmitting} />
      </form>
    </div>
  );
};
