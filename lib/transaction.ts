import prisma from "./prisma";
import { TransactionForm } from "@/types/types";

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
