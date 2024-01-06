"use client";

import type { Holdings } from "@/types/types";
import { addTransaction } from "@/app/actions/transaction";
import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import * as Form from "@radix-ui/react-form";

export default function TransactionForm({
  userId,
  holdings,
}: {
  userId: string;
  holdings: Holdings;
}) {
  const { pending } = useFormStatus();
  const [message, setMessage] = useState<string>("");

  async function onCreateTransaction(formData: FormData) {
    const res = await addTransaction(formData, userId, holdings);
    setMessage(res.message);
    const transactionForm = document.getElementById(
      "transaction-form"
    ) as HTMLFormElement;
    if (res.message === "Success!") {
      transactionForm.reset();
    }
  }

  return (
    <Form.Root
      id="transaction-form"
      action={onCreateTransaction}
      className="w-full"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-4">
        <Form.Field name="ticker">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
              Ticker
            </Form.Label>
            <Form.Message
              className="text-[10px] text-black opacity-[0.8]"
              match="valueMissing"
            >
              Please enter the ticker
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="text"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="quantity">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
              Quantity
            </Form.Label>
            <Form.Message
              className="text-[10px] text-black opacity-[0.8]"
              match="valueMissing"
            >
              Please enter the quantity
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="number"
              step={0.01}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="price">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
              Price
            </Form.Label>
            <Form.Message
              className="text-[10px] text-black opacity-[0.8]"
              match="valueMissing"
            >
              Please enter the price
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="number"
              step={0.01}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="commission">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
              Commission
            </Form.Label>
            <Form.Message
              className="text-[10px] text-black opacity-[0.8]"
              match="valueMissing"
            >
              Please enter the Commission
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="number"
              step={0.01}
              required
              defaultValue={0.0}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="date">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
              Date
            </Form.Label>
            <Form.Message
              className="text-[10px] text-black opacity-[0.8]"
              match="valueMissing"
            >
              Please enter the Date
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="date"
              required
            />
          </Form.Control>
        </Form.Field>
      </div>

      <div className="my-4">
        <Form.Submit asChild>
          <button className="box-border w-full shadow-blackA4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px] border border-black">
            Add Transaction
          </button>
        </Form.Submit>
      </div>

      <p>{message}</p>
    </Form.Root>
  );
}
