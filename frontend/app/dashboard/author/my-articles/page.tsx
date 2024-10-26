"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getArticlesByUser } from "@/lib/article";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Container,
} from "@mui/material";

export default function MyArticlesPage() {
  const { data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticlesByUser,
  });

  return (
    <Container>
      <Typography component="h1" className="mb-4 text-2xl font-bold">
        My articles
      </Typography>
      <TableContainer component={Paper}>
        <Table className="border-2 border-neutral-700">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles &&
              articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.id}</TableCell>
                  <TableCell>{article.title}</TableCell>
                  <TableCell style={{ textTransform: "capitalize" }}>
                    {article.category?.name}
                  </TableCell>
                  <TableCell>
                    <Link href={`my-articles/${article.id}`}>
                      <Button variant="outlined">Manage</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
