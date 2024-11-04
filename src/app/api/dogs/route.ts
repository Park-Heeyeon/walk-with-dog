import prisma from "@/app/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  const neighborDogs = await prisma.user.findMany({
    where: {
      address,
    },
    select: {
      id: true, // 필요한 필드 선택
      userId: true,
      nickname: true,
      address: true,
      dogInfo: {
        select: {
          id: true, // 강아지 ID
          name: true, // 강아지 이름
          age: true, // 강아지 나이
          breed: true, // 강아지 품종
          gender: true, // 강아지 성별
          fixedStatus: true, // 중성화 여부
        },
      },
    },
  });

  return new Response(JSON.stringify(neighborDogs), {
    headers: { "Content-Type": "application/json" },
  });
}
