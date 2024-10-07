import Link from "next/link";

import "./CategoriesPage.scss";

import { getCategories } from "@/lib/category/actions";

import { Button } from "@/components/ui/button/Button";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default async function CategoriesPage() {
  const categories = await getCategories();

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
                  <td>
                    <Link href={`categories/${category.id}`}>
                      <Button className="btn-basic">Edit</Button>
                    </Link>
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
