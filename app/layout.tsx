import { Player, Sidebar } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import {
  ModalProvider,
  SupabaseProvider,
  ToasterProvider,
  UserProvider,
} from "@/providers";
import { getActiveProductsWithPrices, getSongsByUserId } from "@/actions";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
