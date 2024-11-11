"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getFrontpageFeaturedArticle,
  getFrontpageNewsArticles,
} from "@/lib/article";

import { FourSection } from "../four-section/FourSection";
import { HighlightSection } from "../highligt-section/HighlightSection";

export const NewsSection = () => {
  const { data: featured } = useQuery({
    queryKey: ["frontpage", "featured"],
    queryFn: getFrontpageFeaturedArticle,
  });

  const { data: news } = useQuery({
    queryKey: ["frontpage", "news"],
    queryFn: getFrontpageNewsArticles,
  });

  if (!featured || !news) {
    return null;
  }

  return (
    <>
      <HighlightSection
        featuredArticle={featured}
        otherThreeArticles={news.slice(0, 3)}
      />
      <FourSection articles={news.slice(3, 7)} />
    </>
  );
};
