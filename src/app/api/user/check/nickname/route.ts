import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { nickname: string };
    const { nickname } = body;

    if (!nickname) {
      return new Response(
        JSON.stringify({ message: "닉네임을 입력해주세요." }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({ where: { nickname } });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "중복된 닉네임입니다." }), {
        status: 401,
      });
    }

    return new Response(
      JSON.stringify({ message: "사용 가능한 닉네임입니다." }),
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: errorMsg,
      })
    );
  }
}
