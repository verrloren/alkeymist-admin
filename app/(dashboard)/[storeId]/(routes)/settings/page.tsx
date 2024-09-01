import { auth } from "@/auth"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";
import { ToggleLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import StoreSwitcher from "@/components/store-switcher";

interface SettingsPageProps {
	params: {
		storeId: string
	}
}

export default async function SettingsPage({ params }: SettingsPageProps) {

	const session = await auth();
	const userId = session?.user?.id;

	if(!userId) {
		redirect('/auth/login');
	}

	const store = await db.store.findFirst({
		where: {
			id: params.storeId,
			userId
		}
	});

	const stores = await db.store.findMany({
		where: {
			userId
		}
	})

	if (!store) {
		redirect('/');
	};


	return (
		<div className="flex-col dark:bg-darker	">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SettingsForm stores={stores} initialData={store} />
			</div>
			
			<div className="flex-col flex-1 space-y-4 p-8 pt-6">
				<h1>Toggle dark mode</h1>
				<ModeToggle />
			</div>
		</div>
	)
}
