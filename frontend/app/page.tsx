import { NewsSection } from "@/components/sections/news-section/NewsSection";
import { ReviewSection } from "@/components/sections/review-section/ReviewSection";
import { TechSection } from "@/components/sections/tech-section/TechSection";
import { VideoSection } from "@/components/sections/video-section/VideoSection";

export default async function Home() {
  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-4 p-4">
      <NewsSection />
      <ReviewSection />
      <VideoSection />
      <TechSection />
    </main>
  );
}
