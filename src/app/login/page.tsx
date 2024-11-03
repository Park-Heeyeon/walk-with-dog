"use client";

import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/form";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

interface LoginFormType {
  userId: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    async () => {
      const res: any = await getProviders();
      console.log(res);
      setProviders(res);
    };
  }, []);

  const form = useForm({
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const handleOnSubmit = async (data: LoginFormType) => {
    const { userId, password } = data;

    if (!userId || !password) {
      console.log("희연 아이디를 입력해주세요.");
      return;
    }

    await signIn("credentials", {
      userId,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  const onClickSignupBtn = () => {
    // router.push("/signup");
  };

  const handleKakao = async () => {
    await signIn("kakao", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleNaver = async () => {
    await signIn("naver", {
      redirect: true,
      callbackUrl: "/",
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
            className="w-full h-auto py-2 md:py-4 md:text-xl bg-beige text-brown"
          />
          <Button
            text="Sign Up"
            className="w-full h-auto py-2 md:py-4 md:text-xl bg-depBeige text-brown"
            clickEvent={onClickSignupBtn}
          />
          <div className="w-full flex justify-center space-x-2">
            <button
              className="w-[40%] transform rounded-md bg-[#fcdc34] px-1 py-2 md:px-4 md:py-4 md:text-xl tracking-wide text-white transition-colors duration-200"
              onClick={handleKakao}
            >
              Kakao Login
            </button>
            <button
              className="w-[40%] transform rounded-md bg-green-400 px-1 py-2 md:px-4 md:py-4 md:text-xl tracking-wide text-white transition-colors duration-200"
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
