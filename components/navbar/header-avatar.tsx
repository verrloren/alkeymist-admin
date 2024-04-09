import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutButton } from "../auth/logout-button";

interface HeaderAvatarProps {
	src?: string | null | undefined;
}

export function HeaderAvatar({ src }: HeaderAvatarProps) {

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage
						className="cursor-pointer"
						src={src || '/images/default-avatar.png'}
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem>Profile</DropdownMenuItem>

				<DropdownMenuItem>Billing</DropdownMenuItem>

				<DropdownMenuItem>Team</DropdownMenuItem>

				<DropdownMenuItem>
					<LogoutButton />
				</DropdownMenuItem>

			</DropdownMenuContent>
		</DropdownMenu>
	)
}
