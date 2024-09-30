import { Suspense } from "react";

import { PageTitle } from "@/components/page-title/PageTitle";
import { PaginationGrid } from "@/components/sections/pagination-grid/PaginationGrid";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default async function VideosPage() {
  return <div>Videos</div>;

  // return (
  //   <main>
  //     <PageTitle
  //       title="Videos"
  //       subtitle="Do you enjoy getting your news in a video format? Look nu further. In this section we deliver everything from news, reviews and guides."
  //     />

  //     <Suspense fallback={<LoadingScreen />}>
  //       <PaginationGrid articles={articles.articles} />
  //     </Suspense>
  //   </main>
  // );
}
