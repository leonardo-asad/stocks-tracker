"use client";

import { Portfolio } from "@prisma/client";
import { Link } from "@chakra-ui/next-js";

interface Props {
  portfolios: Portfolio[];
}

export function SidebarLinks({ portfolios }: Props) {
  return (
    <>
      <li>
        <Link href="/dashboard">All</Link>
      </li>
      {portfolios.map((portfolio) => (
        <li key={portfolio.id}>
          <Link href={`/dashboard/${portfolio.id}`}>{portfolio.name}</Link>
        </li>
      ))}
    </>
  );
}
