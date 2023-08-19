import { restClient } from "@polygon.io/client-js";
const rest = restClient(process.env.POLYGON_API_KEY);

export async function getStockAggregates(
  symbol: string,
  from: string,
  to: string
) {
  try {
    const response = await rest.stocks.aggregates(symbol, 1, "month", from, to);
    const data = response.results?.map((item) => {
      if (item && item.c && item.t) {
        return {
          date: new Date(item.t),
          close: item.c,
        };
      }
    });

    console.log("data: ", data);

    return data;
  } catch (error) {
    console.log(error);
  }
}
