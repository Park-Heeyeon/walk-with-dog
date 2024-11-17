import { DogFormSchema } from "@/schemas/DogFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";
import { Dog } from "@/types/userInfoType";
import { postApi } from "@/utils/fetchApi";
import useModalStore from "@/hooks/modalStore";
import { useRouter } from "next/navigation";
import { FormDataType } from "../page";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { Form } from "@/components/ui/form";
import InputField from "@/components/common/InputField";
import RadioField from "@/components/common/RadioField";

interface DogProfileProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  onPrev: () => void;
}

const DogProfile: React.FC<DogProfileProps> = ({
  formData,
  setFormData,
  onPrev,
}) => {
  const { open } = useModalStore();
  const router = useRouter();

  const {
    dogInfo: {
      name = "",
      age = "",
      breed = "",
      gender = "male",
      fixedStatus = "false",
    } = {},
  } = formData || {};

  const form = useForm<z.infer<typeof DogFormSchema>>({
    resolver: zodResolver(DogFormSchema),
    defaultValues: {
      name,
      age,
      breed,
      gender,
      fixedStatus,
    },
  });

  const handleOnSubmit = (data: Dog) => {
    // 새로운 데이터를 바로 API에 넘겨주기
    const signupDataForm = {
      ...formData.userInfo,
      dogInfo: {
        ...formData.dogInfo,
        ...data,
        fixedStatus: data.fixedStatus === "true", // fixedStatus를 boolean으로 변환
      },
    };

    postApi("/api/user", signupDataForm)
      .then((res) => {
        console.log("회원가입 성공", res);
        open(ConfirmModal, {
          msg: "회원가입이 완료되었습니다! 🎉",
          onConfirm: () => {
            router.push("/");
          },
        });
      })
      .catch((error) => {
        open(ConfirmModal, { msg: error.message });
      });

    // 상태 업데이트 (회원가입 후에 상태를 갱신)
    setFormData((prev) => ({
      ...prev,
      dogInfo: {
        ...prev.dogInfo,
        ...data,
      },
    }));
  };

  return (
    <div className="w-[80%] smax-w-md mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-depBrown mb-6">
            강아지 정보 입력
          </h2>
          <InputField<Dog> control={form.control} label="이름" name="name" />
          <InputField<Dog>
            control={form.control}
            label="나이"
            type="number"
            name="age"
          />
          <InputField<Dog> control={form.control} label="종류" name="breed" />
          <RadioField<Dog>
            control={form.control}
            label="성별"
            name="gender"
            options={[
              { value: "male", label: "왕자" },
              { value: "female", label: "공주" },
            ]}
          />
          <RadioField<Dog>
            control={form.control}
            label="중성화 여부"
            name="fixedStatus"
            options={[
              { value: "true", label: "예" },
              { value: "false", label: "아니요" },
            ]}
          />
          <div className="flex justify-center space-x-2">
            <button
              type="submit"
              className="flex-grow bg-midBeige text-white py-2 rounded-md font-semibold transition duration-200"
              onClick={onPrev}
            >
              이전
            </button>
            <button
              type="submit"
              className="flex-grow bg-midBrown text-white py-2 rounded-md font-semibold transition duration-200"
            >
              가입
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default DogProfile;
