import Link from "next/link";
import Image from "next/image";

// Types
import { TArticle } from "@/types/article.types";

type Props = {
  article: TArticle;
};

export const FourSectionItem: React.FC<Props> = ({ article }) => {
  return (
    <article className="overflow-hidden rounded-lg bg-neutral-800 shadow-md hover:bg-neutral-500">
      <Link href={`/article/${article.id}`}>
        <div className="relative aspect-video">
          {article.YTVideoId && (
            <iframe
              title={article.YTVideoId}
              className="h-full w-full"
              src={`https://youtube.com/embed/${article.YTVideoId}`}
            />
          )}

          {!article.YTVideoId && (
            <Image
              fill
              sizes="600px"
              className="object-cover object-center"
              loading="lazy"
              src={article.image?.url ?? "/public/images/placeholder.webp"}
              alt={article.title}
            />
          )}
        </div>
        <div className="border-t border-orange-600 p-4">
          <p className="mb-4 font-semibold">{article.title}</p>
          <span className="text-sm capitalize text-neutral-300">
            {article.category?.name}
          </span>
        </div>
      </Link>
    </article>
  );
};
