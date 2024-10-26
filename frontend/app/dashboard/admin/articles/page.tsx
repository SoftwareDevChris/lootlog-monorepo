"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getAllArticles } from "@/lib/article";

import {
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Typography,
} from "@mui/material";

export default function AdminArticlesPage() {
  const { data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: getAllArticles,
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
                    <Link href={`articles/${article.id}`}>
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
