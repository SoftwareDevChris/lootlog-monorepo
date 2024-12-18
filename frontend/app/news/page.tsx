"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllNewsArticles } from "@/lib/article";

import { PageTitle } from "@/components/pageTitle/PageTitle";
import { PaginationGrid } from "@/components/sections/pagination-grid/PaginationGrid";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default function NewsPage() {
  const { data: articles } = useQuery({
    queryKey: ["all", "news"],
    queryFn: getAllNewsArticles,
  });

  if (!articles) return <LoadingScreen />;

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-4 p-4">
      <PageTitle
        title="News"
        subtitle="Stay updated with the latest happenings in the world of gaming."
      />

      <PaginationGrid articles={articles} />
    </main>
  );
}
