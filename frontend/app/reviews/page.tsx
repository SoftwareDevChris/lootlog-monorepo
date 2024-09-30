import { Suspense } from "react";

import { PageTitle } from "@/components/page-title/PageTitle";
import { PaginationGrid } from "@/components/sections/pagination-grid/PaginationGrid";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default async function ReviewsPage() {
  return <div>Reviews</div>;

  // return (
  //   <main>
  //     <PageTitle
  //       title="Reviews"
  //       subtitle="Read our honest, detailed, and informative reviews of the best games in the market. This section is your guide to gaming."
  //     />

  //     <Suspense fallback={<LoadingScreen />}>
  //       <PaginationGrid articles={articles.articles} />
  //     </Suspense>
  //   </main>
  // );
}
