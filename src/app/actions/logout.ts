"use server";

import { AUTH_COOKIE } from "@/lib/Constants/auth.constant";
import { cookies } from "next/headers";
import { getAuthHeader } from '@/lib/utils/auth-header';
import { JSON_HEADER } from "@/lib/Constants/api.constant";

export default async function logOut() {
  const token = cookies().get(AUTH_COOKIE)?.value;
  if (!token) return;
   await fetch(`${process.env.API}/auth/logout`, {
     method: "POST",
     headers: {
        ...JSON_HEADER,
       ...(await getAuthHeader)
     },
   });
}
