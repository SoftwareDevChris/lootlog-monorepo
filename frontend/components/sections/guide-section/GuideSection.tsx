import { TArticle } from "@/types/types";

import { FourSection } from "../four-section/FourSection";
import { SectionTitle } from "../SectionTitle";

type Props = {
  articles: TArticle[] | null;
};

export const GuideSection = async ({ articles }: Props) => {
  // const articles = await getArticlesByCategory("guide", 4);

  if (!articles) return null;

  return (
    <>
      <SectionTitle title="Guides" route="/guides" />
      <FourSection articles={articles} />
    </>
  );
};
