import prisma from "@/app/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
  nickname: string;
  userId: string;
  password: string;
  address: string;
  dogInfo: Dog;
}

interface Dog {
  name: string;
  age: string;
  breed: string;
  gender: string;
  fixedStatus: boolean;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    console.log("Received body:", body);

    const user = await prisma.user.create({
      data: {
        nickname: body.nickname,
        userId: body.userId,
        password: await bcrypt.hash(body.password, 10),
        address: body.address,
        dogInfo: {
          create: {
            name: body.dogInfo.name,
            age: body.dogInfo.age,
            breed: body.dogInfo.breed,
            gender: body.dogInfo.gender,
            fixedStatus: body.dogInfo.fixedStatus,
          },
        },
      },
    });

    const { password, ...result } = user;
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error); // Error 타입으로 단언
    console.error("Error creating user:", errorMessage);

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: errorMessage,
      }),
      { status: 500 }
    );
  }
}
