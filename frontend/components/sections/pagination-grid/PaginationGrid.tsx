import { TArticle } from "@/types/article.types";

import { PaginationGridItem } from "./PaginationGridItem";

type Props = {
  articles: TArticle[];
};

// TODO: Implement pagination
export const PaginationGrid: React.FC<Props> = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {articles.map((article, index) => {
        return <PaginationGridItem article={article} key={article.id} />;
      })}
    </div>
  );
};
