import { CreateArticleForm } from "@/components/forms/articleForms/createArticleForm/CreateArticleForm";

export default async function CreateArticlePage() {
  return (
    <>
      <h1>New article</h1>
      <CreateArticleForm />
    </>
  );
}
