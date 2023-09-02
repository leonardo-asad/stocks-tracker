"use client";

import { format } from "date-fns";

export default function Date({ date }: { date: Date }) {
  const dateFormatted = format(date, "dd/mm/yyyy hh:mm");

  return <span>{dateFormatted}</span>;
}
