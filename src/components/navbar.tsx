import Link from "next/link";
import { JSX, SVGProps } from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "./ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b-2 shadow-md">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <GavelIcon className="h-6 w-6" />
        <span className="sr-only">Auction House</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          href="/items"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          All Auctions
        </Link>
        <Link
          href="/auction/create"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Create Auctions
        </Link>
        {!(await isAuthenticated()) ? (
          <>
            <RegisterLink>
              <Button>Register</Button>
            </RegisterLink>
            <LoginLink>
              <Button variant="secondary">Login</Button>
            </LoginLink>
          </>
        ) : (
          <LogoutLink>
            <Button>Logout</Button>
          </LogoutLink>
        )}
      </nav>
    </header>
  );
}

function GavelIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" />
      <path d="m16 16 6-6" />
      <path d="m8 8 6-6" />
      <path d="m9 7 8 8" />
      <path d="m21 11-8-8" />
    </svg>
  );
}
