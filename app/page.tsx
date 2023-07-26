import { LoginButton, LogoutButton, ProfileButton, RegisterButton, DashboardButton } from "@/components/button.components";


export default async function Home() {
  return (
    <div>
      <h1>Hello, Home Page!</h1>
      <LoginButton />
      <RegisterButton />
      <LogoutButton />
      <ProfileButton />
      <DashboardButton />
    </div>
  );
}
