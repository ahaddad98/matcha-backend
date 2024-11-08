import { Router } from "express";
import LoginController from "../controllers/auth/login.controller";
import RegisterController from "../controllers/auth/register.controller";

const AuthRouter = () => {
  const router = Router();

  router.post("/login", LoginController);
  router.post("/register", RegisterController);

  return router;
};

export default AuthRouter;
