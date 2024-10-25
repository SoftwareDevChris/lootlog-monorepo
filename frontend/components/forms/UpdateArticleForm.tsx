"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

import "./ArticleForm.scss";

import { useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { getCategories } from "@/lib/category";
import { updateArticle } from "@/lib/article";

import { TArticle, TUpdateArticle } from "@/types/article.types";

import { Label } from "@/components/ui/label/Label";
import { SubmitFormButton } from "@/components/buttons/SubmitFormButton";

const DynamicArticleEditor = dynamic(
  () => import("../editor/ArticleEditor").then((mod) => mod.ArticleEditor),
  {
    ssr: false,
  }
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
    formState: { errors, isLoading },
    control,
    watch,
  } = useForm<TUpdateArticle>({
    defaultValues: {
      title: editArticle?.title,
      body: editArticle?.body,
      image: editArticle.image,
      categoryId: editArticle?.categoryId,
      isPublic: editArticle.isPublic,
      isFeatured: editArticle.isFeatured,
      YTVideoId: editArticle.YTVideoId,
    },
  });

  // Fix incorrect way of sending image
  const handleFormSubmit: SubmitHandler<TUpdateArticle> = async (data) => {
    const res = await updateArticle(editArticle, data);
    console.log(res);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <div className="form-wrapper">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="create-article-form"
        >
          <div className="input-group">
            <Label htmlFor="isPublic">Is public?</Label>
            <Controller
              name="isPublic"
              control={control}
              render={({ field }) => (
                // Checkbox
                <input
                  {...field}
                  value={"isPublic"}
                  type="checkbox"
                  checked={field.value}
                />
              )}
            />
            {errors.isPublic?.message && (
              <p className="input-error">{errors.isPublic.message}</p>
            )}
          </div>

          <div className="input-group">
            <Label htmlFor="isFeatured">Is featured?</Label>
            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                // Checkbox
                <input
                  {...field}
                  value={"isFeatured"}
                  type="checkbox"
                  checked={field.value}
                />
              )}
            />
            {errors.isFeatured?.message && (
              <p className="input-error">{errors.isFeatured.message}</p>
            )}
          </div>

          <div className="input-group">
            <Label htmlFor="title">Title</Label>
            <input required {...register("title")} />
            {errors.title?.message && (
              <p className="input-error">{errors.title.message}</p>
            )}
          </div>

          <div className="input-group">
            <Label htmlFor="category">Category</Label>
            <select
              {...register("categoryId")}
              style={{ textTransform: "capitalize" }}
            >
              <option value={watch().categoryId}>Select Category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId?.message && (
              <p className="input-error">{errors.categoryId.message}</p>
            )}
          </div>

          {/* Image preview */}
          {editArticle?.image && (
            <div className="input-group">
              <Label htmlFor="image">Image</Label>
              <div
                style={{
                  position: "relative",
                  aspectRatio: 4 / 3,
                  width: 200,
                }}
              >
                <Image
                  src={editArticle?.image.url}
                  alt={editArticle?.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  fill
                  sizes="300px"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="input-group">
            <Label>Article body</Label>
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

          {/* Save */}
          <div style={{ width: "fit-content" }}>
            <SubmitFormButton
              disabled={isLoading}
              title={editArticle ? "Update article" : "Create article"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
