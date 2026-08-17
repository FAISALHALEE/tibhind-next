import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "TIB HIND",
    template: "%s",
  },
  metadataBase: new URL("https://tibhind.com/"),
  icons: undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..500&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONT_HREF} />
        {children}
      </body>
    </html>
  );
}
