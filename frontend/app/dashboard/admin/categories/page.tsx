import "./CategoriesPage.scss";

export default async function CategoriesPage() {
  return (
    <>
      <div>List all article categories</div>
    </>
  );

  // return (
  //   <div className="admin-categories-page">
  //     <div>
  //       <h1>Categories</h1>
  //       <Button className="button btn-primary">
  //         <Link prefetch={false} href="categories/new-category">
  //           Create category
  //         </Link>
  //       </Button>
  //     </div>

  //     <div>
  //       {!categories.categories ||
  //         (categories.categories.length < 1 && (
  //           <p>{"No categories were found."}</p>
  //         ))}

  //       {categories.categories && categories.categories.length > 0 ? (
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>Id</th>
  //               <th>Name</th>
  //               <th>Articles</th>
  //               <th>Actions</th>
  //             </tr>
  //           </thead>

  //           <tbody>
  //             {categories.categories.map((category: any) => (
  //               <tr key={category.id}>
  //                 <td>{category.id.toString()}</td>
  //                 <td>{category.name}</td>
  //                 <td>{category.articles.length}</td>
  //                 <td className="td-actions">
  //                   <Button className="button btn-outlined">
  //                     <span>Edit</span>
  //                   </Button>
  //                   <Button className="button btn-delete">
  //                     <span>Delete</span>
  //                   </Button>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       ) : null}
  //     </div>
  //   </div>
  // );
}
