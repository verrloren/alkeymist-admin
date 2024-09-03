import { Social } from "@/components/auth/social";

const AuthLayout = ({ children }: { children: React.ReactNode}) => {
	return (
		<div className="dark:bg-[#030303] w-full flex flex-col items-center justify-center ">
			<div className="w-3/4 sm:w-1/2 md:w-1/3 lg:1/4 flex flex-col gap-7 ">
				{children}
			</div>
		</div>
		)
};

export default AuthLayout;