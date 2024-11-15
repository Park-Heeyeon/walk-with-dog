import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client"; // Prisma 클라이언트 import

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const prisma = new PrismaClient(); // Prisma 클라이언트 인스턴스 생성

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  let users = {};

  function getUsersArray() {
    return Object.keys(users).map((id) => ({ id, nickname: users[id] }));
  }

  io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("join", async ({ id }) => {
      console.log(`join chat ${id}`);

      // id가 숫자여야 한다면 숫자로 변환
      const userId = parseInt(id, 10); // id가 문자열일 경우 숫자로 변환

      // Prisma를 사용하여 사용자 정보를 가져오기
      try {
        const user = await prisma.user.findUnique({
          where: { id: userId }, // id는 String으로 사용
        });

        if (user) {
          console.log(`User nickname: ${user.nickname}`);

          if (!users[socket.id]) {
            io.emit("chat message", `${user.nickname}님이 입장하셨습니다.`);
            users[socket.id] = user.nickname; // 닉네임을 저장
          }

          io.emit("users", getUsersArray());
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    });

    socket.on("chat message", (msg) => {
      console.log("message: " + msg);
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      const nickName = users[socket.id];
      if (nickName) {
        io.emit("chat message", `${nickName}님이 퇴장하셨습니다.`);
        delete users[socket.id];
        io.emit("users", getUsersArray());
      }
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
