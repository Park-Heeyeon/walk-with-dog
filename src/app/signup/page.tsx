"use client";

import Funnel from "@/components/funnel/Funnel";
import DogProfile from "@/components/signup/DogProfile";
import UserProfile from "@/components/signup/UserProfile";
import useFunnel from "@/hooks/funnelStore";
import { Dog, User } from "@/types/UserInfoType";
import { useState } from "react";

const steps = ["UserProfile", "DogProfile"];

export interface FormDataType {
  userInfo?: User;
  dogInfo?: Dog;
}

const SignupPage: React.FC = () => {
  const { step, onNextStep, onPrevStep } = useFunnel({ steps });
  const [formData, setFormData] = useState<FormDataType>({
    userInfo: undefined,
    dogInfo: undefined,
  });

  return (
    <Funnel step={step}>
      <Funnel.Step name="UserProfile">
        <UserProfile
          formData={formData}
          setFormData={setFormData}
          onNext={onNextStep}
        />
      </Funnel.Step>
      <Funnel.Step name="DogProfile">
        <DogProfile
          formData={formData}
          setFormData={setFormData}
          onPrev={onPrevStep}
        />
      </Funnel.Step>
    </Funnel>
  );
};
export default SignupPage;
