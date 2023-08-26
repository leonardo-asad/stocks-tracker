import { Prisma } from "@prisma/client";
import { getHoldings } from "@/lib/transaction";

const createPortfolioForm = Prisma.validator<Prisma.PortfolioDefaultArgs>()({
  select: { name: true, authorId: true },
});

export type PortfolioForm = Prisma.PortfolioGetPayload<
  typeof createPortfolioForm
>;

const createTransactionForm = Prisma.validator<Prisma.TransactionDefaultArgs>()(
  {
    select: {
      action: true,
      ticker: true,
      quantity: true,
      price: true,
      currency: true,
      commission: true,
      portfolioId: true,
    },
  }
);

export type TransactionForm = Prisma.TransactionGetPayload<
  typeof createTransactionForm
>;

export type Holdings = Prisma.PromiseReturnType<typeof getHoldings>;
