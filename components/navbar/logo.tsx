"use client"

import Image from "next/image"
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"

export default function Logo() {

	const router = useRouter();

	return (
		<div className="flex gap-4 items-center">
			<Button onClick={() => router.push('/')} variant="ghost">
				<Image
					src="/images/logoRemove.png"
					alt="Home"
					width="100"
					height="50"
				/>
			</Button>

		</div>
	)
}