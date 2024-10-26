"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { ArticleForm } from "@/components/forms/ArticleForm";
import { getArticleById } from "@/lib/article";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";
import { UpdateArticleForm } from "@/components/forms/UpdateArticleForm";

export default function EditArticlePage() {
  const params: { id: string } = useParams();

  const { data: article } = useQuery({
    queryKey: ["article", params.id],
    queryFn: () => getArticleById(params.id),
  });

  if (!article) return <LoadingScreen />;

  return (
    <>
      <h1 style={{ marginBottom: "2rem" }}>Edit Article</h1>

      <UpdateArticleForm editArticle={article} />
    </>
  );
}
