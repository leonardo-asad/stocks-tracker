"use client";

import Date from "./date";
import Link from "next/link";
import { removeTransaction } from "@/app/actions/transaction";

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

  async function onDeleteTransaction(formData: FormData) {
    await removeTransaction(formData);
  }

  return (
    <div className="sm:container sm:mx-auto">
      <table className="border-collapse border border-slate-400 w-full">
        <thead className="bg-slate-100">
          <tr className="h-12">
            <th className="border border-slate-300 px-4"></th>
            {columns.map((column) => (
              <th key={column.id} className="border border-slate-300 px-4">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row["id"] as string} className="h-12">
              <td className="border border-slate-300 px-1 text-center">
                <form action={onDeleteTransaction}>
                  <input type="hidden" name="id" value={row["id"] as string} />
                  <button className="py-2" type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </form>
              </td>
              {Object.keys(row).map((key, index) => {
                if (key === "id") return null;

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
            <td colSpan={6} className="px-0">
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
