"use client";

import { Suspense } from "react";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import "./index.css";

// Queries
import { getArticleById } from "@/lib/article";

// HTML Parser
import parse from "html-react-parser";

import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const { data: article } = useQuery({
    queryKey: [`articles/${params.id}`],
    queryFn: async () => await getArticleById(params.id),
  });

  return (
    <Suspense fallback={<LoadingScreen />}>
      <main>
        <article className="article-details">
          {/* Title */}
          <h1>{article?.title}</h1>

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
          {article?.YTVideoId && !article?.image?.url && (
            <div className="media-container">
              <iframe
                title={article?.title}
                src={`https://youtube.com/embed/${article?.YTVideoId}`}
              />
            </div>
          )}

          {/* Image */}
          {article?.image?.url && !article?.YTVideoId && (
            <div className="media-container">
              <Image
                alt=""
                src={article?.image?.url ?? ""}
                fill
                sizes="1000px"
              />
            </div>
          )}

          {/* Content */}
          <div className="article-body-container">
            {parse(article ? article.body : "")}
          </div>
        </article>
      </main>
    </Suspense>
  );
}
