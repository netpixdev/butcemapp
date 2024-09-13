import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from '@/components/ClientWrapper';

export const metadata: Metadata = {
  title: "BütçemApp",
  description: "Kişisel bütçe yönetimi uygulaması",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ClientWrapper />
      </body>
    </html>
  );
}
