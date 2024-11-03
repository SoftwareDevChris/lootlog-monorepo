import { TArticle } from "@/types/article.types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  article: TArticle;
};

export const HighlightedListItem = ({ article }: Props) => {
  return (
    <Link
      prefetch={false}
      href={`/article/${article.id}`}
      className={`row-span-2 flex gap-4 border-b border-neutral-600 p-4 last:border-0 hover:bg-neutral-700`}
    >
      <div className="flex w-[60%] flex-col justify-center">
        <h2 className="line-clamp-3 overflow-hidden text-ellipsis font-semibold md:text-2xl lg:line-clamp-2 lg:text-base lg2:line-clamp-3">
          {article.title}
        </h2>
        <p className="text-sm capitalize text-neutral-300 lg:hidden">
          {article.category?.name}
        </p>
      </div>
      <div className="relative aspect-video w-[40%] overflow-hidden rounded-sm">
        <Image
          fill
          sizes="370px"
          loading="lazy"
          className="object-cover object-center"
          src={article.image?.url ?? "/public/images/placeholder.webp"}
          alt={article.title}
        />
      </div>
    </Link>
  );
};
