"use client";
import { useState } from "react";

import toast from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { TCategory } from "@/types/article.types";
import { createCategory, updateCategory } from "@/lib/category";

import { Label } from "../ui/label/Label";
import { SubmitFormButton } from "../buttons/SubmitFormButton";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  existingCategory?: TCategory;
};

export const CategoryForm = ({ existingCategory }: Props) => {
  const [statusMessage, setStatusMessage] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TCategory>({
    defaultValues: {
      name: existingCategory?.name ?? "",
    },
  });

  const handleResponse = async (res: Response | null) => {
    if (res?.ok) {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      window.location.href = "/dashboard/admin/categories";
    } else {
      const status = await res?.json();
      setStatusMessage([status.message]);
    }
  };

  const onSubmit: SubmitHandler<TCategory> = async (data) => {
    if (existingCategory) {
      const res = await updateCategory({
        ...existingCategory,
        name: data.name,
      });

      await handleResponse(res);
      return;
    }
    if (!existingCategory) {
      const res = await createCategory(data);
      await handleResponse(res);
      return;
    }
  };

  return (
    <div
      className="form-wrapper"
      style={{ maxWidth: "30rem", margin: "0 auto" }}
    >
      <h1 style={{ marginBottom: "2rem" }}>
        {existingCategory?.id ? "Update category" : "New category"}
      </h1>
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
