import { ArticleForm } from "@/components/forms/ArticleForm";

export default async function CreateArticlePage() {
  return (
    <>
      <h1 style={{ marginBottom: "2rem" }}>New article</h1>
      <ArticleForm />
    </>
  );
}
