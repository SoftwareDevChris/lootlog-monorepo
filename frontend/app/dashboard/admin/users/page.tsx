import Link from "next/link";

import { getAllUsers } from "@/lib/user/actions";

import { Button } from "@/components/ui/button/Button";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <>
      <h1>All users</h1>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <Link href={`users/${user.id}`}>
                  <Button className="btn-basic">Administrate</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
