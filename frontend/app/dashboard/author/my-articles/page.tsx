"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getArticlesByUser } from "@/lib/article";

import { Button } from "@/components/ui/button/Button";

export default function MyArticlesPage() {
  const { data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => await getArticlesByUser(),
  });

  return (
    <>
      <h1 style={{ marginBottom: "2rem" }}>My articles</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {articles?.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td style={{ textTransform: "capitalize" }}>
                {article.category?.name}
              </td>
              <td>
                <Link href={`edit-article/${article.id}`}>
                  <Button className="btn-basic">Manage</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
