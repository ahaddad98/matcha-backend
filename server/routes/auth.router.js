import { Router } from "express";
import LoginController from "../controllers/auth/login.controller.js";
import RegisterController from "../controllers/auth/register.controller.js";

const AuthRouter = () => {
  const router = Router();

  router.post("/login", LoginController);
  router.post("/register", RegisterController);

  return router;
};

export default AuthRouter;
