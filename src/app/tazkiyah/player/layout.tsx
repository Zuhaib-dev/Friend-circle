import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quran Player - Friend Circle',
  description: 'A quiet moment for the heart. Listen to beautiful Quran recitations, find peace, and save your favorite surahs with the Friend Circle Tazkiyah player.',
  openGraph: {
    title: 'Quran Player - Friend Circle',
    description: 'A quiet moment for the heart. Listen to beautiful Quran recitations, find peace, and save your favorite surahs with the Friend Circle Tazkiyah player.',
    type: 'website',
  },
};

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
