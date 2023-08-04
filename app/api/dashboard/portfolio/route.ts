import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { PortfolioForm } from "@/types/types";
import { zfd } from "zod-form-data";

export const getPortfolios = async (authorId: string) => {
  const portfolios = prisma.portfolio.findMany({
    where: {
      authorId,
    },
  });

  return portfolios;
};

export const createPortfolio = async ({ name, authorId }: PortfolioForm) => {
  const newPortfolio = prisma.portfolio.create({
    data: {
      authorId,
      name,
    },
  });

  return newPortfolio;
};

export const updatePortfolio = async (
  portfolioId: string,
  { name }: PortfolioForm
) => {
  const updatedPortfolio = prisma.portfolio.update({
    where: {
      id: portfolioId,
    },
    data: {
      name,
    },
  });

  return updatedPortfolio;
};

export const deletePortfolio = async (portfolioId: string) => {
  const deletePortfolio = prisma.portfolio.delete({
    where: {
      id: portfolioId,
    },
  });

  return deletePortfolio;
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

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }

  const authorId = session.user.id;

  const schema = zfd.formData({
    name: zfd.text(),
  });

  const { name } = schema.parse(await request.formData());

  const newPortfolio = await createPortfolio({ name, authorId });

  return NextResponse.json(newPortfolio);
}
