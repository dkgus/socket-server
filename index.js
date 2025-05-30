require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const passport = require("passport");

const app = express();
app.use(cors());
app.use(passport.initialize());
require("./config/passport")();
app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("서버가 정상적으로 작동 중입니다.");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ A user connected: ", socket.id);

  socket.on("send-message", (message) => {
    io.emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected: ", socket.id);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
