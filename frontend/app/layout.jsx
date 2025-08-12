import { Lora, Poppins } from 'next/font/google';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

function BodyContent({ children }) {
  // Client-side only hydration starts here
  return <>{children}</>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning={true}>
        <BodyContent>{children}</BodyContent>
      </body>
    </html>
  );
}
