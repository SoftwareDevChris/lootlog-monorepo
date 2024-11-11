"use client";

import { useQuery } from "@tanstack/react-query";

import { SectionTitle } from "../SectionTitle";
import { FourSection } from "../four-section/FourSection";
import { getFrontpageReviewArticles } from "@/lib/article";

export const ReviewSection = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["frontpage", "reviews"],
    queryFn: getFrontpageReviewArticles,
  });

  if (!articles) return null;

  return (
    <>
      <SectionTitle title="Reviews" route="/reviews" />
      <FourSection articles={articles} />
    </>
  );
};
