import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { withAuth } from "next-auth/middleware";

const authPages = ["/auth/login", "/auth/register", "/auth/forgetPassword", "/auth/verfiyPassword", "/auth/setPassword"];
const adminPages = ["/adminDashboard"];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${authPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  );
  const isAuthPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const adminPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${adminPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  );
  const isAdminPage = adminPathnameRegex.test(req.nextUrl.pathname);

  if (isAuthPage) {
    const redirectURL = new URL("/userDashboard", req.nextUrl.origin);

    if (token) return NextResponse.redirect(redirectURL);
    return handleI18nRouting(req);
  } else {
    if (isAdminPage && token?.user.role !== "admin") {
      const redirectURL = new URL("/userDashboard", req.nextUrl.origin);

      return NextResponse.redirect(redirectURL);
    }

    return (authMiddleware as (req: NextRequest) => Promise<NextResponse>)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
