"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { login } from "@/lib/auth/";

import { TLoginForm } from "@/types/form.types";

import toast from "react-hot-toast";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Label } from "@/components/ui/label/Label";
import { SubmitFormButton } from "@/components/buttons/SubmitFormButton";
import { useUserStore } from "@/store/user-store";

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const setIsLoggedIn = useUserStore().setIsLoggedIn;

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TLoginForm> = async (data) => {
    setErrorMessage([]);
    const signInResponse = await login(data);

    if (signInResponse.ok) {
      setIsLoggedIn(true);
      toast.success("You are now logged in");
      router.push("/dashboard/user");
      return;
    }

    const signInError = await signInResponse.json().then((err) => err.message);
    setErrorMessage(signInError);
    return;
  };

  return (
    <div className="login-page">
      <div className="form-wrapper auth-form">
        <div className="title-container">
          <h2>Sign in</h2>
        </div>

        {errorMessage && <p className="form-error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <input {...field} required />}
            />
            {errors.email?.message && (
              <p className="input-error">{errors.email.message}</p>
            )}
          </div>

          <div className="input-group">
            <Label htmlFor="password">Password</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input {...field} type="password" required />
              )}
            />
            {errors.password?.message && (
              <p className="input-error">{errors.password.message}</p>
            )}
          </div>

          <SubmitFormButton title="Login" disabled={isSubmitting} />
        </form>

        <div className="link-container">
          <p style={{ marginBottom: "1rem" }}>Forgot password?</p>
          <p>Do you not have an account yet?</p>
          <Link href="/sign-up">Sign up</Link>
        </div>
      </div>
    </div>
  );
};
