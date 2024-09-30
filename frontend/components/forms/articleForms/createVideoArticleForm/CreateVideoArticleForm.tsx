"use client";
import { FC, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import toast from "react-hot-toast";

import { TCategory } from "@/types/types";

import { createVideoArticle } from "@/lib/articleService";
import { TInitialVideoArticleState } from "@/lib/schemas";

// Components
import { Input } from "@/components/ui/input/Input";
import { Label } from "@/components/ui/label/Label";
import { Button } from "@/components/ui/button/Button";
import { FormSubmitButton } from "@/components/buttons/FormSubmitButton/SubmitFormButton";

const DynamicArticleEditor = dynamic(
  () =>
    import("../../../editor/ArticleEditor").then((mod) => mod.ArticleEditor),
  {
    ssr: false,
  }
);

const initialState: TInitialVideoArticleState = {
  status: 0,
  errors: null,
  message: "",
};

type Props = {
  category: TCategory;
};

export const CreateVideoArticleForm: FC<Props> = ({ category }) => {
  const router = useRouter();

  const handleSubmit = async (
    state: TInitialVideoArticleState,
    data: FormData
  ) => {
    const withBound = createVideoArticle.bind(null, {
      body: body ?? "",
      categoryId: category.id,
    });
    const res = await withBound(state, data);

    if (res.status === 201) {
      toast.success("Article has been created", {
        icon: "🎉",
        duration: 4000,
      });
      router.push("/dashboard/author/my-articles");
    }

    return res;
  };

  const [body, setBody] = useState<string | undefined>("");
  const [state, action] = useFormState<TInitialVideoArticleState, FormData>(
    handleSubmit,
    initialState
  );

  return (
    <div style={{ marginTop: "1rem" }}>
      <form action={action}>
        <div className="input-group">
          <Label>Title</Label>
          <Input type="text" name="title" />
          <p className="input-error">{state.errors?.title}</p>
        </div>

        <div className="input-group">
          <Label>Subtitle</Label>
          <Input type="text" name="subtitle" />
          <p className="input-error">{state.errors?.subtitle}</p>
        </div>

        <div className="input-group">
          <Label>YouTube Video ID</Label>
          <Input type="text" name="youtubeVideoId" />
          <div>
            {state.errors?.youtubeVideoId?.map((err, i) => {
              return (
                <p className="input-error" key={i}>
                  {err}
                </p>
              );
            })}
          </div>
        </div>

        <div className="input-group">
          <Label>Short body</Label>
          <DynamicArticleEditor onChange={(txt) => setBody(txt)} />
          <p className="input-error">{state.errors?.body}</p>
        </div>

        <FormSubmitButton title="Create article" />
      </form>
    </div>
  );
};
