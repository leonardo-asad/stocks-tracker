"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import * as Form from "@radix-ui/react-form";

export const RegisterForm = () => {
  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Form.Root
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: 500,
        rowGap: 10,
      }}
      autoComplete="off"
    >
      <Form.Field name="firstName">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
            First Name
          </Form.Label>
          <Form.Message
            className="text-[10px] text-black opacity-[0.8]"
            match="valueMissing"
          >
            Please enter the first name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="text"
            required
            onChange={handleChange}
            value={formValues.firstName}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="lastName">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
            Last Name
          </Form.Label>
          <Form.Message
            className="text-[10px] text-black opacity-[0.8]"
            match="valueMissing"
          >
            Please enter the last name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="text"
            required
            onChange={handleChange}
            value={formValues.lastName}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="email">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
            Email
          </Form.Label>
          <Form.Message
            className="text-[10px] text-black opacity-[0.8]"
            match="valueMissing"
          >
            Please enter the email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="email"
            required
            onChange={handleChange}
            value={formValues.email}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="password">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
            Password
          </Form.Label>
          <Form.Message
            className="text-[10px] text-black opacity-[0.8]"
            match="valueMissing"
          >
            Please enter the password
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
            type="password"
            required
            onChange={handleChange}
            value={formValues.password}
          />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <button
          className="box-border w-full shadow-blackA4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[20px] border border-black"
          disabled={loading}
        >
          {loading ? "loading..." : "Register"}
        </button>
      </Form.Submit>
    </Form.Root>
  );
};
