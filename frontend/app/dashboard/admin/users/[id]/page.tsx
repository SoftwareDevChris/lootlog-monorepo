"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { adminGetUserById } from "@/lib/user";

import { UpdateUserForm } from "@/components/forms/UpdateUserForm";
import { useState } from "react";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default function EditUserPage() {
  const params: { id: string } = useParams();

  const { data: user } = useQuery({
    queryKey: ["user", params.id],
    queryFn: async () => await adminGetUserById(parseInt(params.id)),
  });

  if (!user?.id) return <LoadingScreen />;

  return <UpdateUserForm user={user} />;
}
