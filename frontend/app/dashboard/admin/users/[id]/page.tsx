"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getUserById } from "@/lib/user";

import { UpdateUserForm } from "@/components/forms/UpdateUserForm";
import { useState } from "react";

export default function EditUserPage() {
  const params: { id: string } = useParams();

  const { data: user } = useQuery({
    queryKey: ["user", params.id],
    queryFn: async () => await getUserById(parseInt(params.id)),
  });

  if (!user?.id) return null;

  return <UpdateUserForm user={user} />;
}
