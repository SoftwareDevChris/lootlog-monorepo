"use client";
import { useState } from "react";
import Link from "next/link";

import { signUp } from "@/lib/auth/";
import { TCreateUserForm } from "@/types/form.types";

import toast from "react-hot-toast";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { SubmitFormButton } from "@/components/buttons/SubmitFormButton";
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateUserForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatedPassword: "",
    },
  });

  const onSubmit: SubmitHandler<TCreateUserForm> = async (data) => {
    setIsLoading(true);
    setErrorMessage([]);

    const signUpResponse = await signUp(data);

    if (signUpResponse.ok) {
      toast.success("Your account has been created", {
        position: "bottom-right",
      });
      window.location.href = "/login";
    }

    const signUpError = await signUpResponse.json().then((err) => err.message);
    setErrorMessage(signUpError);
    setIsLoading(false);
    return;
  };

  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center bg-constellation bg-repeat p-4">
        <div className="min-w-[25rem] rounded-md bg-neutral-900 p-8">
          <h2 className="mb-8 text-3xl font-bold">Sign up</h2>

          {errorMessage && (
            <p className="mb-4 text-center text-red-600">{errorMessage}</p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <FormControl>
              <FormLabel htmlFor="firstName" className="mb-1 text-sm">
                First name
              </FormLabel>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    slotProps={{ input: { className: "rounded-lg" } }}
                    error={errors.firstName && true}
                    helperText={errors.firstName?.message}
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="John"
                    autoComplete="firstName"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.firstName ? "error" : "primary"}
                    sx={{ ariaLabel: "text" }}
                  />
                )}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="lastName" className="mb-1 text-sm">
                Last name
              </FormLabel>
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    slotProps={{ input: { className: "rounded-lg" } }}
                    error={errors.lastName && true}
                    helperText={errors.lastName?.message}
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    autoComplete="lastName"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.lastName ? "error" : "primary"}
                    sx={{ ariaLabel: "text" }}
                  />
                )}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email" className="mb-1 text-sm">
                Email
              </FormLabel>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    slotProps={{ input: { className: "rounded-lg" } }}
                    error={errors.email && true}
                    helperText={errors.email?.message}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.email ? "error" : "primary"}
                    sx={{ ariaLabel: "email", borderRadius: "1rem" }}
                  />
                )}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password" className="mb-1 text-sm">
                Password
              </FormLabel>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    slotProps={{ input: { className: "rounded-lg" } }}
                    error={errors.password && true}
                    helperText={errors.password?.message}
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.password ? "error" : "primary"}
                  />
                )}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="repeatedPassword" className="mb-1 text-sm">
                Password
              </FormLabel>
              <Controller
                control={control}
                name="repeatedPassword"
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    slotProps={{ input: { className: "rounded-lg" } }}
                    error={errors.repeatedPassword && true}
                    helperText={errors.repeatedPassword?.message}
                    name="repeatedPassword"
                    placeholder="••••••"
                    type="password"
                    id="repeatedPassword"
                    autoComplete="repeatedPassword"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.repeatedPassword ? "error" : "primary"}
                  />
                )}
              />
            </FormControl>

            <div className="mt-4">
              <SubmitFormButton title="Sign up" disabled={isLoading} />
            </div>
          </form>

          <div className="mt-8">
            <Typography className="text-center text-sm">
              {"Already have an account?"}{" "}
              <Link href="/login" className="underline underline-offset-2">
                Sign in
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
