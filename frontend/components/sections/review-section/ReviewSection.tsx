import { TArticle } from "@/types/types";

import { FourSection } from "../four-section/FourSection";
import { SectionTitle } from "../SectionTitle";

type Props = {
  articles: TArticle[] | null;
};

export const ReviewSection = async ({ articles }: Props) => {
  // const articles = await getArticlesByCategory("review", 4);

  if (!articles) return null;

  return (
    <>
      <SectionTitle title="Reviews" route="/reviews" />
      <FourSection articles={articles} />
    </>
  );
};
