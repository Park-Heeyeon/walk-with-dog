import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ConfirmModal from "../modal/ConfirmModal";
import useModalStore from "@/hooks/modalStore";
import { useUserHome } from "@/app/(user)/home/UserHomeProvider";

const Sidebar: React.FC = () => {
  const { isSideOpen, setIsSideOpen } = useUserHome();
  const { open } = useModalStore();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const result = await signOut({
        redirect: false, // 리디렉션을 방지
      });
      router.push("/"); // 홈으로 이동
    } catch (error) {
      open(ConfirmModal, { msg: "로그아웃 중 오류가 발생했습니다." });
    }
  };

  return (
    <div>
      {/* 삼항 연산자를 사용하여 isSideOpen이 true일 때 오버레이 표시 */}
      {isSideOpen ? (
        <div
          className="overlay fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSideOpen(false)}
        />
      ) : null}
      <div
        className={`absolute z-50 fixed top-0 right-0 w-[50%] h-full bg-beige transition-all duration-300 ease-in-out ${
          isSideOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="absolute top-2 right-3 cursor-pointer"
          onClick={() => setIsSideOpen(false)}
        >
          <Image
            src="/images/icon/close_icon.png"
            alt="closeBtn"
            width={30}
            height={30}
          />
        </div>
        <ul className="mt-12 ml-4 space-y-3 text-brown font-semibold text-lg">
          <li onClick={handleSignOut}>로그아웃</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
