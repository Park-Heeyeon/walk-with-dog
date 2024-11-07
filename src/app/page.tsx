"use client";

import GuestHome from "@/components/home/GuestHome";
import UserHome from "@/components/home/UserHome";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("희연 session", session);
  }, [session]);

  // 세션 상태가 "loading"일 때는 로딩 중임을 알리기 위해 아무것도 렌더링하지 않거나 로딩 스피너를 표시
  if (status === "loading") {
    return <div>Loading...</div>; // 또는 로딩 스피너 컴포넌트를 추가해도 좋습니다.
  }

  return (
    <>{session?.user ? <UserHome /> : <GuestHome />}</>
  );
}
