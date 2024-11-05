import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json()) as { userId: string };
  const { userId } = body;

  if (!userId) {
    return new Response(JSON.stringify({ message: "아이디를 입력해주세요" }), {
      status: 400,
    });
  }

  const existingUserId = await prisma.user.findUnique({ where: { userId } });

  if (existingUserId) {
    return new Response(JSON.stringify({ message: "중복된 아이디입니다." }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({ message: "사용 가능한 아이디입니다." }),
    { status: 200 }
  );
}
