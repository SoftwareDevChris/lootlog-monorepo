"use client";

import { useQuery } from "@tanstack/react-query";

import { SectionTitle } from "../SectionTitle";
import { FourSection } from "../four-section/FourSection";
import { getFrontpageTechArticles } from "@/lib/article";

export const TechSection = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["frontpage", "tech"],
    queryFn: getFrontpageTechArticles,
  });

  if (!articles) return null;

  return (
    <>
      <SectionTitle title="Tech" route="/tech" />
      <FourSection articles={articles} />
    </>
  );
};
