"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { getArticleById } from "@/lib/article";

import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";
import { UpdateArticleForm } from "@/components/forms/UpdateArticleForm";
import { Typography } from "@mui/material";

export default function EditArticlePage() {
  const params: { id: string } = useParams();

  console.log(params.id);

  const { data: article } = useQuery({
    queryKey: ["article", params.id],
    queryFn: async () => await getArticleById(params.id),
  });

  if (!article) return <LoadingScreen />;

  return <UpdateArticleForm editArticle={article} />;
}
