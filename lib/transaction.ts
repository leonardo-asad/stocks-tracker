import prisma from "./prisma";
import { TransactionForm } from "@/types/types";
import type { Holdings } from "@/types/types";

export const getTransactions = async (
  portfolioId: string,
  page: number = 1,
  limit: number = 10
) => {
  const skip = limit * (page - 1);
  const transactions = prisma.transaction.findMany({
    skip,
    take: limit,
    where: {
      portfolioId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return transactions;
};

export const createTransaction = async (data: TransactionForm) => {
  const newTransaction = prisma.transaction.create({
    data,
  });

  return newTransaction;
};

export const getHoldings = async (portfolioId: string) => {
  return prisma.transaction.groupBy({
    by: ["ticker"],
    where: {
      portfolioId,
    },
    _sum: {
      quantity: true,
    },
    having: {
      quantity: {
        _sum: {
          gt: 0,
        },
      },
    },
  });
};
