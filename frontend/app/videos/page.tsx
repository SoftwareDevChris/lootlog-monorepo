import { PageTitle } from "@/components/pageTitle/PageTitle";
import { PaginationGrid } from "@/components/sections/pagination-grid/PaginationGrid";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";
import { getAllVideoArticles } from "@/lib/article/actions";

export default async function VideoPage() {
  const articles = await getAllVideoArticles();

  if (!articles) return <LoadingScreen />;

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-4 p-4">
      <PageTitle
        title="Videos"
        subtitle="Kick back and relax with the latest videos from the gaming and tech world."
      />

      <PaginationGrid articles={articles} />
    </main>
  );
}
