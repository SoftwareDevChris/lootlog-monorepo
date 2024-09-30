import "./MyArticlesPage.scss";

export default async function MyArticlesPage() {
  return (
    <>
      <div>My articles</div>
    </>
  );

  // return (
  //   <div className="my-articles-page">
  //     <h1>My articles</h1>

  //     <div>
  //       {!userArticles.articles ||
  //         (userArticles.articles.length < 1 && (
  //           <p>{"You haven't written any articles yet."}</p>
  //         ))}

  //       {userArticles.articles && userArticles.articles.length > 0 ? (
  //         <ArticleTable articles={userArticles.articles} />
  //       ) : null}
  //     </div>
  //   </div>
  // );
}
