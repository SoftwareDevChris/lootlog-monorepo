"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllTechArticles } from "@/lib/article";

import { PageTitle } from "@/components/pageTitle/PageTitle";
import { PaginationGrid } from "@/components/sections/pagination-grid/PaginationGrid";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default function TechPage() {
  const { data: articles } = useQuery({
    queryKey: ["all", "tech"],
    queryFn: getAllTechArticles,
  });

  if (!articles) return <LoadingScreen />;

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-4 p-4">
      <PageTitle
        title="Tech"
        subtitle="The world of technology moves fast. Stay up-to-date right here!"
      />

      <PaginationGrid articles={articles} />
    </main>
  );
}
