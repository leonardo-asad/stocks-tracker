import { LoginButton, LogoutButton } from "@/components/button.components";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <h1>Hello, Home Page!</h1>
      <LoginButton />
      <Link href="/register" style={{ marginRight: 10 }}>
        Register
      </Link>
      <LogoutButton />
      <Link style={{ marginRight: 10 }} href="/profile">
        Profile
      </Link>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
