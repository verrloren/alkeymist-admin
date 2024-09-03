import { AuthFooter } from "@/components/auth/auth-footer";
import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

interface LoginPageProps {}

export default function LoginPage({}: LoginPageProps) {
  return (
    <>
      <div className="relative w-full h-screen dark:bg-[#030303] flex flex-col justify-center items-center gap-y-6 ">
        <h1 className="2xl:text-7xl xl:text-6xl text-5xl font-semibold text-center">
          Welcome!
        </h1>

        <Suspense>
          <LoginForm />
        </Suspense>
      </div>

        <AuthFooter
          src="/auth/register"
          text="Don't have an account? Register"
        />
    </>
  );
}
