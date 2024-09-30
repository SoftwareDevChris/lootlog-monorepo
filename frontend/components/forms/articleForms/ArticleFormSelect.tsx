"use client";
import { FC, useState } from "react";

import { TCategory } from "@/types/types";

import { Select } from "@/components/ui/select/Select";
import { CreateVideoArticleForm } from "./createVideoArticleForm/CreateVideoArticleForm";
import { CreateArticleForm } from "./createArticleForm/CreateArticleForm";

type Props = {
  categories: TCategory[];
};

export const ArticleFormSelect: FC<Props> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null
  );

  return (
    <>
      <Select
        categories={categories}
        onSelect={(ctg) => setSelectedCategory(ctg)}
      />

      {selectedCategory?.name === "video" && (
        <CreateVideoArticleForm category={selectedCategory} />
      )}

      {selectedCategory?.name && selectedCategory.name !== "video" && (
        <CreateArticleForm category={selectedCategory} />
      )}
    </>
  );
};
