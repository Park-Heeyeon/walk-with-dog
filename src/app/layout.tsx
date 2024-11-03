import Providers from "@/components/Provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col items-center justify-center mx-auto w-full h-screen max-w-xs sm:max-w-sm md:max-w-lg relative">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
