"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

import { useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { getCategories } from "@/lib/category";
import { deleteArticle, updateArticle } from "@/lib/article";

import { TArticle, TUpdateArticle } from "@/types/article.types";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Select,
  MenuItem,
  Container,
  FormLabel,
  Typography,
  Button,
} from "@mui/material";
import { useModalStore } from "@/store/modal-store";

const DynamicArticleEditor = dynamic(
  () => import("../editor/ArticleEditor").then((mod) => mod.ArticleEditor),
  {
    ssr: false,
  },
);

type Props = {
  editArticle: TArticle;
};

export const UpdateArticleForm = ({ editArticle }: Props) => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<TUpdateArticle>({
    defaultValues: {
      title: editArticle?.title,
      body: editArticle?.body,
      image: editArticle.image,
      isPublic: editArticle.isPublic,
      isFeatured: editArticle.isFeatured,
      YTVideoId: editArticle.YTVideoId,
      category: editArticle.category,
      categoryId: editArticle.category?.id,
    },
  });

  const modal = useModalStore();

  const handleDelete = () => {
    modal.show(
      "Delete article",
      `Are you sure you want to delete this article?`,
      "Cancel",
      "Delete",
      async () => {
        const res = await deleteArticle(editArticle.id);
        if (res?.ok) window.location.href = "/dashboard/author/my-articles";
      },
      "delete",
    );
  };

  const handleFormSubmit: SubmitHandler<TUpdateArticle> = async (data) => {
    const res = await updateArticle(editArticle, data);

    if (res?.ok) {
      window.location.href = "/dashboard/author/my-articles";
      return;
    } else {
      console.log("Updating article failed:", res);
      throw new Error(res?.statusText);
    }
  };

  return (
    <Container>
      <Typography component="h1" className="mb-4 text-2xl font-bold">
        Edit article
      </Typography>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <FormGroup className="w-full rounded-lg bg-neutral-800 p-4">
            <Controller
              name="isPublic"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.value ?? false}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Public"
                    name="isPublic"
                    labelPlacement="top"
                  />
                </FormGroup>
              )}
            />
            {errors.isPublic?.message && (
              <p className="input-error">{errors.isPublic.message}</p>
            )}
          </FormGroup>

          <FormGroup className="w-full rounded-lg bg-neutral-800 p-4">
            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        {...field}
                        checked={field.value ?? false}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Featured"
                    name="isFeatured"
                    labelPlacement="top"
                  />
                </FormGroup>
              )}
            />
            {errors.isFeatured?.message && (
              <p className="input-error">{errors.isFeatured.message}</p>
            )}
          </FormGroup>
        </div>

        <FormControl>
          <FormLabel htmlFor="title" className="mb-1 text-sm">
            Title
          </FormLabel>
          <TextField
            slotProps={{ input: { className: "rounded-lg" } }}
            fullWidth
            required
            variant="outlined"
            {...register("title")}
          />
          {errors.title?.message && (
            <p className="input-error">{errors.title.message}</p>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="categoryId" className="mb-1 text-sm">
            Category
          </FormLabel>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select
                className="rounded-lg capitalize"
                name={field.name}
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
            )}
          />
          {errors.categoryId?.message && (
            <p className="input-error">{errors.categoryId.message}</p>
          )}
        </FormControl>

        {editArticle?.image && (
          <FormControl>
            <FormLabel htmlFor="image" className="mb-1 text-sm">
              Image
            </FormLabel>
            <div className="relative aspect-video max-w-[20rem] overflow-hidden rounded-lg">
              <Image
                src={editArticle?.image.url}
                alt={editArticle?.title}
                className="h-full w-full object-cover object-center"
                fill
                sizes="300px"
              />
            </div>
          </FormControl>
        )}

        <div className="input-group">
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
        </div>

        <div className="flex w-full flex-col items-center justify-end gap-2 sm:flex-row">
          <Button
            variant="contained"
            color="warning"
            type="submit"
            disabled={isSubmitting}
          >
            Update article
          </Button>
        </div>
      </form>

      <Button
        variant="contained"
        color="error"
        type="button"
        onClick={handleDelete}
      >
        Delete
      </Button>
    </Container>
  );
};
