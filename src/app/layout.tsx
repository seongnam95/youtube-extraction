import { ReactNode } from 'react';

import { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import Content from '@/layouts/Content';
import Footer from '@/layouts/Footer';
import '@/styles/globals.css';

const inter = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Youtube Audio Extraction - 유튜브 음원 추출 및 오디오 편집',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="root" className="flex h-screen w-screen flex-col">
          <Content className="flex-grow">{children}</Content>
          <Footer />
        </div>
      </body>
    </html>
  );
}
