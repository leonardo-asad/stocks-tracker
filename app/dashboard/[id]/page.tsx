import { getTransactions, getHoldings } from "@/lib/transaction";
import TransactionForm from "@/components/TransactionForm";

export default async function DashboardPage({
  params,
}: {
  params: { id: string };
}) {
  const portfolioId = params.id as string;
  const transactions = await getTransactions(portfolioId);
  const holdings = await getHoldings(portfolioId);

  return (
    <>
      <h1 className="font-bold">Portfolio id: {params.id}</h1>
      <br />
      <h3 className="font-bold">Transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            Ticker: ${transaction.ticker}, Price: ${transaction.price},
            Quantity: ${transaction.quantity}
          </li>
        ))}
      </ul>
      <br />
      <h3 className="font-bold">Add transaction</h3>
      <TransactionForm portfolioId={portfolioId} holdings={holdings} />
      <br />
      <h3 className="font-bold">Holdings</h3>
      <ul>
        {holdings.map((holding) => (
          <li key={holding.ticker}>
            Ticker: {holding.ticker}, Quantity: {holding._sum.quantity}
          </li>
        ))}
      </ul>
    </>
  );
}
