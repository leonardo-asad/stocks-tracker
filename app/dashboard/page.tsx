import { getTransactions, getHoldings } from "@/lib/transaction";
import TransactionForm from "@/components/TransactionForm";
import DataGrid from "@/components/datagrid";
import { Transaction } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import PierChartHoldings from "@/components/piechart";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const page = searchParams.page ? Number(searchParams.page) : 1;

  //console.log("page: ", page);
  const limit = 10;

  const { transactions, totalTransactions } = await getTransactions(
    session.user.id,
    page,
    limit
  );
  const holdings = await getHoldings(session.user.id);

  interface Column {
    id: keyof Transaction;
    label: string;
  }

  type Row = Record<keyof Transaction, string | number | Date>;

  const columns: Column[] = [
    { id: "ticker", label: "Ticker" },
    { id: "action", label: "Transaction Type" },
    { id: "createdAt", label: "Date (dd/mm/yyyy hh:mm)" },
    { id: "quantity", label: "Shares" },
    { id: "price", label: "Purchase / Sale Price $" },
    { id: "commission", label: "Commission" },
  ];

  function getRow(columns: Column[], transaction: Transaction) {
    let row = {} as Row;

    for (const column of columns) {
      row[column.id] = transaction[column.id];
    }

    row["id"] = transaction["id"];

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
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <Tabs defaultValue="holdings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="holdings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Holdings Pie Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <PierChartHoldings holdings={holdings} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Holdings List</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {holdings.map((holding) => (
                    <li key={holding.ticker}>
                      Ticker: {holding.ticker}, Quantity:{" "}
                      {holding._sum.quantity}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <div className="container mx-auto">
            <TransactionForm userId={session.user.id} holdings={holdings} />
            <br />
            <DataGrid
              columns={columns}
              rows={getRows(transactions)}
              page={page}
              limit={limit}
              totalTransactions={totalTransactions}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
