"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import "./CreateArticleForm.scss";

import { TCategory } from "@/types/types";

// Lib
import { resizeImage } from "@/lib/resize-image";
import { TInitialNewsArticleState } from "@/lib/schemas";

// Components
import { Label } from "@/components/ui/label/Label";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

const DynamicArticleEditor = dynamic(
  () =>
    import("../../../editor/ArticleEditor").then((mod) => mod.ArticleEditor),
  {
    ssr: false,
  }
);

// Services
import { createNewsArticle } from "@/lib/articleService";

// Toast
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { FormSubmitButton } from "@/components/buttons/FormSubmitButton/SubmitFormButton";

type Props = {
  category: TCategory;
};

export const CreateArticleForm: React.FC<Props> = ({ category }) => {
  const router = useRouter();

  const handleSubmit = async (
    state: TInitialNewsArticleState,
    formData: FormData
  ) => {
    // Resize the image and put in back into the formData
    const resizedImage = await resizeImage(formData.get("image") as File);
    formData.set("image", resizedImage.image as File);

    const withBind = createNewsArticle.bind(null, {
      body: body,
      categoryId: category.id,
    });

    const res = await withBind(state, formData);

    if (res.status === 201) {
      toast.success("Article has been created", {
        icon: "🎉",
        duration: 4000,
      });
      router.push("/dashboard/author/my-articles");
      return res;
    } else return res;
  };

  const initialState: TInitialNewsArticleState = {
    status: 0,
    message: "",
    errors: null,
  };

  const [body, setBody] = useState("");
  const [state, action] = useFormState<TInitialNewsArticleState, FormData>(
    handleSubmit,
    initialState
  );

  return (
    <div style={{ marginTop: "1rem" }}>
      <div className="form-wrapper">
        <form action={action} className="create-article-form">
          {/* Title */}
          <div className="input-group">
            <Label htmlFor="title">Title</Label>
            <Input required name="title" />
            <p className="input-error">{state.errors?.title}</p>
          </div>

          <div className="input-group">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input required name="subtitle" />
            <p className="input-error">{state.errors?.subtitle}</p>
          </div>

          {/* Image */}
          <div className="input-group">
            <Label>{"Select image (1300x732 or above)"}</Label>
            <Input name="image" required type="file" accept="image/*" />
            <p className="input-error">{state.errors?.image}</p>
          </div>

          {/* Content */}
          <div className="input-group">
            <Label>Article body</Label>
            <DynamicArticleEditor onChange={(text) => setBody(text)} />
            <p className="input-error">{state.errors?.body}</p>
          </div>

          {/* Save */}
          <FormSubmitButton title="Create article" />
        </form>
      </div>
    </div>
  );
};
