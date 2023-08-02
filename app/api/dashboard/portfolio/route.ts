import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const getPortfolios = async (authorId: string) => {
  const portfolios = prisma.portfolio.findMany({
    where: {
      authorId,
    },
    include: {
      author: true,
    },
  });

  return portfolios;
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }

  const portfolios = await getPortfolios(session.user.id);

  return NextResponse.json(portfolios);
}
