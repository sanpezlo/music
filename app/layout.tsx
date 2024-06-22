import "./globals.css";
import type { Metadata } from "next";
import LocalFont from "next/font/local";

import AsideMenu from "@/components/AsideMenu";

const font = LocalFont({
  src: [
    {
      path: "../public/fonts/CircularStd-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/CircularStd-Book.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/CircularStd-Light.woff2",
      weight: "300",
    },
    {
      path: "../public/fonts/CircularStd-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/CircularStd-Black.woff2",
      weight: "900",
    },
  ],
});

export const metadata: Metadata = {
  title: "Music",
  description: "Music app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} relative grid h-screen gap-2 bg-black p-2 [grid-template-areas:'aside_main_main''player_player_player'] [grid-template-columns:280px_1fr] [grid-template-rows:1fr_72px]`}
      >
        <aside className="flex flex-col overflow-y-auto [grid-area:aside]">
          <AsideMenu />
        </aside>
        <main className="overflow-y-auto rounded-lg bg-neutral-800 [grid-area:main]">
          {children}
        </main>
        <footer className="rounded-lg bg-neutral-800 [grid-area:player]"></footer>
      </body>
    </html>
  );
}
