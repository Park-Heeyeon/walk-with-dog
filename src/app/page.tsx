import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full h-screen max-w-xs sm:max-w-sm md:max-w-lg relative">
      <div className="relative w-full h-full">
        <Image
          src="/images/main_img.png"
          alt="Main Image"
          fill
          sizes="(max-width: 1024px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-1/3 inset-0 flex flex-col items-center space-y-4 md:space-y-6">
          <Button className="bg-[#f5f0e1] text-[#8B4513] text-md md:text-xl font-semibold rounded-full w-1/2 py-3 md:py-7">
            Login
          </Button>
          <Button className="bg-[#e6d1b3] text-[#8B4513] text-md md:text-xl font-semibold rounded-full w-1/2 py-3 md:py-7">
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
}
