"use server";

import { zfd } from "zod-form-data";
import { z } from "zod";
import type { Holdings } from "@/types/types";
import { createTransaction, deleteTransaction } from "@/lib/transaction";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

/**
 * Adds a transaction to the portfolio.
 *
 * @param formData - The form data containing the transaction details.
 * @param userId - The ID of the user performing the transaction.
 * @param holdings - The current holdings in the portfolio.
 * @returns An object with a success message if the transaction is added successfully, or an error message if there is a validation error or insufficient balance.
 */
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
      commission: zfd.numeric(z.number().multipleOf(0.01).min(0.0)),
      date: zfd.text(),
    });

    const { ticker, quantity, price, commission, date } =
      schema.parse(formData);

    const action = quantity > 0 ? "Buy" : "Sell";

    if (quantity < 0) {
      const item = holdings.find(
        (holding) => holding.ticker === ticker.toUpperCase()
      );

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
      commission,
      userId,
      date: new Date(date),
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

/**
 * Removes a transaction from the database.
 *
 * @param formData - The form data containing the transaction ID.
 * @returns A promise that resolves to an object with a success message or an error message.
 */
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
