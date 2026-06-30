'use client';

import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';

const OfflineSyncProvider = dynamic(() => import('./OfflineSyncProvider'), { ssr: false });

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={300} refetchOnWindowFocus={false}>
      <OfflineSyncProvider>{children}</OfflineSyncProvider>
    </SessionProvider>
  );
}
