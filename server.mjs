import { createServer } from "node:http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const port = 4000;

// Prisma 클라이언트 인스턴스 생성
const prisma = new PrismaClient();

const httpServer = createServer();

// Socket.IO 설정
const io = new Server(httpServer, {
  transports: ["websocket"], // WebSocket 전송만 사용하도록 설정
  cors: {
    origin: "*", // 모든 클라이언트 허용 (개발 환경)
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("join", async ({ roomId }) => {
    socket.join(roomId);
    console.log(`${roomId} 채팅방에 참여했습니다.`);

    // 이전 채팅 내역 조회
    try {
      const previousMessages = await prisma.chat.findMany({
        where: { roomId },
        orderBy: { timestamp: "asc" },
      });
      // 이전 메시지 목록을 전송
      socket.emit("previousMessages", previousMessages);
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  });

  socket.on("message", async ({ roomId, messageData }) => {
    const { sendId, message, timestamp } = messageData;

    console.log("Received message:", messageData); // 메시지가 들어오는지 확인

    // 사용자 정보를 데이터베이스에서 가져옴
    const user = await prisma.user.findUnique({
      where: { id: sendId },
      select: { nickname: true },
    });

    if (user) {
      const messageRecord = {
        roomId,
        sendId,
        nickname: user.nickname,
        message,
        timestamp,
      };

      // 메시지 데이터를 DB에 저장
      try {
        await prisma.chat.create({ data: messageRecord });
        console.log("Message saved to DB:", messageRecord);

        // 저장된 메시지를 채팅방에 전송
        io.to(roomId).emit("message", messageRecord);
      } catch (error) {
        console.error("Failed to save message:", error);
      }
    } else {
      console.log(`User ${sendId} not found`);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// 서버 시작
httpServer.listen(port, () => {
  console.log(`Socket.IO server listening on port ${port}!`);
});

// Prisma 연결 해제 설정
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
