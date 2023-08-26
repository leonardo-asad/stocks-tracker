"use server";

import { zfd } from "zod-form-data";
import { z } from "zod";
import type { Holdings } from "@/types/types";
import { createTransaction } from "@/lib/transaction";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export async function addTransaction(
  formData: FormData,
  portfolioId: string,
  holdings: Holdings
) {
  try {
    const schema = zfd.formData({
      ticker: zfd.text(),
      quantity: zfd.numeric(z.number()),
      price: zfd.numeric(z.number().multipleOf(0.01)),
      action: zfd.text(),
      currency: zfd.text(),
      commission: zfd.numeric(z.number().multipleOf(0.01)),
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
  } catch (e) {
    if (e instanceof ZodError) {
      console.log("error: ", e.message);
      return { message: "There was a validation error." };
    } else {
      return { message: "There was a validation error." };
    }
  }
}
