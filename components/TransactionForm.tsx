"use client";

import type { Holdings } from "@/types/types";
import { addTransaction } from "@/app/actions/transaction";
import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function TransactionForm({
  portfolioId,
  holdings,
}: {
  portfolioId: string;
  holdings: Holdings;
}) {
  const { pending } = useFormStatus();
  const [message, setMessage] = useState<string>("");

  async function onCreateTransaction(formData: FormData) {
    const res = await addTransaction(formData, portfolioId, holdings);
    setMessage(res.message);
    const transactionForm = document.getElementById(
      "transaction-form"
    ) as HTMLFormElement;
    if (res.message === "Success!") {
      transactionForm.reset();
    }
  }

  return (
    <form id="transaction-form" action={onCreateTransaction}>
      <div className="my-2">
        <label className="mr-2">Ticker: </label>
        <input
          className="ring-1 rounded-md"
          type="text"
          name="ticker"
          required
        />
      </div>
      <div className="my-2">
        <label className="mr-2">Quantity: </label>
        <input
          type="number"
          name="quantity"
          className="ring-1 rounded-md"
          required
        />
      </div>
      <div className="my-2">
        <label className="mr-2">Price: </label>
        <input
          type="number"
          name="price"
          className="ring-1 rounded-md"
          required
        />
      </div>
      <div className="my-2">
        <label className="mr-2">Action: </label>
        <input
          type="string"
          name="action"
          defaultValue={"BUY"}
          className="ring-1 rounded-md"
          required
        />
      </div>
      <div className="my-2">
        <label className="mr-2">Currency: </label>
        <input
          type="text"
          name="currency"
          defaultValue={"USD"}
          className="ring-1 rounded-md"
          required
        />
      </div>
      <div className="my-2">
        <label className="mr-2">Commission: </label>
        <input
          type="number"
          name="commission"
          defaultValue={0}
          className="ring-1 rounded-md"
          required
        />
      </div>

      <button
        disabled={pending}
        type="submit"
        className="bg-slate-300 px-5 py-2 rounded-md"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
      <p>{message}</p>
    </form>
  );
}
