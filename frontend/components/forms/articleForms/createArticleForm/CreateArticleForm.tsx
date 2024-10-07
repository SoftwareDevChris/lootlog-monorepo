"use client";

import "./CreateArticleForm.scss";

import { useForm, SubmitHandler } from "react-hook-form";

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

export const CreateArticleForm = () => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });

  // const handleFormSubmit = async (
  //   state: TInitialNewsArticleState,
  //   formData: FormData
  // ) => {
  //   const resizedImage = await resizeImage(formData.get("image") as File);
  //   formData.set("image", resizedImage.image as File);

  //   const withBind = createNewsArticle.bind(null, {
  //     body: body,
  //     categoryId: category.id,
  //   });

  //   const res = await withBind(state, formData);

  //   if (res.status === 201) {
  //     toast.success("Article has been created", {
  //       icon: "🎉",
  //       duration: 4000,
  //     });
  //     router.push("/dashboard/author/my-articles");
  //     return res;
  //   } else return res;
  // };

  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
  } = useForm<Partial<TArticle>>();

  const handleFormSubmit: SubmitHandler<Partial<TArticle>> = (data) => {};

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
            <input required name="title" {...register} />
            {errors.title?.message && (
              <p className="input-error">{errors.title.message}</p>
            )}
          </div>

          <div className="input-group">
            <Label htmlFor="subtitle">Subtitle</Label>
            <input required name="subtitle" {...register} />
            {errors.subtitle?.message && (
              <p className="input-error">{errors.subtitle.message}</p>
            )}
          </div>

          {/* Image */}
          <div className="input-group">
            <Label>{"Select image (1300x732 or above)"}</Label>
            <input
              name="image"
              required
              type="file"
              accept="image/*"
              {...register}
            />
            {errors.image?.message && (
              <p className="input-error">{errors.image.message}</p>
            )}
          </div>

          {/* Content */}
          <div className="input-group">
            <Label>Article body</Label>
            <DynamicArticleEditor
              {...register}
              onChange={(text) =>
                register("body", { onChange: () => text }).onChange
              }
            />
            {errors.body?.message && (
              <p className="input-error">{errors.body.message}</p>
            )}
          </div>

          <select></select>

          {/* Save */}
          <SubmitFormButton disabled title="Create article" />
        </form>
      </div>
    </div>
  );
};
