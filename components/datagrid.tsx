import Date from "./date";
import Link from "next/link";

interface Column {
  id: string;
  label: string;
}

type Row = Record<string, string | number | Date>;

interface Props {
  columns: Column[];
  rows: Row[];
  portfolioId: string;
  page: number;
  limit: number;
  totalTransactions: number;
}

export default function DataGrid({
  columns,
  rows,
  portfolioId,
  page,
  limit,
  totalTransactions,
}: Props) {
  const emptyRows = limit - rows.length;
  const emptyHeight = emptyRows * 3;
  const lastPage = limit * page > totalTransactions;

  return (
    <div className="sm:container sm:mx-auto">
      <table className="border-collapse border border-slate-400">
        <thead className="bg-slate-100">
          <tr className="h-12">
            {columns.map((column) => (
              <th key={column.id} className="border border-slate-300 px-4">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="h-12">
              {Object.keys(row).map((key, index) => {
                if (key === "createdAt") {
                  return (
                    <td key={index} className="border border-slate-300 px-4">
                      <Date date={row["createdAt"] as Date} />
                    </td>
                  );
                }

                return (
                  <td
                    key={index}
                    className="border border-slate-300 px-4"
                  >{`${row[key]}`}</td>
                );
              })}
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr
              style={{ height: `${emptyHeight}rem` }}
              className="border border-slate-300"
            >
              <td></td>
            </tr>
          )}
        </tbody>
        <tfoot className="border border-slate-300">
          <tr>
            <td colSpan={5} className="px-0">
              <div className="flex justify-between w-full p-2">
                <div className="p-2 ">
                  <span>
                    Showing {limit * (page - 1)}-
                    {limit * page < totalTransactions
                      ? limit * page
                      : totalTransactions}{" "}
                    from {totalTransactions} transactions
                  </span>
                </div>
                <div className="inline-flex">
                  <Link
                    href={`/dashboard/${portfolioId}?page=${
                      page > 1 ? page - 1 : 1
                    }`}
                    className="flex items-center justify-center px-3 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      className="w-3.5 h-3.5 mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4"
                      />
                    </svg>
                    Prev
                  </Link>

                  <Link
                    href={`/dashboard/${portfolioId}?page=${
                      lastPage ? page : page + 1
                    }`}
                    className="flex items-center justify-center px-3 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
