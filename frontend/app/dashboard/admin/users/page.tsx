"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "@/lib/user/actions";

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

export default function UsersPage() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getAllUsers(),
  });

  return (
    <Container>
      <Typography component="h1" className="mb-4 text-2xl font-bold">
        All users
      </Typography>

      <TableContainer component={Paper}>
        <Table className="border-2 border-neutral-700">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell style={{ textTransform: "capitalize" }}>
                    {user.firstName}
                  </TableCell>
                  <TableCell style={{ textTransform: "capitalize" }}>
                    {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Link href={`users/${user.id}`}>
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
