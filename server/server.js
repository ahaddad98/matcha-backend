import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import GlobalRouter from "./routes/global.router.js";
import ErrorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.static("upload"));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api", GlobalRouter());
app.use(ErrorMiddleware);

const PORT = process.env.NODE_DOCKER_PORT || 4000;
app.listen(PORT, console.log("Server don start for port: " + PORT));

/*
SELECT *
FROM users
WHERE acos(sin(:lat)*sin(radians(latitude)) + cos(:lat)*cos(radians(latitude))*cos(radians(longitude)-:lng)) * 6371 <= 1;
*/
