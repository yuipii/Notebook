import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { getNotes, setNotes } from "./notesStore.js";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // отправляем текущие заметки
  socket.emit("notes:update", getNotes());

  // обновление заметок
  socket.on("notes:change", (newNotes) => {
    setNotes(newNotes);
    io.emit("notes:update", newNotes); // всем клиентам
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
