import Link from "next/link";
import Image from "next/image";
import { TArticle } from "@/types/article.types";
import { convertDate } from "@/lib/date-converter";

type Props = {
  article: TArticle;
};

export const PaginationGridItem: React.FC<Props> = ({ article }) => {
  const articleDate = convertDate(article.createdAt);

  const isVideo = article.YTVideoId ? true : false;

  return (
    <article
      className={`relative overflow-hidden rounded-md bg-neutral-800 hover:bg-neutral-700`}
    >
      <Link href={`/article/${article.id}`}>
        {!isVideo && (
          <div className="relative aspect-video">
            <Image
              className="object-cover object-center"
              alt={article.title}
              src={article.image?.url ?? "/images/placeholder.jpg"}
              fill
              sizes="600px"
            />
            <div className="absolute inset-4">
              <span className="rounded-md bg-black/70 px-2 py-1 text-xs text-neutral-200">
                {articleDate}
              </span>
            </div>
          </div>
        )}

        {isVideo && (
          <div className="relative aspect-video">
            <Link
              href={`/article/${article.id}`}
              className="absolute inset-0 z-10"
            ></Link>
            <iframe
              className="aspect-video h-full w-full"
              title={article.title}
              src={`https://youtube.com/embed/${article.YTVideoId}`}
            />
          </div>
        )}

        <div className="border-t-orangeCustom700 border-t p-4">
          <h3 className="font-semibold">{article.title}</h3>
        </div>
      </Link>
    </article>
  );
};
