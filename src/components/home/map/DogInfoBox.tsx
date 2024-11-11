import { Dog } from "@/types/userInfo";
import Image from "next/image";
import React, { useEffect } from "react";
import { useUserHome } from "../UserHomeProvider";

interface DogInfoBoxProps {
  currDogInfo: Dog | null;
}

const DogInfoBox: React.FC<DogInfoBoxProps> = ({ currDogInfo }) => {
  if (!currDogInfo) return null;

  const { setIsBottomOpen } = useUserHome();
  const { name, age, breed, gender, fixedStatus } = currDogInfo;

  return (
    <div className="absolute bottom-0 z-50 w-[100%] h-[30%] bg-beige shadow-xl p-4 rounded-t-xl flex justify-center items-center">
      <div className="w-full">
        <div className="w-full">
          <ul className="text-lg text-brown font-semibold space-y-3 text-center">
            <li className="text-xl font-bold">{name}</li>
            <li>
              {age}살 {breed} {gender === "male" ? "왕자님" : "공주님"} 🐶
            </li>
            <li>중성화 여부 - {fixedStatus ? "YES" : "NO"}</li>
          </ul>
          <div
            className="absolute right-2 top-2"
            onClick={() => setIsBottomOpen(false)}
          >
            <Image
              src="/images/icon/close_icon.png"
              width={30}
              height={30}
              alt="closeBtn"
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <button className="text-md font-semibold px-4 py-2 text-beige bg-brown rounded-lg">
            같이 산책하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DogInfoBox;
