import { Logo } from "@/components/navbar/logo";
import UserButton from "../user-button";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { RegisterButton } from "../auth/register-button";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";

import Container from "@/components/container";
import { HeaderAvatar } from "./header-avatar";
import MainNav from "@/components/navbar/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ModeToggle } from "../mode-toggle";
import { MenuNavbar } from "./menu-navbar";
import { ProfileImg } from "./profile-img";
// import { ThemeToggle } from "../theme-toggle"

export default async function Header() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/login");
  }

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <header
      className="w-full dark:bg-darker sticky flex justify-center 
			border-b border-neutral-200 dark:border-neutral-900 bg-white h-16"
    >
      <Container>
        <div className="w-full h-full flex items-center justify-between">
          {/* <div className="flex items-center justify-between w-full 
			max-w-6xl px-4 mx-auto sm:px-6"> */}

          {/* DESKTOP */}
          <div className="w-full hidden md:flex flex-row items-center justify-between">
            <Logo />
            <MainNav />
            <ProfileImg session={session} />
          </div>

          {/* MOBILE */}
          <div className="w-full relative flex h-18 items-center justify-between px-4 sm:px-6 md:hidden lg:px-8 xl:px-0">
            <Logo />
            <div className="flex flex-row items-center">
              <ProfileImg session={session} />
              <MenuNavbar />
            </div>
          </div>

          {/* 
          {session ? (
            <div className="flex items-center">
              <HeaderAvatar src={session.user?.image} />
            </div>
          ) : (
            <div className="flex gap-4">
              <LoginButton>
                <Button variant="outline">Login</Button>
              </LoginButton>
              <RegisterButton>
                <Button variant="default">Sign up</Button>
              </RegisterButton>
            </div>
          )} */}
        </div>
      </Container>
      {/* <ThemeToggle /> */}
    </header>
  );
}
