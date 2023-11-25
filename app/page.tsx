import Header from "@/components/header";

export default async function Home() {
  return (
    <>
      <Header />
      <div>
        <header className="App-header bg-blue-400 text-white p-10">
          <h1 className="text-6xl font-bold mb-4">Welcome to Stock Tracker</h1>
          <p className="text-2xl">
            Your one-stop solution for tracking stock prices and managing your
            portfolio.
          </p>
        </header>
        <main className="p-10">
          <section>
            <h2 className="text-4xl font-bold mb-4">About the Application</h2>
            <p className="text-xl mb-2">
              Stock Tracker allows you to monitor the stock market in real-time.
              Stay updated with the latest prices of your favorite stocks.
            </p>
            <p className="text-xl mb-2">
              Manage your portfolio with ease. Get a visual and quantitative
              glimpse of your portfolio composition.
            </p>
            <p className="text-xl">
              Make informed decisions with our analysis tools and stay ahead in
              the game.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
