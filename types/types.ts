export type Role = "USER" | "ADMIN";

export interface User {
  id: number;
  createdAt: Date;
  firstName: String;
  lastName: String;
  email: String;
  role: Role;
  portfolios: Portfolio[];
}

export interface Portfolio {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  authorId: number;
  holdings: Holding[];
}

export interface Holding {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  ticker: string;
  quantity: number;
  portfolio: Portfolio;
  portfolioId: number;
}
