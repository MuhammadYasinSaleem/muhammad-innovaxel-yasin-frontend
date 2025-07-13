// app/layout.tsx or app/layout.js
import './globals.css';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

export const metadata = {
  title: 'Linkly - Effortless URL Shortener',
  description: 'Linkly is a fast and simple URL shortener built with Next.js. Instantly create, manage, and share short links with analytics and custom aliases.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.className} ${bricolage.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Linkly" />
      </head>

      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
