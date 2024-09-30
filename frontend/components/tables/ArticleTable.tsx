"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";

import { TArticle } from "@/types/types";

import toast from "react-hot-toast";

import { Button } from "../ui/button/Button";
import { deleteArticle } from "@/lib/articleService";

type Props = {
  articles: TArticle[];
};

export const ArticleTable: FC<Props> = ({ articles }) => {
  const router = useRouter();

  const handleDeleteArticle = async (article: TArticle) => {
    try {
      const del = await deleteArticle(article);

      if (del.status === 200) {
        toast.success("Article deleted successfully");
        articles.filter((a) => a.id !== article.id);
      } else if (del.status !== 200 && del.message) {
        toast.error(`Error: ${del.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error}`);
      return;
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Published</th>
          <th>Featured</th>
          <th>Category</th>
          <th>Created at</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {articles.map((article) => (
          <tr key={article.id}>
            <td>{article.id}</td>
            <td>{article.title}</td>
            <td>{article.isPublic ? "Yes" : "No"}</td>
            <td>{article.isFeatured ? "Yes" : "No"}</td>
            <td>{article.category?.name}</td>
            <td>{article.createdAt.toDateString()}</td>
            <td className="td-actions">
              <Button
                className="button btn-outlined"
                onClick={() =>
                  router.push(`/dashboard/author/edit-article/${article.id}`)
                }
              >
                <span>Edit</span>
              </Button>
              <Button
                className="button btn-delete"
                onClick={() => handleDeleteArticle(article)}
              >
                <span>Delete</span>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
