import { Prisma } from "@prisma/client";
import { getHoldings } from "@/lib/transaction";

const createTransactionForm = Prisma.validator<Prisma.TransactionDefaultArgs>()(
  {
    select: {
      action: true,
      ticker: true,
      quantity: true,
      price: true,
      currency: true,
      commission: true,
      userId: true,
    },
  }
);

export type TransactionForm = Prisma.TransactionGetPayload<
  typeof createTransactionForm
>;

export type Holdings = Prisma.PromiseReturnType<typeof getHoldings>;
