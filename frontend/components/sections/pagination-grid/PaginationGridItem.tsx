import Link from "next/link";
import Image from "next/image";
import { TArticle } from "@/types/types";
import { convertDate } from "@/lib/date-converter";

type Props = {
  article: TArticle;
};

export const PaginationGridItem: React.FC<Props> = ({ article }) => {
  const articleDate = convertDate(article.createdAt);

  const isVideo = article.youtubeVideoId ? true : false;

  return (
    <article className={`pagination-grid-item`}>
      <Link prefetch={false} href={`/article/${article.id}`}>
        {!isVideo && (
          <div className="image-area">
            <Image
              alt={article.title}
              src={article.image?.url ?? "/images/placeholder.jpg"}
              fill
              sizes="1000px"
            />
            <div className="date-overlay">
              <span>{articleDate}</span>
            </div>
          </div>
        )}

        {isVideo && (
          <div className="video-area">
            <iframe
              title={article.title}
              src={`https://youtube.com/embed/${article.youtubeVideoId}` ?? ""}
            />
          </div>
        )}

        <div className="text-area">
          <h3>{article.title}</h3>
          {isVideo && <p className="video-subtitle">{article.subtitle}</p>}
        </div>
      </Link>
    </article>
  );
};
