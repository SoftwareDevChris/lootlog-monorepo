"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getFrontpageVideoArticle } from "@/lib/article";

import parse from "html-react-parser";

import { SectionTitle } from "../SectionTitle";

export const VideoSection = async () => {
  const { data: article, isLoading } = useQuery({
    queryKey: ["frontpage", "videos"],
    queryFn: getFrontpageVideoArticle,
  });

  if (!article) return null;

  return (
    <>
      <SectionTitle title="Videos" route="/videos" />
      <div className="flex max-h-[500px] flex-col gap-4 md:flex-row">
        <div className="order-1 w-full overflow-hidden rounded-md bg-neutral-800 p-4 md:order-2 md:aspect-video md:w-1/2">
          <Link href={`article/${article.id}`}>
            <h3 className="text-xl font-black hover:underline md:mb-4">
              {article.title}
            </h3>
          </Link>
          <div className="mt-4 hidden h-full pb-4 md:block">
            {parse(article.body)}
          </div>
        </div>
        <div className="relative order-2 aspect-video w-full overflow-hidden rounded-md md:order-1 md:w-1/2">
          <Link
            className="absolute inset-0 z-10 h-full w-full"
            href={`article/${article.id}`}
          ></Link>
          <iframe
            title={article.title}
            className="h-full w-full"
            src={`https://youtube.com/embed/${article.YTVideoId}`}
          />
        </div>
      </div>
    </>
  );
};
