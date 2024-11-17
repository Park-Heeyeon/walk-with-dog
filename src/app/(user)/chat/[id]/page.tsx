"use client";

import { socket } from "@/socket";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MessageForm from "./MessageForm";
import SendMessage from "./SendMessage";
import { MessageType } from "@/types/messageType";
import ReceiveMessage from "./ReceiveMessage";

export default function ChatRoom() {
  const { id } = useParams(); // URL 경로 파라미터 가져오기
  const { data: session } = useSession();
  const router = useRouter();

  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    console.log("Socket connected:", socket.connected); // 소켓 연결 상태 확인

    if (!id || !session?.user?.id) return;

    const parsedId = parseInt(Array.isArray(id) ? id[0] : id);
    if (isNaN(parsedId)) return;

    const newRoomId = [parsedId, session?.user.id]
      .sort((a, b) => a - b)
      .join("-");
    setRoomId(newRoomId);

    if (!socket.connected) {
      console.log("Connecting to socket...");
      socket.connect();
    }

    socket.emit("join", { roomId: newRoomId });
    console.log(`Joined room: ${newRoomId}`);

    const handleChatMessage = ({
      sendId,
      nickname,
      message,
      timestamp,
      roomId: receivedRoomId,
    }: MessageType & { roomId: string }) => {
      console.log(`Message received in room ${receivedRoomId}`); // 받은 메시지 로그
      if (receivedRoomId === newRoomId) {
        console.log("gmldus durlfmfxk!!");
        setMessages((prevMessages) => [
          ...prevMessages,
          { sendId, nickname, message, timestamp },
        ]);
      }
    };

    socket.on("message", handleChatMessage);

    return () => {
      socket.off("message", handleChatMessage);
    };
  }, [id, session?.user?.id]);

  return (
    <div className="flex flex-col justify-between w-full h-screen">
      {/* 헤더 부분 */}
      <div className="bg-[#DBCEBC] text-white w-full h-16 flex items-center justify-between px-4 shadow-md">
        <div>
          <button
            className="bg-transparent font-semibold text-beige py-2 text-4xl"
            onClick={() => router.push("/")}
          >
            &lt;
          </button>
        </div>
      </div>

      {/* 채팅 내역 영역 */}
      <div className="flex-grow overflow-y-auto p-4 bg-[#f5f0e1] shadow-inner">
        <div className="flex flex-col space-y-2">
          {/* 실제 채팅 메시지 리스트 */}
          {messages.map((msg, index) => {
            const MessageComponent =
              parseInt(msg.sendId) === session?.user?.id
                ? SendMessage
                : ReceiveMessage;
            return <MessageComponent key={index} msgInfo={msg} />;
          })}
        </div>
      </div>

      {/* 입력 및 전송 버튼 영역 */}
      <MessageForm roomId={roomId} />
    </div>
  );
}
