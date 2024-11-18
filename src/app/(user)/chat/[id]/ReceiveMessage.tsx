import { MessageType } from "@/types/messageType";

type ReceiveMessageProps = {
  msgInfo: MessageType;
};

const ReceiveMessage = ({ msgInfo }: ReceiveMessageProps) => {
  const { nickname, message, timestamp } = msgInfo;

  // 시간만 추출 (시:분)
  const formatTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col items-start mb-2">
      <div className="font-bold text-depBrown">{nickname}</div>
      <div className="p-3 rounded-md bg-[#e9d4c3] inline-block">
        <div className="text-brown font-semibold">{message}</div>
        <div className="text-xs text-midBrown text-right">{formatTime}</div>
      </div>
    </div>
  );
};

export default ReceiveMessage;
