// // app/api/auth/login/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { SignJWT } from "jose";
// import { serialize } from "cookie";

// const users = [
//   {
//     email: "test@example.com",
//     password: "$2b$10$HCtqVhJ8H2RYbGz6JU/6uOCXe6I58Htqt4ZwDBflJJBeXNEh63xGq",
//   },
// ];

// const secret = new TextEncoder().encode(
//   process.env.JWT_SECRET || "fallback_secret"
// );

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();

//     const user = users.find((u) => u.email === email);
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User not found" },
//         { status: 401 }
//       );
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { success: false, message: "Incorrect password" },
//         { status: 401 }
//       );
//     }

//     // ✅ Generate JWT
//     const token = await new SignJWT({ email: user.email })
//       .setProtectedHeader({ alg: "HS256" })
//       .setExpirationTime("1h")
//       .sign(secret);

//     // ✅ Set Cookie
//     const response = NextResponse.json({
//       success: true,
//       message: "Login successful",
//     });
//     response.headers.append(
//       "Set-Cookie",
//       serialize("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 60 * 60,
//         path: "/",
//       })
//     );

//     return response;
//   } catch (err) {
//     console.error("Login error:", err);
//     return NextResponse.json(
//       { success: false, message: "An error occurred" },
//       { status: 500 }
//     );
//   }
// }

// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { serialize } from "cookie";

const users = [
  {
    email: "test@example.com",
    password:
      "$2b$10$HCtqVhJ8H2RYbGz6JU/6uOCXe6I58Htqt4ZwDBflJJBeXNEh63xGq", // "password"
  },
];

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = users.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 401 });
    }

    const token = await new SignJWT({ email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(secret);

    const response = NextResponse.json({ success: true, message: "Login successful" });
    response.headers.set(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
        path: "/",
      })
    );

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
  }
}
