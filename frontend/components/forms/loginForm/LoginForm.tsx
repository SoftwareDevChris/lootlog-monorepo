"use client";
import { useState } from "react";
import Link from "next/link";

import { login } from "@/lib/auth/";

import { TLoginForm } from "@/types/form.types";

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

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TLoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TLoginForm> = async (data) => {
    setErrorMessage("");
    const signInResponse = await login(data);

    if (signInResponse.ok) {
      toast.success("You are now logged in");
      window.location.href = "/dashboard/user";
      return;
    }

    const jsonError = await signInResponse.json();
    setErrorMessage(jsonError.message);
    return;
  };

  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center bg-constellation bg-repeat p-4">
        <div className="min-w-[25rem] rounded-md bg-neutral-900 p-8">
          <h2 className="mb-8 text-3xl font-bold">Sign in</h2>

          {errorMessage && (
            <p className="mb-4 text-center text-red-600">{errorMessage}</p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormLabel htmlFor="password" className="mb-1 text-sm">
                  Password
                </FormLabel>
                <Link href="/forgot-password">
                  <Typography
                    color="textSecondary"
                    fontSize={14}
                    className="text-xs hover:text-white"
                  >
                    Forgot your password?
                  </Typography>
                </Link>
              </Box>
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
                    autoComplete="current-password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.password ? "error" : "primary"}
                  />
                )}
              />
            </FormControl>

            <div className="mt-4">
              <SubmitFormButton title="Login" disabled={isSubmitting} />
            </div>
          </form>

          <div className="mt-8">
            <Typography className="text-center text-sm">
              {"Don't have an account yet?"}{" "}
              <Link href="/sign-up" className="underline underline-offset-2">
                Sign up
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
