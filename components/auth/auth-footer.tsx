'use client'

import Link from "next/link"
import { useRouter } from "next/navigation";

interface AuthFooterProps {
	text: string
	src: string
}

export function AuthFooter({ text, src }: AuthFooterProps) {
	const router = useRouter();
	return (
		<div 
			onClick={() => router.push(src)} 
			className="w-full h-20 bg-white dark:bg-darker absolute bottom-0 left-0 
			border-t-[1px] border-[#eBEBEB] dark:border-neutral-800 flex justify-center items-center
			cursor-pointer hover:underline hover:shadow-xl 
			hover:border-[#dedede] dark:hover:border-neutral-700 transition-colors">
			<Link
				className="text-md text-neutral-200 hover:underline"
				href="/auth/register">
				{text}
			</Link>
		</div>
	)
}
