import prisma from "@/lib/prisma";
import { PortfolioForm } from "@/types/types";

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
