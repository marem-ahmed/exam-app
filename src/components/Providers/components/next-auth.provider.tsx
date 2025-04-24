'use client'
import { SessionProvider } from 'next-auth/react';
import React from 'react'
type nextAuthProviderProps={
    children:React.ReactNode
}
export default function nextAuthProvider({ children }: nextAuthProviderProps) {
  return (
    <div>
      <SessionProvider>
        {children}
        </SessionProvider>
    </div>
  );
}
