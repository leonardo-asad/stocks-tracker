import axios from "axios";
const baseUrl = "https://www.alphavantage.co";

export async function getTimeSeriesMonthlyAdjusted(symbol: string) {
  try {
    const res = await axios.get(
      `${baseUrl}/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
    );
    try {
      return res.data["Monthly Adjusted Time Series"];
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getQuote(symbol: string) {
  try {
    const res = await axios.get(
      `${baseUrl}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
    );

    try {
      return res.data["Global Quote"]["08. previous close"];
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
