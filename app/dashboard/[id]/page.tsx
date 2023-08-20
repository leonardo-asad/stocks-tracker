import { getTransactions, createTransaction } from "@/lib/transaction";
import TransactionForm from "@/components/TransactionForm";

export default async function DashboardPage({
  params,
}: {
  params: { id: string };
}) {
  const transactions = await getTransactions(params.id);
  const portfolioId = params.id as string;

  return (
    <>
      <h1>Portfolio id: {params.id}</h1>
      <br />
      <h3>Transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            Ticker: ${transaction.ticker}, Price: ${transaction.price},
            Quantity: ${transaction.quantity}
          </li>
        ))}
      </ul>
      <br />
      <h3>Add transaction</h3>
      <TransactionForm portfolioId={portfolioId} />
    </>
  );
}
