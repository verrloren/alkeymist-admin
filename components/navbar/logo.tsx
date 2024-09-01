'use client'

import { useRouter } from "next/navigation";


export function Logo() {
	const router = useRouter();
	return (
		<>

			<h1
				className="text-black tracking-tighter dark:text-neutral-100 font-bold text-2xl md:text-3xl cursor-pointer dark:hover:text-neutral-50 transition-colors"
				onClick={() => router.push('/')} 
			>
				Alkeymist
			</h1>

		</>
	)
}
