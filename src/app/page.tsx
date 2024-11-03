"use client";

import GuestHome from "@/components/home/GuestHome";
import UserHome from "@/components/home/UserHome";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return <>{session?.user ? <UserHome /> : <GuestHome />}</>;
}
