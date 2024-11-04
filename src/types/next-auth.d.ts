// src/@types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number; // ID는 number 타입으로 정의
      userId: string;
      name: string;
      address: string;
      accessToken: string;
      provider?: string; // provider는 선택적 속성으로 정의
    };
  }
}
