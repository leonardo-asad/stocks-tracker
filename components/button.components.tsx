"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      style={{ marginRight: 10 }}
      onClick={() =>
        signIn("credentials", {
          callbackUrl: "http://localhost:3000/dashboard",
        })
      }
    >
      Sign in
    </button>
  );
};

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="w-full" onClick={() => signOut()}>
      {children}
    </button>
  );
};
