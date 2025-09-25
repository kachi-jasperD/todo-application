// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Pre-hashed password for "password123"
const users = [
  {
    email: "test@example.com",
    password: "$2b$10$HCtqVhJ8H2RYbGz6JU/6uOCXe6I58Htqt4ZwDBflJJBeXNEh63xGq",
  },
];

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = users.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 401 }
      );
    }

    // You can add JWT/session handling here
    return NextResponse.json({ success: true, message: "Login successful" });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
