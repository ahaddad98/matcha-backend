import dotenv from "dotenv";
import express from "express";
import GlobalRouter from "./routes/global.router";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.static("upload"));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api", GlobalRouter());

const PORT = process.env.NODE_DOCKER_PORT || 4000;
app.listen(PORT, console.log("Server don start for port: " + PORT));

/*
SELECT *
FROM users
WHERE acos(sin(:lat)*sin(radians(latitude)) + cos(:lat)*cos(radians(latitude))*cos(radians(longitude)-:lng)) * 6371 <= 1;
*/
