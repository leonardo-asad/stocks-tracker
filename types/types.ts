import { Prisma } from "@prisma/client";

const createPortfolioForm = Prisma.validator<Prisma.PortfolioArgs>()({
  select: { name: true, authorId: true },
});

export type PortfolioForm = Prisma.PortfolioGetPayload<
  typeof createPortfolioForm
>;

const createTransactionForm = Prisma.validator<Prisma.TransactionArgs>()({
  select: {
    action: true,
    ticker: true,
    quantity: true,
    price: true,
    currency: true,
    commission: true,
    portfolioId: true,
  },
});

export type TransactionForm = Prisma.TransactionGetPayload<
  typeof createTransactionForm
>;
