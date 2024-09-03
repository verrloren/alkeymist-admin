import { AuthFooter } from "@/components/auth/auth-footer";
import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

interface RegisterPageProps {}

export default function RegisterPage({}: RegisterPageProps) {
  return (
    <>
      <div className="relative w-full h-screen dark:bg-[#030303] flex flex-col justify-center items-center gap-y-4">
        <h1 className="w-full 2xl:text-6xl text-5xl  font-semibold text-center">
          Create an account
        </h1>
        <RegisterForm />
      </div>
      <AuthFooter src="/auth/login" text="Already have an account? Login" />
    </>
  );
}
