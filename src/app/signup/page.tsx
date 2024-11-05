"use client";

import DogProfile from "@/components/signup/DogProfile";
import UserProfile from "@/components/signup/UserProfile";
import { useState } from "react";

const SignupPage: React.FC = () => {
  return (
    <div className="w-[100%] m-auto">
      {/* <UserProfile /> */}
      <DogProfile />
    </div>
  );
};
export default SignupPage;
