"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";

export const LoginButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      onClick={() =>
        signIn("credentials", {
          callbackUrl: `${window.location.origin}/dashboard`,
        })
      }
      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    >
      {children}
    </button>
  );
};

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="w-full" onClick={() => signOut({ callbackUrl: "/" })}>
      {children}
    </button>
  );
};
