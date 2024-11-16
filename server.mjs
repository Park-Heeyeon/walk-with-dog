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

  io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("join", ({ id }) => {
      console.log(`${id}가 채팅방 화면에 접속했습니다.`);
    });

    socket.on("chat message", ({ sendId, msg }) => {
      console.log("sendId:", sendId, "message: " + msg);
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
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
