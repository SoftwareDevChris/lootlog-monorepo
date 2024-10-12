"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getAllArticles } from "@/lib/article";
import { Button } from "@/components/ui/button/Button";

export default function ArticlesPage() {
  const { data: articles } = useQuery({
    queryKey: ["articlese"],
    queryFn: async () => await getAllArticles(),
  });

  return (
    <>
      <h1>All articles</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>CategoryId</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {articles?.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>{article.subtitle}</td>
              <td>{article.categoryId}</td>
              <td>
                <Link href={`articles/${article.id}`}>
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
