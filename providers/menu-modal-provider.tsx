'use client'
import { MenuModal } from "@/components/modals/menu-modal";
import { useEffect, useState } from "react"


export default function MenuModalProvider() {

	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, []);

	if(!isMounted) return null

	return (
		<>
			<MenuModal />
		</>
	)
}