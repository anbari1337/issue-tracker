import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import NavBar from "./NavBar";
import { roboto } from "./ui/fonts";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <Theme appearance='light' accentColor='violet'>
          <NavBar />
          <main className='px-5'>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
