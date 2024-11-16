"use client";

import { socket } from "@/socket";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ChatRoom() {
  const { id } = useParams(); // URL 경로 파라미터 가져오기
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.userId && socket.connected) {
      console.log("연결완료!");
      socket.emit("join", { id: session.user.userId });

      // 서버에서 보내는 채팅 메시지 받기
      // socket.on("chat message", (msg) => {
      //   setMessages((prevMessages) => [...prevMessages, msg]);
      // });
    }

    // 컴포넌트가 언마운트될 때 소켓 리스너 정리
    return () => {
      socket.off("chat message");
    };
  }, [session?.user?.userId]);

  return (
    <div className="flex flex-col justify-between w-full h-screen">
      {/* 채팅 내역 영역 */}
      <div className="flex-grow overflow-y-auto p-4 bg-[#f5f0e1] shadow-inner">
        <div className="space-y-2">
          {/* 예시 채팅 메시지 */}
          <div className="p-3 rounded-md bg-[#e9d4c3] text-gray-700 max-w-[80%] self-start">
            다른 유저 메시지 예시
          </div>
          <div className="p-3 rounded-md bg-[#ddd7cb] text-gray-700 max-w-[80%] self-end">
            본인 메시지 예시
          </div>
          {/* 실제 메시지 리스트를 여기에 추가 */}
        </div>
      </div>

      {/* 입력 및 전송 버튼 영역 */}
      <div className="flex items-center justify-between p-4 bg-beige">
        <form action=""></form>
        <textarea className="flex-grow p-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-[#f5f0e1] text-gray-700" />
        <button className="ml-2 p-3 rounded-r-md font-semibold bg-[#f0ece1] text-[#d9cdbf]">
          전송
        </button>
      </div>
    </div>
  );
}
