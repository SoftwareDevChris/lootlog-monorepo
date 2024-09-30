import { TArticle } from "@/types/types";

import { FourSection } from "../four-section/FourSection";
import { HighlightSection } from "../highligt-section/HighlightSection";

type Props = {
  articles: TArticle[] | null;
};

export const NewsSection = async ({ articles }: Props) => {
  // const newsArticles = await getArticlesByCategory("news article", 8);

  if (!articles) return null;

  return (
    <>
      <HighlightSection articles={articles.slice(0, 4)} />
      <FourSection articles={articles.slice(4, 8)} />
    </>
  );
};
