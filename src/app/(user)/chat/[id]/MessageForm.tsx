import { socket } from "@/socket";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";

type MessageFormProps = {
  roomId: string;
};

const MessageForm = ({ roomId }: MessageFormProps) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState<string>("");

  // 메시지 상태 업데이트 함수
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // 메시지 제출 처리 함수
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage(""); // 메시지 전송 후 입력 필드 비우기

      // 날짜 및 시간을 ISO 8601 형식으로 설정
      const timestamp = formatTimestamp(new Date());

      const messageData = {
        sendId: session?.user?.id,
        message,
        timestamp,
      };

      // 서버로 메시지 전송
      socket.emit("message", { roomId, messageData });
    }
  };

  // timestamp 포맷팅 함수 (ISO 8601 형식으로 변환)
  const formatTimestamp = (date: Date) => {
    return date.toISOString(); // ISO 8601 형식으로 반환
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between p-4 bg-[#DBCEBC]">
        <textarea
          value={message}
          onChange={handleChange}
          className="flex-grow p-3 rounded-l-md border border-beige focus:outline-none focus:ring-2 focus:ring-[#DBCEBC] bg-beige text-gray-700"
        />
        <button
          type="submit"
          className={`ml-2 p-3 rounded-r-md font-semibold ${
            message.length > 0
              ? "bg-[#c6a97d] text-white"
              : "bg-[#f0ece1] text-[#d9cdbf]"
          }`}
        >
          전송
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
