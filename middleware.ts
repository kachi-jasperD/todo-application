// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const secret = new TextEncoder().encode(
//   process.env.JWT_SECRET || "fallback_secret"
// );

// async function verifyJWT(token: string) {
//   try {
//     const { payload } = await jwtVerify(token, secret);
//     return payload;
//   } catch (err) {
//     console.log("JWT verification failed:", err);
//     return null;
//   }
// }

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Protect /todo routes
//   if (pathname.startsWith("/todo")) {
//     const token = req.cookies.get("token")?.value;

//     console.log("Middleware token:", token);

//     if (!token) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     const payload = await verifyJWT(token);
//     if (!payload) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// // Apply middleware to /todo
// export const config = {
//   matcher: ["/todo/:path*"],
// };



// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_secret"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect the /todo route
  if (pathname.startsWith("/todo")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      // ❌ No token, redirect to login
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      // ✅ Verify JWT
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/todo/:path*"], // apply only to /todo routes
};
