"use client";

import React from "react";
import Providers from '@/components/Providers'; 
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export default function Layout({ children, params: { locale } }: LayoutProps) {
  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <main>
      <Providers>
        {children}
        </Providers>
    </main>
  );
}
