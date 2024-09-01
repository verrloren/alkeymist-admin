import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";
import { ToggleLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import StoreSwitcher from "@/components/store-switcher";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/login");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col dark:bg-[#030303]	">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm stores={stores} initialData={store} />
      </div>

      <div className="flex flex-row items-center space-x-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Toggle dark mode</h2>
        <ModeToggle />
      </div>
    </div>
  );
}
