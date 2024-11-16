import Image from "next/image";
import Link from "next/link";

const GuestHome: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <Image
        src="/images/main_img.png"
        alt="Main Image"
        fill
        sizes="(max-width: 1024px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute top-1/3 inset-0 flex flex-col items-center space-y-4 md:space-y-6">
        <Link
          href="/login"
          className="bg-beige text-brown text-center text-md md:text-xl font-semibold rounded-full px-8 md:px-12 py-2 md:py-3"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-depBeige text-brown text-center text-md md:text-xl font-semibold rounded-full px-8 md:px-12 py-2 md:py-3"
        >
          SignUp
        </Link>
      </div>
    </div>
  );
};
export default GuestHome;
