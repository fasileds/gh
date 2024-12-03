import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const { email, lat, long } = await req.json();
  if (!email) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }
  console.log(email, lat, long);
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return NextResponse.json({ existingUser });
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        latitude: lat,
        longitude: long,
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
