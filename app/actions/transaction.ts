"use server";

import { zfd } from "zod-form-data";
import { z } from "zod";
import type { Holdings } from "@/types/types";
import { createTransaction, deleteTransaction } from "@/lib/transaction";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export async function addTransaction(
  formData: FormData,
  userId: string,
  holdings: Holdings
) {
  try {
    const schema = zfd.formData({
      ticker: zfd.text(),
      quantity: zfd.numeric(z.number()),
      price: zfd.numeric(z.number().multipleOf(0.01).min(0.01)),
      currency: zfd.text(),
      commission: zfd.numeric(z.number().multipleOf(0.01).min(0.0)),
    });

    const { ticker, quantity, price, currency, commission } =
      schema.parse(formData);

    const action = quantity > 0 ? "Buy" : "Sell";

    if (quantity < 0) {
      const item = holdings.find((holding) => holding.ticker === ticker);

      if (item) {
        const balance = item?._sum.quantity;

        if (balance !== null && balance < Math.abs(quantity)) {
          return { message: "You don't have enough balance" };
        }
      }
    }

    const tickerUppercase = ticker.toUpperCase();

    await createTransaction({
      ticker: tickerUppercase,
      quantity,
      price,
      action,
      currency,
      commission,
      userId,
    });

    revalidatePath("/dashboard/[id]", "page");

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

export async function removeTransaction(formData: FormData) {
  try {
    const schema = zfd.formData({
      id: zfd.text(),
    });

    const { id } = schema.parse(formData);
    await deleteTransaction(id);
    revalidatePath("/dashboard/[id]", "page");
    return { message: "Success!" };
  } catch (e) {
    console.log(e);
    if (e instanceof ZodError) {
      console.log("error: ", e.message);
      return { message: "There was a validation error." };
    } else {
      return { message: "There was a validation error." };
    }
  }
}
