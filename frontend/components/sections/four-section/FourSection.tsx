import { FourSectionItem } from "./FourSectionItem";

import "./FourSection.css";

import { TArticle } from "@/types/article.types";

type Props = {
  articles: TArticle[];
};

export const FourSection = ({ articles }: Props) => {
  console.log("FourSection", articles);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {articles.map((article) => (
        <FourSectionItem key={article.id} article={article} />
      ))}
    </div>
  );
};
