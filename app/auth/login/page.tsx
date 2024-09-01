import { AuthFooter } from "@/components/auth/auth-footer";
import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

interface LoginPageProps {}

export default function LoginPage({}: LoginPageProps) {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-y-6 ">
			<h1 className="2xl:text-7xl xl:text-6xl text-5xl font-semibold text-center">
				Welcome!
			</h1>
			
			<Suspense>
				<LoginForm />
			</Suspense>

			<AuthFooter src="/auth/register" text="Don't have an account? Register" />
		</div>
 )
}