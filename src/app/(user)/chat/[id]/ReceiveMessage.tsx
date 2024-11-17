import { MessageType } from "@/types/messageType";

type ReceiveMessageProps = {
  msgInfo: MessageType;
};

const ReceiveMessage = ({ msgInfo }: ReceiveMessageProps) => {
  const { nickname, message, timestamp } = msgInfo;
  return (
    <div className="p-3 rounded-md text-gray-700 max-w-[80%] bg-[#e9d4c3] self-start">
      <div className="font-semibold">{nickname}</div>
      <div>{message}</div>
      <div className="text-xs text-gray-500">{timestamp}</div>
    </div>
  );
};
export default ReceiveMessage;
