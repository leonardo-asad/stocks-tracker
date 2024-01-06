import { Prisma } from "@prisma/client";
import { getHoldings } from "@/lib/transaction";

const createTransactionForm = Prisma.validator<Prisma.TransactionDefaultArgs>()(
  {
    select: {
      action: true,
      ticker: true,
      quantity: true,
      price: true,
      commission: true,
      userId: true,
      date: true,
    },
  }
);

export type TransactionForm = Prisma.TransactionGetPayload<
  typeof createTransactionForm
>;

export type Holdings = Prisma.PromiseReturnType<typeof getHoldings>;
