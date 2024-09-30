import { Suspense } from "react";

import { PageTitle } from "@/components/page-title/PageTitle";
import { PaginationGrid } from "@/components/sections/pagination-grid/PaginationGrid";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default async function GuidesPage() {
  return <div>Guides</div>;

  // return (
  //   <main>
  //     <PageTitle
  //       title="Guides"
  //       subtitle="We bring you guides for all types of games so you can be your best at all times."
  //     />

  //     <Suspense fallback={<LoadingScreen />}>
  //       <PaginationGrid articles={articles.articles} />
  //     </Suspense>
  //   </main>
  // );
}
