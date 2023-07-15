import Image from "next/image";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import { Portfolio } from "@prisma/client";

export const getPortfolios = async () => {
  const portfolios = prisma.portfolio.findMany({
    where: {
      authorId: 1,
    },
    include: {
      author: true,
    },
  });

  return portfolios;
};


export default async function Home() {
  const portfolios = await getPortfolios();

  return (
    <div>
      <h1>This is the portfolio list</h1>
      <ol>
        {portfolios.map((portfolio) => (
          <li key={portfolio.id}>{portfolio.name}</li>
        ))}
      </ol>
    </div>
  );
}
