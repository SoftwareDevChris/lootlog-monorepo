"use client";
import { useState } from "react";

import toast from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { TCategory } from "@/types/article.types";
import { createCategory, updateCategory } from "@/lib/category";

import { SubmitFormButton } from "../buttons/SubmitFormButton";
import { useQueryClient } from "@tanstack/react-query";
import {
  Container,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";

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
    <Container>
      <Typography component="h1" className="mb-4 text-2xl font-bold">
        Update category
      </Typography>
      {statusMessage.length > 0 &&
        statusMessage.map((msg, index) => (
          <p key={index} className="form-error-message">
            {msg}
          </p>
        ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormLabel className="mb-1 text-sm">Category name</FormLabel>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                slotProps={{ input: { className: "rounded-lg" } }}
                error={errors.name && true}
                helperText={errors.name?.message}
                name="name"
                placeholder="••••••"
                type="text"
                id="name"
                autoComplete="category-name"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errors.name ? "error" : "primary"}
              />
            )}
          />
          {errors.name?.message && (
            <p className="input-error">{errors.name.message}</p>
          )}
        </FormGroup>

        <div className="mt-8">
          <SubmitFormButton title="Submit" disabled={isSubmitting} />
        </div>
      </form>
    </Container>
  );
};
