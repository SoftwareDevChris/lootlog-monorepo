"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

import { getAllArticles } from "@/lib/article";
import { Button } from "@/components/ui/button/Button";
import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function AdminArticlesPage() {
  const { data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => await getAllArticles(),
  });

  return (
    <>
      <h1 style={{ marginBottom: "2rem" }}>All articles</h1>
      <TableContainer component={Paper}>
        <Table>
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
                  <TableCell>{article.category?.name}</TableCell>
                  <TableCell>
                    <Link href={`articles/${article.id}`}>
                      <Button className="btn-basic">Manage</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

{
  /* <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>CategoryId</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {articles?.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>{article.categoryId}</td>
              <td>
                <Link href={`articles/${article.id}`}>
                  <Button className="btn-basic">Manage</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */
}
