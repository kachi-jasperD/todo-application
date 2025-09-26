
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  console.log("MIDDLEWARE: token =", token);
  const { pathname } = req.nextUrl;

  // To protect accessing /todo via the url directly
  // if (pathname.startsWith("/todo")) {
  if (pathname.startsWith("/todo") && req.method === "GET"){
    if (!token) {
       console.log("Redirect: No token");
      return NextResponse.redirect(new URL("/", req.url));
    }

    const payload = await verifyJWT(token);
    if (!payload) {
      console.log("Redirect: Invalid token");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Running middleware on /todo
export const config = {
  matcher: ["/todo/:path*"],
};
