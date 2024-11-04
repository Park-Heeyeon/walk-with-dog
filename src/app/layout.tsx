import Providers from "@/components/Provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <head>
        <script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=746ad81f7878d39d179ccb52ee0c90fd&autoload=false`}
        ></script>
      </head> */}
      <body>
        <Providers>
          <div className="flex flex-col items-center justify-center mx-auto w-full h-screen max-w-sm sm:max-w-sm md:max-w-lg relative bg-[#fffcf3]">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
