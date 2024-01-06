import { RegisterForm } from "./form";
import { LoginButton } from "@/components/button.components";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center">
      <div>
        <h2 className="my-12 text-center text-3xl font-bold tracking-tight">
          Register
        </h2>
        <RegisterForm />
        <div className="flex justify-end mt-4">
          <LoginButton>Already have an account?</LoginButton>
        </div>
      </div>
    </div>
  );
}
