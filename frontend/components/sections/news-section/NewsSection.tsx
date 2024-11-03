"use client";

import { useQuery } from "@tanstack/react-query";

import { getFrontpageArticles } from "@/lib/article";

import { FourSection } from "../four-section/FourSection";
import { HighlightSection } from "../highligt-section/HighlightSection";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export const NewsSection = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["frontpageArticles"],
    queryFn: getFrontpageArticles,
  });

  console.log(articles);

  if (!articles?.featured || !articles?.news) {
    return null;
  }

  return (
    <>
      <HighlightSection
        featuredArticle={articles.featured}
        otherThreeArticles={articles.news.slice(0, 3)}
      />
      <FourSection articles={articles.news.slice(3, 7)} />
    </>
  );
};
