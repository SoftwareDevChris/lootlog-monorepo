import { Suspense } from "react";
import Image from "next/image";

// Queries
import { getArticleById } from "@/lib/articleService";

// HTML Parser
import parse from "html-react-parser";

import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { status, message, article } = await getArticleById(
    parseInt(params.id)
  );

  if (status !== 200 || !article) {
    return (
      <div className="mx-auto flex min-h-[500px] flex-col items-center justify-center text-neutral-100">
        <h1>Error</h1>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <main>
        <article className="article-details">
          {/* Title */}
          <h1>{article!.title}</h1>

          {/* Author */}
          <div className="article-info">
            <p>
              <span>By</span>{" "}
              {article?.author?.firstName + " " + article?.author?.lastName}
            </p>
            <p>
              <span>Published</span> {article?.createdAt.toDateString()}
            </p>
          </div>

          {/* Video */}
          {article.youtubeVideoId && !article.image?.url && (
            <div className="media-container">
              <iframe
                title={article.title}
                src={
                  `https://youtube.com/embed/${article.youtubeVideoId}` ?? ""
                }
              />
            </div>
          )}

          {/* Image */}
          {article.image?.url && !article.youtubeVideoId && (
            <div className="media-container">
              <Image
                alt=""
                src={article.image?.url ?? ""}
                fill
                sizes="1000px"
              />
            </div>
          )}

          {/* Content */}
          <div className="article-body-container">{parse(article!.body)}</div>
        </article>
      </main>
    </Suspense>
  );
}
