import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const getPortfolios = async () => {
  const portfolios = prisma.portfolio.findMany({
    where: {},
    include: {
      author: true,
    },
  });

  return portfolios;
};

export default async function Page() {
  const session = await getServerSession(authOptions)
  const portfolios = await getPortfolios();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <h1>Hello Dashboard!</h1>
}
