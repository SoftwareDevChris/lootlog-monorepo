// Components
import { TArticle } from "@/types/types";

import "./PaginationGrid.scss";

import { PaginationGridItem } from "./PaginationGridItem";

type Props = {
  articles: TArticle[];
};

// TODO: Implement pagination
export const PaginationGrid: React.FC<Props> = ({ articles }) => {
  return (
    <div className="pagination-grid">
      {articles.map((article, index) => {
        return <PaginationGridItem article={article} key={article.id} />;
      })}
    </div>
  );
};
