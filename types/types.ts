import { Prisma } from "@prisma/client";

const createPortfolioForm = Prisma.validator<Prisma.PortfolioArgs>()({
  select: { name: true, authorId: true },
});

export type PortfolioForm = Prisma.PortfolioGetPayload<
  typeof createPortfolioForm
>;
