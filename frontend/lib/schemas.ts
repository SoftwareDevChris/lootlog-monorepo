import { z } from "zod";

export type TInitialVideoArticleState = {
  status: number;
  errors: {
    title?: string[];
    subtitle?: string[];
    youtubeVideoId?: string[];
    body?: string[];
  } | null;
  message: string;
};

export type TInitialNewsArticleState = {
  status: number;
  errors: {
    title?: string[];
    subtitle?: string[];
    image?: string[];
    body?: string[];
  } | null;
  message: string;
};

const MAX_FILE_SIZE = 5000000;
const ALLOWED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/webp",
  "image/png",
];

export const videoArticleSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Must be at least 10 characters long" })
    .max(100, { message: "No more than 100 characters are allowed" }),
  subtitle: z
    .string()
    .min(20, { message: "Must be at least 20 characters long" })
    .max(200, { message: "No more than 200 characters are allowed" }),
  body: z
    .string()
    .min(100, { message: "Must have minimum 100 characters" })
    .max(1000, { message: "No more than 1.000 characters are allowed" }),
  categoryId: z.number(),
  youtubeVideoId: z.string(),
});

export const newsArticleSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Must be at least 10 characters long" })
    .max(100, { message: "No more than 100 characters are allowed" }),
  subtitle: z
    .string()
    .min(20, { message: "Must be at least 20 characters long" })
    .max(250, { message: "No more than 250 characters are allowed" }),
  body: z
    .string()
    .min(100, { message: "Must have minimum 100 characters" })
    .max(10000, { message: "No more than 10.000 characters are allowed" }),
  categoryId: z.number(),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max image size is 5MB")
    .refine(
      (file) => ALLOWED_IMAGE_TYPES.includes(file?.type),
      "Only jpg, jpeg, webp and png image types are supported",
    ),
});
