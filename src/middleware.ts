import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
const privatePages = new Set(["/en/dashboard", "/en/diplomas"]);
const authPages=new Set(["en/auth/login","en/auth/register","en/auth/forgetPassword","en/auth/verfiyPassword","en/auth/setPassword"])
export default async function middleware(req:NextRequest) {
    const token=await getToken({req})
    const pathname=req.nextUrl.pathname
   if(privatePages.has(pathname)){
    if(!token){
        const redirectUrl=new URL("en/auth/login",req.nextUrl.origin)
        return NextResponse.redirect(redirectUrl)
    }
    return NextResponse.next()
   }else{
    if(authPages.has(pathname)&&token){
        const redirectUrl=new URL("/",req.nextUrl.origin)
        return NextResponse.redirect(redirectUrl)
    }
   }
   return NextResponse.next()
   
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}

