import Image from "next/image";
import Link from "next/link";

import { TArticle } from "@/types/article.types";

import { HighlightedListItem } from "./HighlightedListItem";

type Props = {
  featuredArticle: TArticle;
  otherThreeArticles: TArticle[];
};

export const HighlightSection = ({
  featuredArticle,
  otherThreeArticles,
}: Props) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-10 lg:grid-rows-1">
      <Link
        href={`/article/${featuredArticle.id}`}
        className="relative col-span-1 aspect-video rounded-md bg-none shadow-md lg:col-span-7"
      >
        <Image
          fill
          sizes="100vw, (min-width: 1200px) 1200px 800px"
          priority={true}
          loading="eager"
          fetchPriority="high"
          className="rounded-md object-cover object-center"
          src={featuredArticle.image?.url ?? "/public/images/placeholder.webp"}
          alt={featuredArticle.title}
        />

        <div className="absolute inset-0 h-full w-full rounded-md bg-gradient-to-t from-neutral-950/85 to-transparent">
          <div className="absolute bottom-0 left-0 w-full rounded-md p-4">
            <h2 className="text-lg font-black sm:text-3xl md:text-4xl">
              {featuredArticle.title}
            </h2>
          </div>
        </div>
      </Link>

      <div className="col-span-1 grid w-full grid-cols-1 grid-rows-7 overflow-hidden rounded-md bg-neutral-800 shadow-md lg:col-span-3">
        <div className="row-span-1 flex max-h-[100px] items-center">
          <div className="ml-4 mr-4 h-[1px] w-full bg-neutral-600"></div>
          <h2 className="text-nowrap text-center text-xl font-semibold uppercase lg:text-2xl">
            Latest news
          </h2>
          <div className="ml-4 mr-4 h-[1px] w-full bg-neutral-600"></div>
        </div>
        {otherThreeArticles.map((article, i) => (
          <HighlightedListItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};
