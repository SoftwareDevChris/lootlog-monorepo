import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import "./HighlightSection.scss";

import { TArticle } from "@/types/types";

import { HighlightedListItem } from "./HighlightedListItem";

type Props = {
  articles: TArticle[];
};

export const HighlightSection: FC<Props> = ({ articles }) => {
  const listArticles = articles.slice(1, 4);

  return (
    <div className="highlight-section">
      <Link
        prefetch={false}
        href={`/article/${articles[0].id}`}
        className="highlighted-article"
      >
        <Image
          fill
          priority={true}
          loading="eager"
          fetchPriority="high"
          src={articles[0].image?.url ?? "/public/images/placeholder.webp"}
          alt={articles[0].title}
        />

        <div className="image-overlay">
          <div className="title-area">
            <h2>{articles[0].title}</h2>
          </div>
        </div>
      </Link>

      <div className="highlighted-list">
        <div className="list-title-container">
          <div></div>
          <h2>Latest news</h2>
          <div></div>
        </div>
        {listArticles.map((article, i) => (
          <HighlightedListItem
            key={article.id}
            article={article}
            withBorder={i + 1 === listArticles.length ? false : true}
          />
        ))}
      </div>
    </div>
  );
};
