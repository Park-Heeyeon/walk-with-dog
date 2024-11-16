"use client";

import { Loadingbar } from "@/components/common/Loadingbar";
import GuestHome from "@/app/(guest)/home/GuestHome";
import { useSession } from "next-auth/react";
import { UserHomeProvider } from "./(user)/home/UserHomeProvider";
import UserHome from "./(user)/home/UserHome";

export default function Home() {
  const { data: session, status } = useSession();

  // 세션 상태가 "loading"일 때는 로딩 중임을 알리기 위해 아무것도 렌더링하지 않거나 로딩 스피너를 표시
  if (status === "loading") {
    return <Loadingbar />;
  }

  return (
    <>
      {session?.user ? (
        <UserHomeProvider>
          <UserHome />
        </UserHomeProvider>
      ) : (
        <GuestHome />
      )}
    </>
  );
}
