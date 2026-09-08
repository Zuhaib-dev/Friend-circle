'use client';

import { SessionProvider } from 'next-auth/react';
import OfflineSyncProvider from './OfflineSyncProvider';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={300} refetchOnWindowFocus={false}>
      <OfflineSyncProvider>{children}</OfflineSyncProvider>
    </SessionProvider>
  );
}
