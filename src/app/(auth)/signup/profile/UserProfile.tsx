"use client";

import * as z from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UserFormSchema } from "@/schemas/UserFormSchema";
import DaumPostcode from "react-daum-postcode";
import useModalStore from "@/hooks/modalStore";
import { postApi } from "@/utils/fetchApi";
import { User } from "@/types/userInfoType";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataType } from "../page";
import ConfirmModal from "@/components/modal/ConfirmModal";
import InputField from "@/components/common/InputField";
import { Form } from "@/components/ui/form";

interface UserProfileProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  onNext: () => void;
}

interface AddrSearchModalProps {
  addrComplete: (data: any) => void;
}
const UserProfile: React.FC<UserProfileProps> = ({
  formData,
  setFormData,
  onNext,
}) => {
  const {
    userInfo: { userId = "", password = "", nickname = "", address = "" } = {},
  } = formData || {};

  const [isIdDisabled, setIsIdDisabled] = useState<boolean>(!!userId);
  const [isNicknameDisabled, setIsNicknameDisabled] = useState<boolean>(
    !!nickname
  );

  const { open, close } = useModalStore();

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      userId,
      password,
      nickname,
      address,
    },
  });

  // 아이디 유효성 검증
  const validateUserId = () => {
    const userId = form.getValues("userId");

    const validationResult = UserFormSchema.pick({ userId: true }).safeParse({
      userId,
    });

    // 유효성 검증 실패한 경우
    if (!validationResult.success) {
      const errors = validationResult.error.format();
      if (errors.userId) {
        form.setError("userId", {
          type: "manual",
          message: errors.userId._errors[0],
        });
      }
      return false;
    }
    return true;
  };

  // 닉네임 유효성 검증
  const validateNickname = () => {
    const nickname = form.getValues("nickname");

    const validationResult = UserFormSchema.pick({ nickname: true }).safeParse({
      nickname,
    });

    if (!validationResult.success) {
      const errors = validationResult.error.format();
      if (errors.nickname) {
        form.setError("nickname", {
          type: "manual",
          message: errors.nickname._errors[0],
        });
      }
      return false;
    }
    return true;
  };

  // 아이디 중복 체크 api 호출
  const checkUserId = () => {
    const isValid = validateUserId();

    if (!isValid) return;

    form.clearErrors("userId");

    const userId = form.getValues("userId");

    postApi("/api/user/check/userId", { userId })
      .then((res) => {
        open(ConfirmModal, { msg: res.message });
        setIsIdDisabled(true);
      })
      .catch((error) => {
        open(ConfirmModal, { msg: error.message });
      });
  };

  // 닉네임 중복 체크 api 호출
  const checkNickname = () => {
    const isVisible = validateNickname();

    if (!isVisible) return;

    const nickname = form.getValues("nickname");

    postApi("/api/user/check/nickname", { nickname })
      .then((res) => {
        open(ConfirmModal, { msg: res.message });
        setIsNicknameDisabled(true);
      })
      .catch((error) => {
        open(ConfirmModal, { msg: error.message });
      });
  };

  const addrComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
    }
    form.setValue("address", fullAddress);
    close();
  };

  const handleFormSubmit = (data: User) => {
    setFormData((prev) => ({ ...prev, userInfo: data }));
    onNext();
  };

  return (
    <div className="w-[80%] smax-w-md mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-depBrown mb-6">
            사용자 정보 입력
          </h2>
          <div className="flex w-full">
            <InputField<User>
              control={form.control}
              label="아이디"
              name="userId"
              desc={
                isIdDisabled
                  ? "사용 가능한 아이디입니다."
                  : "영문 숫자 조합 5글자 이상"
              }
              disabled={isIdDisabled}
            />
            <button
              type="button"
              className="h-9 bg-midBeige text-white px-2 text-sm rounded-md transition duration-200 mt-[24px] ml-1"
              onClick={checkUserId}
              disabled={isIdDisabled}
            >
              중복 확인
            </button>
          </div>
          <InputField<User>
            control={form.control}
            label="비밀번호"
            name="password"
            type="password"
            desc="영문 숫자 특수문자 조합 7글자 이상"
          />
          <div className="flex">
            <InputField<User>
              control={form.control}
              label="닉네임"
              name="nickname"
              desc={isNicknameDisabled ? "사용 가능한 닉네임입니다." : ""}
              disabled={isNicknameDisabled}
            />
            <div className="pt-[24px]">
              <button
                type="button"
                className="top-0 h-9 bg-midBeige text-white px-2 text-sm rounded-md transition duration-200 ml-1"
                onClick={checkNickname}
                disabled={isNicknameDisabled}
              >
                중복 확인
              </button>
            </div>
          </div>
          <div className="flex">
            <InputField<User>
              control={form.control}
              label="주소"
              name="address"
              disabled={true}
            />
            <div className="pt-[24px]">
              <button
                type="button"
                className="h-9 bg-midBeige text-white px-2 text-sm rounded-md transition duration-200 ml-1"
                onClick={() => open(AddrSearchModal, { addrComplete })}
              >
                주소 검색
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-midBrown text-white py-2 rounded-md font-semibold transition duration-200"
          >
            다음
          </button>
        </form>
      </Form>
    </div>
  );
};

const AddrSearchModal: React.FC<AddrSearchModalProps> = ({ addrComplete }) => {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h3 className="text-lg font-semibold mb-2">주소 검색</h3>
      <DaumPostcode onComplete={addrComplete} />
    </div>
  );
};

export default UserProfile;
