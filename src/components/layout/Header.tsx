import Image from "next/image";

interface HeaderProps {
  setIsSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setIsSideOpen }) => {
  return (
    <header className="w-full">
      <nav className="bg-beige flex items-center py-4 justify-between">
        {/* 로고 */}
        <div className="flex justify-center w-full pl-4">
          <Image
            src="/images/logo_img.png"
            alt="Logo"
            objectFit="fill"
            width={160}
            height={30}
          />
        </div>

        {/* 햄버거 아이콘 */}
        <div
          className="flex items-center justify-end pr-4"
          onClick={() => setIsSideOpen(true)}
        >
          <Image
            src="/images/icon/hambuger_icon.svg"
            alt="hambuger_icon"
            objectFit="fill"
            width={25}
            height={20}
          />
        </div>
      </nav>
    </header>
  );
};
export default Header;
