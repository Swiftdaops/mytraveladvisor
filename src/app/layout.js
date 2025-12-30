import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import PostHogProviderWrapper from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = 'My Travel Advisor';
const siteDescription = 'Personalized trips, curated experiences, and the best deals — designed just for you.';
const socialImage = 'https://res.cloudinary.com/dnitzkowt/image/upload/v1767082632/ChatGPT_Image_Dec_30__2025__08_12_29_AM-removebg-preview_voi1mz.png';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mytraveladvisor-taupe.vercel.app';

export const metadata = {
  title: { default: siteTitle, template: '%s | My Travel Advisor' },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'My Travel Advisor logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#0f172a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <PostHogProviderWrapper>
            <main className="flex-grow">{children}</main>
            <Footer />
          </PostHogProviderWrapper>
        </div>
      </body>
    </html>
  );
}
