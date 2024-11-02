"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/lib/category";

import {
  Container,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default function CategoriesPage() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (!categories) return <LoadingScreen />;

  return (
    <Container>
      <div className="mb-4 flex flex-col items-center md:flex-row md:justify-between md:gap-4">
        <Typography component="h1" className="text-2xl font-bold">
          My articles
        </Typography>
        <Link href={`categories/create`}>
          <Button variant="contained" className="bg-orange-500">
            Create
          </Button>
        </Link>
      </div>
      {categories && categories?.length > 0 && (
        <TableContainer component={Paper}>
          <Table className="border-2 border-neutral-700">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories &&
                categories.map((category) => (
                  <TableRow key={category?.id}>
                    <TableCell>{category?.id}</TableCell>
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {category?.name}
                    </TableCell>
                    <TableCell>
                      <Link href={`categories/${category?.id}`}>
                        <Button variant="outlined">Manage</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

{
  /* <table>
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
</table> */
}
