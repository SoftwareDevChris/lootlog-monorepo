import type { Metadata } from "next";

import { press_start, lato } from "./fonts";
import "./layout.scss";

import { Toaster } from "react-hot-toast";
import { Header } from "@/components/header/Header";
import { Provider } from "./provider";

export const metadata: Metadata = {
  title: "Loot Log - Gaming News and more",
  description:
    "Loot Log is your source for the lastest news in the gaming world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${press_start.variable} ${lato.variable}`}>
      <body>
        <Provider>
          <Header />
          <Toaster />
          <div id="app-shell">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
