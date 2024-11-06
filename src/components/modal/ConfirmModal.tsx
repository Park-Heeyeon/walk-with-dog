import useModalStore from "@/hooks/modalStore";

interface ConfirmModalProps {
  msg: string;
  onConfirm?: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ msg, onConfirm }) => {
  const { close } = useModalStore();

  const onClickConfirmBtn = () => {
    close();
    if (onConfirm) onConfirm();
  };

  return (
    <div className="text-center bg-beige p-8 rounded-lg shadow-lg">
      {/* <h3 className="text-depBrown text-md font-semibold mb-2">확인</h3> */}
      <p className="text-brown font-semibold text-md mb-3">{msg}</p>
      <button
        className="px-4 py-1 bg-[#C6A16C] text-white rounded text-sm hover:bg-darkBrown transition duration-200"
        onClick={onClickConfirmBtn}
      >
        확인
      </button>
    </div>
  );
};
export default ConfirmModal;
