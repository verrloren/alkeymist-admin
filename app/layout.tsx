import "./globals.css"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { ModalProvider } from "@/providers/modal-provider"
import ToasterProvider from "@/providers/toaster-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import MenuModalProvider from "@/providers/menu-modal-provider"

const DM = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Alkeymist Admin",
	description:
		"Alkeymist Admin is a custom keyboards e-commerce store admin dashboard to add, remove and conrol all the content.",
}
export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<body className={DM.className}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem >
					<MenuModalProvider />
					<ToasterProvider />
					<div className="w-full ">
						<main className="">
							<ModalProvider />
							{children}
						</main>
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
