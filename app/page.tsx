import Image from "next/image";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import { Portfolio } from "@prisma/client";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginButton, LogoutButton, ProfileButton, RegisterButton } from "@/components/button.components";

export const getPortfolios = async () => {
  const portfolios = prisma.portfolio.findMany({
    where: {},
    include: {
      author: true,
    },
  });

  return portfolios;
};


export default async function Home() {
  const session = await getServerSession(authOptions)
  const portfolios = await getPortfolios();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h1>This is the portfolio list</h1>
      <ol>
        {portfolios.map((portfolio) => (
          <li key={portfolio.id}>{portfolio.name}</li>
        ))}
      </ol>
      <LoginButton />
      <RegisterButton />
      <LogoutButton />
      <ProfileButton />
    </div>
  );
}
