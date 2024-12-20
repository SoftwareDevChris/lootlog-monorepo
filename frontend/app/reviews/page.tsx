"use client";

import { getAllReviewArticles } from "@/lib/article";

import { useQuery } from "@tanstack/react-query";

import { PageTitle } from "@/components/pageTitle/PageTitle";
import { PaginationGrid } from "@/components/sections/pagination-grid/PaginationGrid";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default function ReviewPage() {
  const { data: articles } = useQuery({
    queryKey: ["all", "reviews"],
    queryFn: getAllReviewArticles,
  });

  if (!articles) return <LoadingScreen />;

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-4 p-4">
      <PageTitle
        title="Reviews"
        subtitle="If you're looking for a second opinion before buying a new game, you've come to the right place."
      />

      <PaginationGrid articles={articles} />
    </main>
  );
}
