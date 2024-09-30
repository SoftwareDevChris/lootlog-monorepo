import Link from "next/link";
import Image from "next/image";

// Types
import { TArticle } from "@/types/types";

type Props = {
  article: TArticle;
};

export const FourSectionItem: React.FC<Props> = ({ article }) => {
  return (
    <article className="four-section-item">
      <Link prefetch={false} href={`/article/${article.id}`}>
        <div className="image-area">
          <Image
            fill={true}
            loading="lazy"
            src={article.image?.url ?? "/public/images/placeholder.webp"}
            alt={article.title}
          />
        </div>
        <div className="text-area">
          <p>{article.title}</p>
          <span>{article.category?.name}</span>
        </div>
      </Link>
    </article>
  );
};
