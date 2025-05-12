import "./globals.css";
import { Lato } from "next/font/google";
import Providers from "./providers";
import { headers } from "next/headers";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700"],
});

export const metadata = {
  title: "Therapy with Jasdeep",
  description:
    "Experience transformative therapy with Jasdeep, a trained psychologist specializing in relationship healing, emotional intelligence, and authentic connections. Book a discovery call today.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={lato.className}>
      <body className="bg-bone-700">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
