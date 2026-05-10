import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Outfit,
  Fredoka,
  Sacramento,
} from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart";
import { AuthProvider } from "@/context/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ono Belle Global Limited — Premium Baby & Family Skincare Distribution for Nigeria",
    template: "%s · Ono Belle Global Limited",
  },
  description:
    "Ono Belle Global Limited is a Nigerian import & distribution company specialising in premium baby care, skincare, and family wellness products — connecting internationally certified brands with pharmacies, hospitals, and specialty retailers across Nigeria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${fredoka.variable} ${sacramento.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
