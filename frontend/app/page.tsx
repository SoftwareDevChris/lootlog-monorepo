// const DynamicVideoSection = dynamic(() =>
//   import("../components/sections/video-section/VideoSection").then(
//     (mod) => mod.VideoSection
//   )
// );
// const DynamicReviewSection = dynamic(() =>
//   import("../components/sections/review-section/ReviewSection").then(
//     (mod) => mod.ReviewSection
//   )
// );
// const DynamicGuideSection = dynamic(() =>
//   import("../components/sections/guide-section/GuideSection").then(
//     (mod) => mod.GuideSection
//   )
// );

export default async function Home() {
  // const getNewsArticles = await getArticlesByCategory("news article", 8);
  // const getVideoArticles = await getArticlesByCategory("video", 1);
  // const getReviewArticles = await getArticlesByCategory("review", 4);
  // const getGuideArticles = await getArticlesByCategory("guide", 4);

  // const [news, videos, reviews, guides] = await Promise.all([
  //   getNewsArticles,
  //   getVideoArticles,
  //   getReviewArticles,
  //   getGuideArticles,
  // ]);

  return (
    <div>
      {/* <NewsSection articles={news.articles} />
      <DynamicVideoSection articles={videos.articles} />
      <DynamicReviewSection articles={reviews.articles} />
      <DynamicGuideSection articles={guides.articles} /> */}
    </div>
  );
}
