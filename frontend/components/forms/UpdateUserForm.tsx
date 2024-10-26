"use client";
import { useState } from "react";

import toast from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { TUser } from "@/types/user.types";
import { deleteUser, updateUser } from "@/lib/user";

import { Label } from "../ui/label/Label";
import { SubmitFormButton } from "../buttons/SubmitFormButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { useModalStore } from "@/store/modal-store";
import { useQueryClient } from "@tanstack/react-query";
import { Switch, TextField } from "@mui/material";

type Props = {
  user: TUser;
};

export const UpdateUserForm = ({ user }: Props) => {
  const [statusMessage, setStatusMessage] = useState<string[]>([]);

  const modal = useModalStore();
  const queryClient = useQueryClient();

  const handleDeleteUser = async () => {
    const res = await deleteUser(user.id);
    const status = await res?.json();

    if (res?.ok) {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      window.location.href = "/dashboard/admin/users";
      return;
    } else {
      status && setStatusMessage([status.message]);
      return;
    }
  };

  const handleDisplayModal = () => {
    modal.show(
      "Delete user",
      `Are you sure you want to delete this user?`,
      "Cancel",
      "Delete",
      async () => await handleDeleteUser(),
      "delete"
    );
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUser>({
    defaultValues: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isVerified: user.isVerified,
      isAdmin: user.isAdmin,
      isAuthor: user.isAuthor,
    },
  });

  const onSubmit: SubmitHandler<Partial<TUser>> = async (data) => {
    const res = await updateUser(data);
    const status = await res?.json();

    if (res?.ok) {
      toast.success("User updated successfully");
      window.location.href = "/dashboard/admin/users";
      return;
    }

    status && setStatusMessage([status.message]);
  };

  return (
    <div
      className="form-wrapper"
      style={{ maxWidth: "30rem", margin: "0 auto" }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Update user</h1>
      {statusMessage.length > 0 &&
        statusMessage.map((msg, index) => (
          <p key={index} className="form-error-message">
            {msg}
          </p>
        ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                label="First name"
                required
              />
            )}
          />
          {errors.firstName?.message && (
            <p className="input-error">{errors.firstName.message}</p>
          )}
        </div>

        <div className="input-group">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                label="Last name"
                required
              />
            )}
          />
          {errors.lastName?.message && (
            <p className="input-error">{errors.lastName.message}</p>
          )}
        </div>

        <div className="input-group">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                variant="outlined"
                label="First name"
                required
              />
            )}
          />
          {errors.email?.message && (
            <p className="input-error">{errors.email.message}</p>
          )}
        </div>

        <div className="input-group">
          <Label htmlFor="isVerified">Is verified</Label>
          <Controller
            name="isVerified"
            control={control}
            render={({ field }) => (
              // Checkbox
              <Switch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          {errors.isVerified?.message && (
            <p className="input-error">{errors.isVerified.message}</p>
          )}
        </div>

        <div className="input-group">
          <Label htmlFor="isAuthor">Is author</Label>
          <Controller
            name="isAuthor"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          {errors.isAuthor?.message && (
            <p className="input-error">{errors.isAuthor.message}</p>
          )}
        </div>

        <div className="input-group">
          <Label htmlFor="isAdmin">Is admin</Label>
          <Controller
            name="isAdmin"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          {errors.isAdmin?.message && (
            <p className="input-error">{errors.isAdmin.message}</p>
          )}
        </div>

        <SubmitFormButton title="Update" disabled={isSubmitting} />
      </form>
      <div style={{ marginTop: "1rem" }}>
        <DeleteButton onClick={handleDisplayModal} />
      </div>
    </div>
  );
};
