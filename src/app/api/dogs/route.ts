import prisma from "@/lib/prisma";
import { extractDistrict } from "@/utils/extractDistrict";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const userId = searchParams.get("userId");

  if (!address) return new Response("Address not provided", { status: 400 });
  if (!userId) return new Response("UserId not provided", { status: 400 });

  // 주소에서 구 단위 추출
  const district = extractDistrict(address);
  if (!district)
    return new Response("District not found in address", { status: 400 });

  const neighborDogs = await prisma.user.findMany({
    where: {
      address: {
        contains: district, // '구' 이름이 포함된 주소 필터링 및 현재 로그인된 사용자는 필터링
      },
      userId: {
        not: userId,
      },
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
