import Header from "@/components/header";

export default async function Home() {
  return (
    <>
      <Header />
      <div className="mt-8">
        <h1 className="text-center">Welcome to the my new App!</h1>
      </div>
    </>
  );
}
