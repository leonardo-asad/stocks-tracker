import { createTransaction } from "@/lib/transaction";
import { revalidatePath } from "next/cache";

export default function TransactionForm({
  portfolioId,
}: {
  portfolioId: string;
}) {
  async function addTransaction(formData: FormData) {
    "use server";

    const ticker = formData.get("ticker") as string;
    const quantity = parseInt(formData.get("quantity") as string);
    const price = parseFloat(formData.get("price") as string);
    const action = formData.get("action") as string;
    const currency = formData.get("currency") as string;
    const commission = parseFloat(formData.get("commission") as string);

    if (
      portfolioId !== null &&
      ticker !== null &&
      quantity !== null &&
      price !== null &&
      action !== null &&
      currency !== null &&
      commission !== null
    ) {
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
    }
  }

  return (
    <form action={addTransaction}>
      <div>
        <label>Ticker: </label>
        <input type="text" name="ticker" />
      </div>
      <div>
        <label>Quantity: </label>
        <input type="number" name="quantity" />
      </div>
      <div>
        <label>Price: </label>
        <input type="number" name="price" />
      </div>
      <div>
        <label>Action: </label>
        <input type="string" name="action" defaultValue={"BUY"} />
      </div>
      <div>
        <label>Currency: </label>
        <input type="text" name="currency" defaultValue={"USD"} />
      </div>
      <div>
        <label>Commission: </label>
        <input type="number" name="commission" defaultValue={0} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
