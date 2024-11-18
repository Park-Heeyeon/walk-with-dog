import { MessageType } from "@/types/messageType";

type SendMessageProps = {
  msgInfo: MessageType;
};

const SendMessage = ({ msgInfo }: SendMessageProps) => {
  const { message, timestamp } = msgInfo;
  // 시간만 추출 (시:분)
  const formatTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="p-3 rounded-md text-gray-700 max-w-[80%] bg-[#ddd7cb] self-end">
      <div className="text-midBrown font-semibold">{message}</div>
      <div className="text-xs text-depBrown">{formatTime}</div>
    </div>
  );
};
export default SendMessage;
