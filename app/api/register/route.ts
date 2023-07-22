import  prisma  from "../../../lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = (await req.json()) as {
      firstName?: string;
      lastName?: string;
      email: string;
      password: string;
    };
    const passwordHash = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        passwordHash,
      },
    });

    return NextResponse.json({
      user: {
        name: user.firstName,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
