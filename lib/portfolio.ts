import prisma from "@/lib/prisma";
import { PortfolioForm } from "@/types/types";
import { getStockAggregates } from "./polygon-io";

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

export const getStocksCumulativeQuantity = async (
  from: string,
  to: string,
  portfolioId?: string
) => {
  const details = await prisma.transaction.groupBy({
    by: "ticker",
    where: {
      portfolioId,
      createdAt: {
        lte: to,
        gte: from,
      },
    },
    _sum: {
      quantity: true,
    },
  });

  return details;
};

export const getTickers = async (portfolioId?: string) => {
  const tickers = await prisma.transaction.groupBy({
    by: ["ticker"],
    where: { portfolioId },
    _sum: {
      quantity: true,
    },
    _min: {
      createdAt: true,
    },
  });

  return tickers.map((ticker) => {
    if (ticker._sum.quantity !== null && ticker._sum.quantity > 0) {
      return {
        ticker: ticker.ticker,
        quantity: ticker._sum.quantity,
        firstTrade: ticker._min.createdAt,
      };
    }
  });
};

export async function getPortfolioData(portfolioId?: string) {
  try {
    const holdings = await getTickers(portfolioId);

    const timeSeries = [];

    for (const holding of holdings) {
      if (holding) {
        const from = holding.firstTrade?.toISOString().split("T")[0];
        const to = new Date().toISOString().split("T")[0];

        if (from && to) {
          console.log(`from: ${from}, to: ${to}, symbol: ${holding.ticker}`);
          const timeSerie = await getStockAggregates(
            holding.ticker,
            "2023-01-09",
            to
          );

          timeSeries.push({
            ...holding,
            timeSerie,
          });
        }
      }
    }

    return timeSeries;
  } catch (error) {
    console.log(error);
  }
}
