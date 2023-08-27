import { getTransactions, getHoldings } from "@/lib/transaction";
import TransactionForm from "@/components/TransactionForm";
import DataGrid from "@/components/datagrid";
import { Transaction } from "@prisma/client";

export default async function DashboardPage({
  params,
}: {
  params: { id: string };
}) {
  const portfolioId = params.id as string;
  const transactions = await getTransactions(portfolioId);
  const holdings = await getHoldings(portfolioId);

  interface Column {
    id: keyof Transaction;
    label: string;
  }

  type Row = Record<keyof Transaction, string | number | Date>;

  const columns: Column[] = [
    { id: "action", label: "Transaction Type" },
    { id: "createdAt", label: "Date" },
    { id: "quantity", label: "Shares" },
    { id: "price", label: "Purchase / Sale Price $" },
    { id: "commission", label: "Commission" },
  ];

  function getRow(columns: Column[], transaction: Transaction) {
    let row = {} as Row;

    for (const column of columns) {
      row[column.id] = transaction[column.id];
    }

    return row;
  }

  function getRows(transactions: Transaction[]) {
    const rows: Row[] = [];

    for (const transaction of transactions) {
      const row = getRow(columns, transaction) as Row;

      rows.push(row);
    }

    return rows;
  }

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
      <DataGrid columns={columns} rows={getRows(transactions)} />

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
