import Providers from "@/components/Provider";
import "./globals.css";
import ModalContainer from "@/components/modal/ModalContainer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col items-center justify-center mx-auto w-full h-screen max-w-sm sm:max-w-sm md:max-w-lg relative bg-[#fffcf3]">
            {children}
          </div>
          <ModalContainer />
        </Providers>
      </body>
    </html>
  );
}
