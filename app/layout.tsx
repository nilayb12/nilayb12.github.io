import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, JetBrains_Mono } from 'next/font/google';
import CONFIG from '../gitprofile.config';
import { LOCAL_STORAGE_KEY_NAME } from '../src/constants';
import { ACCENTS, ACCENT_STORAGE_KEY } from '../src/constants/accents';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-face',
});

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const { title, description, imageURL } = CONFIG.seo;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: imageURL ? [imageURL] : [] },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: imageURL ? [imageURL] : [],
  },
  icons: {
    icon: [
      { url: `${base}/favicon.ico` },
      { url: `${base}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${base}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

// Applies the visitor's saved light/dark choice before first paint (no flash).
// Same storage key and DOM changes as HeroUI's useTheme(), which takes over
// once the page is interactive.
const tc = CONFIG.themeConfig;
const themeScript = `(function(){try{
  var d=${JSON.stringify(tc.defaultTheme || 'system')},
      t=${JSON.stringify(!!tc.disableSwitch)}?d:(localStorage.getItem(${JSON.stringify(LOCAL_STORAGE_KEY_NAME)})||d);
  if(t==='system'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
  var e=document.documentElement;e.classList.add(t);e.setAttribute('data-theme',t);
  var a=${JSON.stringify(Object.fromEntries(ACCENTS.filter((x) => x.id !== 'default').map((x) => [x.id, [x.hex, x.fg]])))}[localStorage.getItem(${JSON.stringify(ACCENT_STORAGE_KEY)})];
  if(a){e.style.setProperty('--accent',a[0]);e.style.setProperty('--accent-foreground',a[1]);}
}catch(_){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = CONFIG.googleAnalytics.id;
  const accent = CONFIG.themeConfig.accentColor;
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${mono.variable}`}
      style={
        accent ? ({ '--accent': accent } as React.CSSProperties) : undefined
      }
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
