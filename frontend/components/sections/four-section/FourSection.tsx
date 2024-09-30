import { FourSectionItem } from "./FourSectionItem";

import "./FourSection.scss";

import { TArticle } from "@/types/types";

type Props = {
  articles: TArticle[];
};

export const FourSection: React.FC<Props> = ({ articles }) => {
  return (
    <div className="articles-four-section">
      {articles.map((article) => (
        <FourSectionItem key={article.id} article={article} />
      ))}
    </div>
  );
};
