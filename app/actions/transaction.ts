"use server";

import { zfd } from "zod-form-data";
import { z } from "zod";
import type { Holdings } from "@/types/types";
import { createTransaction } from "@/lib/transaction";
import { revalidatePath } from "next/cache";

export async function addTransaction(
  formData: FormData,
  portfolioId: string,
  holdings: Holdings
) {
  const schema = zfd.formData({
    ticker: zfd.text(),
    quantity: zfd.numeric(z.number()),
    price: zfd.numeric(z.number()),
    action: zfd.text(),
    currency: zfd.text(),
    commission: zfd.numeric(z.number()),
  });

  const { ticker, quantity, price, action, currency, commission } =
    schema.parse(formData);

  if (quantity < 0) {
    const item = holdings.find((holding) => holding.ticker === ticker);

    if (item) {
      const balance = item?._sum.quantity;

      if (balance !== null && balance < Math.abs(quantity)) {
        return { message: "You don't have enough balance" };
      }
    }
  }

  await createTransaction({
    ticker,
    quantity,
    price,
    action,
    currency,
    commission,
    portfolioId,
  });

  revalidatePath("/dashboard/[id]");

  return { message: "Success!" };
}
