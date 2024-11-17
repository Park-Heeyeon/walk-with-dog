import { MessageType } from "@/types/messageType";

type SendMessageProps = {
  msgInfo: MessageType;
};

const SendMessage = ({ msgInfo }: SendMessageProps) => {
  const { message, timestamp } = msgInfo;
  return (
    <div className="p-3 rounded-md text-gray-700 max-w-[80%] bg-[#ddd7cb] self-end">
      <div>{message}</div>
      <div className="text-xs text-gray-500">{timestamp}</div>
    </div>
  );
};
export default SendMessage;
