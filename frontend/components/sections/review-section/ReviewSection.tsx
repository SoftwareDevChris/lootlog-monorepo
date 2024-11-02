"use client";

import { useQuery } from "@tanstack/react-query";

import { SectionTitle } from "../SectionTitle";
import { FourSection } from "../four-section/FourSection";
import { getFrontpageArticles } from "@/lib/article";

export const ReviewSection = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["frontpageArticles"],
    queryFn: getFrontpageArticles,
  });

  if (!articles?.reviews) return null;

  return (
    <>
      <SectionTitle title="Reviews" route="/reviews" />
      <FourSection articles={articles?.reviews} />
    </>
  );
};
