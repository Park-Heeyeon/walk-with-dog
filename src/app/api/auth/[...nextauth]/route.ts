import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        userId: {
          label: "Id",
          type: "text",
          placeholder: "아이디를 입력해주세요",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "비밀번호를 입력해주세요",
        },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: credentials?.userId,
            password: credentials?.password,
          }),
        });

        const user = await res.json();
        console.log("user: ", user);

        return user ? user : null;
      },
    }),

    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),

    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],

  /**
   * callback은 로그인 폼에서 유저네임과 패스워드를 넣고 제출하기(submit) 버튼을 눌렀을 때, NextAuth의 authorize 함수에서
   * 로그인 로직을 수행하고 나서 마지막으로 실행되는 부분
   */
  callbacks: {
    async jwt({ token, user }) {
      console.log("ttoken:", token, "user", user);
      return { ...token, ...user };
    },

    async session({ session, token }) {
      console.log("session:", session, "token", token);
      session.user = token as any;
      return session;
    },
  },

  // pages: {
  //   signIn: "/login",
  // },
});

export { handler as GET, handler as POST };
