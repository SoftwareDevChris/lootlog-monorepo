import { NewsSection } from "@/components/sections/news-section/NewsSection";
import { ReviewSection } from "@/components/sections/review-section/ReviewSection";

export default async function Home() {
  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-4 p-4">
      <NewsSection />
      <ReviewSection />
    </main>
  );
}
