'use client';

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
	title: string;
	description: string;
	variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
	public: "Public",
	admin: "Admin",
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
	public: "secondary",
	admin: "destructive",
}

export function ApiAlert({
	title,
	description,
	variant = "public",
}: ApiAlertProps) {

	const onCopy = () => {
		navigator.clipboard.writeText(description);
		toast.success('Copyed to clipboard');
	}

	return (
		<Alert className="mb-4">
			<Server className="h-4 w-4 dark:text-neutral-200" />
			<AlertTitle className="flex items-center gap-2-x dark:text-neutral-300">
				{title}
				<Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
			</AlertTitle>

			<AlertDescription className="mt-4 flex items-center justify-between">
				<code className="relative rounded bg-transparent px-[0.3rem] 
					py-[0.2rem] font-mono text-sm font-semibold dark:text-neutral-600"
				>
					{description}
				</code>
				<Button variant="outline" size="icon" onClick={onCopy}>
					<Copy className="w-4 h-4 dark:text-neutral-300" />
				</Button>
			 </AlertDescription>
		</Alert>
	)
}
