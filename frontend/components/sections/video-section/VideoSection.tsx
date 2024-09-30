import { Suspense } from "react";

import "./VideoSection.scss";
import { TArticle } from "@/types/types";

import parse from "html-react-parser";

import { LoadingSpinner } from "@/components/ui/loading/spinner/LoadingSpinner";
import { SectionTitle } from "../SectionTitle";
import Link from "next/link";

type Props = {
  articles: TArticle[] | null;
};

export const VideoSection = async ({ articles }: Props) => {
  // const videoArticles = await getArticlesByCategory("video", 1);

  if (!articles) return null;

  return (
    <Suspense fallback={<LoadingSpinner theme="orange" />}>
      <SectionTitle title="Videos" route="/videos" />
      <div className="video-section">
        <div className="text-area">
          <div className="text-area-overlay"></div>
          <Link prefetch={false} href={`article/${articles![0].id}`}>
            <h3 className="title">{articles![0].title}</h3>
          </Link>
          <p className="subtitle">{articles![0].subtitle}</p>
          <div className="body">{parse(articles![0].body)}</div>
        </div>
        <div className="video-area">
          <iframe
            title={articles![0].title}
            src={
              `https://youtube.com/embed/${articles![0].youtubeVideoId}` ?? ""
            }
          />
        </div>
      </div>
    </Suspense>
  );
};
