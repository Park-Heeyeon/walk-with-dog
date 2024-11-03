declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      userId: string;
      name: string;
      address: string;
      accessToken: string;
    };
  }
}
