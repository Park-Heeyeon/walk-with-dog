/**
 * 로그인한 상태만 볼 수 있는 페이지를 계속 추가할 수 있습니다.
 */
// app/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // 요청을 조건에 따라 검사하고 처리합니다.
  const { pathname } = request.nextUrl;

  // 특정 경로에 대해 로직을 적용
  if (pathname.startsWith("/protected")) {
    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next(); // 요청을 계속 진행
}
