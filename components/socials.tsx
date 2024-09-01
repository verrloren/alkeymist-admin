"use client";

import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

import { useRouter } from "next/navigation";

export function Socials() {

	const router = useRouter();

  return (
    <>
      <GitHubLogoIcon onClick={() => router.push('https://github.com/verrloren')} className="size-6 cursor-pointer font-light text-neutral-700 dark:text-neutral-600 transition-colors hover:text-neutral-800 dark:hover:text-neutral-500" />
      <TwitterLogoIcon className="size-6 cursor-pointer font-light text-neutral-700 dark:text-neutral-600 transition-colors hover:text-neutral-800 dark:hover:text-neutral-500" />
      <InstagramLogoIcon className="size-6 cursor-pointer font-light text-neutral-700 dark:text-neutral-600 transition-colors hover:text-neutral-800 dark:hover:text-neutral-500" />
      <DiscordLogoIcon className="size-6 cursor-pointer font-light text-neutral-700 dark:text-neutral-600 transition-colors hover:text-neutral-800 dark:hover:text-neutral-500" />

    </>
  );
}
