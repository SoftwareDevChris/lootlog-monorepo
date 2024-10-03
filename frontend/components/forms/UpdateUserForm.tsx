"use client";
import { useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { TUser } from "@/types/user.types";
import { updateUserAsAdmin } from "@/lib/user";

import { Label } from "../ui/label/Label";
import { SubmitFormButton } from "../buttons/SubmitFormButton";

type Props = {
  user: TUser;
};

export const UpdateUserForm = ({ user }: Props) => {
  const [statusMessage, setStatusMessage] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Partial<TUser>>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isVerified: user.isVerified,
      isAdmin: user.isAdmin,
      isAuthor: user.isAuthor,
    },
  });

  const onSubmit: SubmitHandler<Partial<TUser>> = async (data) => {
    const res = await updateUserAsAdmin(data);

    if (res?.ok) {
      setStatusMessage(["User updated successfully"]);
    }
  };

  return (
    <div
      className="form-wrapper"
      style={{ maxWidth: "30rem", margin: "0 auto" }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Update user</h1>
      {statusMessage.length > 0 &&
        statusMessage.map((msg, index) => (
          <p key={index} className="form-status-message">
            {msg}
          </p>
        ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <Label htmlFor="firstName">Firstname</Label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => <input {...field} type="text" required />}
          />
          {errors.firstName?.message && (
            <p className="input-error">{errors.firstName.message}</p>
          )}
        </div>

        <div className="input-group">
          <Label htmlFor="lastName">Lastname</Label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <input {...field} type="text" required />}
          />
          {errors.lastName?.message && (
            <p className="input-error">{errors.lastName.message}</p>
          )}
        </div>

        <div className="input-group">
          <Label htmlFor="email">Email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input {...field} type="text" required />}
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
              <input
                {...field}
                value={"verified"}
                type="checkbox"
                checked={field.value}
              />
            )}
          />
          {errors.isVerified?.message && (
            <p className="input-error">{errors.isVerified.message}</p>
          )}
        </div>

        <div className="input-group">
          <Label htmlFor="isAuthor">Is author?</Label>
          <Controller
            name="isAuthor"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                value={"author"}
                type="checkbox"
                checked={field.value}
              />
            )}
          />
          {errors.isAuthor?.message && (
            <p className="input-error">{errors.isAuthor.message}</p>
          )}
        </div>

        <div className="input-group">
          <Label htmlFor="isAdmin">Is admin?</Label>
          <Controller
            name="isAdmin"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                value={"admin"}
                type="checkbox"
                checked={field.value}
              />
            )}
          />
          {errors.isAdmin?.message && (
            <p className="input-error">{errors.isAdmin.message}</p>
          )}
        </div>

        <SubmitFormButton title="Submit" disabled={isSubmitting} />
      </form>
    </div>
  );
};
