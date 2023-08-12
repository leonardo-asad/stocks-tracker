import axios from "axios";
import { restClient } from "@polygon.io/client-js";
const rest = restClient(process.env.POLYGON_API_KEY);

export async function getStockAggregates(
  symbol: string,
  from: string,
  to: string
) {
  try {
    const response = await rest.stocks.aggregates(symbol, 1, "day", from, to);
    return response.results;
  } catch (error) {
    console.log(error);
  }
}
