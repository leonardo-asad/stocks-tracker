import prisma from "./prisma";
import { TransactionForm } from "@/types/types";
import type { Holdings } from "@/types/types";

export const getTransactions = async (portfolioId: string) => {
  const transactions = prisma.transaction.findMany({
    where: {
      portfolioId,
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
