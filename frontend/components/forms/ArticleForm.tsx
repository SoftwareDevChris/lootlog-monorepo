"use client";
import Image from "next/image";
import dynamic from "next/dynamic";

import { useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { getCategories } from "@/lib/category";
import { createArticle } from "@/lib/article";

import { TCreateArticle } from "@/types/article.types";

import { SubmitFormButton } from "@/components/buttons/SubmitFormButton";

const DynamicArticleEditor = dynamic(
  () => import("../editor/ArticleEditor").then((mod) => mod.ArticleEditor),
  {
    ssr: false,
  },
);

import {
  Container,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const ArticleForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<TCreateArticle>({
    defaultValues: {
      title: "",
      body: "",
      image: null,
      YTVideoId: "",
      categoryId: 0,
    },
  });

  const handleFormSubmit: SubmitHandler<TCreateArticle> = async (data) => {
    setIsLoading(true);
    const res = await createArticle(data);

    if (res?.ok) {
      window.location.href = "/dashboard/author/my-articles";
      return;
    }

    console.log(res);
    setIsLoading(false);
  };

  return (
    <Container>
      <Typography
        component="h1"
        fontSize="1.5rem"
        fontWeight={700}
        marginBottom="1rem"
      >
        New article
      </Typography>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Title */}
        <FormControl fullWidth>
          <FormLabel htmlFor="title" className="mb-1 text-sm">
            Title
          </FormLabel>
          <TextField
            {...register("title")}
            size="small"
            slotProps={{ input: { className: "rounded-lg" } }}
            error={errors.title && true}
            helperText={errors.title?.message}
            name="title"
            type="text"
            id="title"
            autoComplete="title"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={errors.title ? "error" : "primary"}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="category" className="mb-1 text-sm">
            Category
          </FormLabel>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <Select
                  size="small"
                  className="rounded-lg capitalize"
                  labelId="article-category-select"
                  placeholder="Select a category"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {categories?.map((category) => (
                    <MenuItem
                      key={category.id}
                      value={category.id}
                      style={{ textTransform: "capitalize" }}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {errors.categoryId?.message && (
            <p className="input-error">{errors.categoryId.message}</p>
          )}
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="image" className="mb-1 text-sm">
            Image
          </FormLabel>
          <TextField
            {...register("image")}
            size="small"
            slotProps={{ input: { className: "rounded-lg" } }}
            error={errors.image && true}
            helperText={errors.image?.message}
            name="image"
            type="file"
            id="image"
            autoFocus
            fullWidth
            variant="outlined"
            color={errors.image ? "error" : "primary"}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="video" className="mb-1 text-sm">
            Youtube video ID
          </FormLabel>
          <TextField
            {...register("YTVideoId")}
            size="small"
            slotProps={{ input: { className: "rounded-lg" } }}
            error={errors.title && true}
            helperText={errors.title?.message}
            name="YTVideoId"
            type="text"
            id="YTVideoId"
            autoFocus
            fullWidth
            variant="outlined"
            color={errors.YTVideoId ? "error" : "primary"}
          />
        </FormControl>

        {/* Content */}
        <FormControl fullWidth>
          <Controller
            name="body"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DynamicArticleEditor
                articleBody={field.value}
                onChange={(text) => field.onChange(text)}
              />
            )}
          />

          {errors.body?.message && (
            <p className="input-error">{errors.body.message}</p>
          )}
        </FormControl>

        {/* Save */}
        <div style={{ width: "fit-content" }}>
          <SubmitFormButton disabled={isLoading} title="Create article" />
        </div>
      </form>
    </Container>
  );
};
