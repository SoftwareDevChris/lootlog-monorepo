"use client";

import Link from "next/link";

import "./CategoriesPage.scss";

import { getCategories } from "@/lib/category";

import { Button } from "@/components/ui/button/Button";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";
import { useQuery } from "@tanstack/react-query";

export default function CategoriesPage() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });

  console.log("All categories:", categories);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Categories</h1>
        <Link href={`categories/create`}>
          <Button className="btn-primary">Create new category</Button>
        </Link>
      </div>
      {categories && categories?.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {categories?.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ width: "fit-content" }}>
                      <Link href={`categories/${category.id}`}>
                        <Button className="btn-basic">Edit</Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
