import { Press_Start_2P, Lato } from "next/font/google";

export const press_start = Press_Start_2P({
  preload: true,
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-press-start",
});

export const lato = Lato({
  preload: true,
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});
