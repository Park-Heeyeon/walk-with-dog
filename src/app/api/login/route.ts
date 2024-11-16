import { signJwtAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
  userId: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      userId: body.userId,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPwd } = user;

    const accessToken = signJwtAccessToken(userWithoutPwd);
    const result = {
      ...userWithoutPwd,
      accessToken,
    };

    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}
