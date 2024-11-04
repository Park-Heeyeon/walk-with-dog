"use client";

import DogFormLayout from "@/components/signup/DogFormLayout";
import UserFormLayout from "@/components/signup/UserFormLayout";
import { useState } from "react";

const SignupPage: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div>
      {step === 1 ? <UserFormLayout /> : step === 2 ? <DogFormLayout /> : null}
    </div>
  );
};
export default SignupPage;
