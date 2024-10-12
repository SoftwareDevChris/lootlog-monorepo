"use client";

import "./CreateArticleForm.scss";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { TArticle, TCategory } from "@/types/article.types";
import { resizeImage } from "@/lib/resize-image";

import { Label } from "@/components/ui/label/Label";

const DynamicArticleEditor = dynamic(
  () =>
    import("../../../editor/ArticleEditor").then((mod) => mod.ArticleEditor),
  {
    ssr: false,
  }
);

import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { SubmitFormButton } from "@/components/buttons/SubmitFormButton";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/category";
import { createArticle } from "@/lib/article";

export const CreateArticleForm = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
    control,
  } = useForm<Partial<TArticle>>({
    defaultValues: {
      title: "",
      subtitle: "",
      body: "",
      image: null,
    },
  });

  const handleFormSubmit: SubmitHandler<Partial<TArticle>> = async (data) => {
    const res = await createArticle(data);
    console.log(res);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <div className="form-wrapper">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="create-article-form"
        >
          {/* Title */}
          <div className="input-group">
            <Label htmlFor="title">Title</Label>
            <input required {...register("title")} />
            {errors.title?.message && (
              <p className="input-error">{errors.title.message}</p>
            )}
          </div>

          <div className="input-group">
            <Label htmlFor="subtitle">Subtitle</Label>
            <input required {...register("subtitle")} />
            {errors.subtitle?.message && (
              <p className="input-error">{errors.subtitle.message}</p>
            )}
          </div>

          <div className="input-group">
            <Label htmlFor="category">Category</Label>
            <select {...register("category")}>
              <option value="">Select category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div className="input-group">
            <Label>{"Select image (1300x732 or above)"}</Label>
            <input
              required
              type="file"
              accept="image/*"
              {...register("image")}
            />
            {errors.image?.message && (
              <p className="input-error">{errors.image.message}</p>
            )}
          </div>

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
            <SubmitFormButton disabled={isLoading} title="Create article" />
          </div>
        </form>
      </div>
    </div>
  );
};
