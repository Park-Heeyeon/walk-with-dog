"use client";

import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/form";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import useModalStore from "@/hooks/modalStore";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { socket } from "@/socket";

interface LoginFormType {
  userId: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { open } = useModalStore();
  const { data: session } = useSession();

  const form = useForm({
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const handleOnSubmit = async (data: LoginFormType) => {
    const { userId, password } = data;

    if (!userId) {
      open(ConfirmModal, { msg: "아이디를 입력해주세요" });
      return;
    }

    if (!password) {
      open(ConfirmModal, { msg: "비밀번호를 입력해주세요" });
      return;
    }

    try {
      const result = await signIn("credentials", {
        userId,
        password,
        redirect: false, // 리디렉션을 방지
      });

      if (result?.error) {
        open(ConfirmModal, { msg: "아이디 또는 비밀번호가 틀렸습니다." });
      } else {
        // 로그인 성공 시 처리
        router.push("/"); // 홈으로 이동
      }
    } catch (error) {
      open(ConfirmModal, { msg: "로그인 중 오류가 발생했습니다." });
    }
  };

  const onClickSignupBtn = () => {
    router.push("/signup");
  };

  const handleKakao = async () => {
    await signIn("kakao", {
      redirect: false,
    });
  };

  const handleNaver = async () => {
    await signIn("naver", {
      redirect: false,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="w-[80%] space-y-3 md:space-y-4"
      >
        <h2 className="text-center font-bold text-depBrown text-xl md:text-3xl">
          Welcome
        </h2>
        {/** 아이디 */}
        <InputField<LoginFormType>
          control={form.control}
          name="userId"
          placeholder="ID"
          className="md:text-xl md:py-6"
        />
        {/** 비밀번호 */}
        <InputField<LoginFormType>
          control={form.control}
          type="password"
          name="password"
          placeholder="PASSWORD"
          className="md:text-xl md:py-6"
        />
        <div className="btn-box space-y-2 md:space-y-3">
          <Button
            type="submit"
            text="Submit"
            className="w-full h-auto py-2 md:py-4 md:text-xl bg-[#A07840] text-white"
          />
          <Button
            text="Sign Up"
            className="w-full h-auto py-2 md:py-4 md:text-xl bg-[#E0C7A3] text-white"
            clickEvent={onClickSignupBtn}
          />
          <div className="w-full flex justify-center space-x-2">
            <button
              className="w-[40%] transform rounded-md bg-[#dac96d] px-1 py-2 md:px-4 md:py-4 md:text-xl tracking-wide text-white transition-colors duration-200"
              onClick={handleKakao}
            >
              Kakao Login
            </button>
            <button
              className="w-[40%] transform rounded-md bg-[#61cb5a] px-1 py-2 md:px-4 md:py-4 md:text-xl tracking-wide text-white transition-colors duration-200"
              onClick={handleNaver}
            >
              Naver Login
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default LoginPage;
