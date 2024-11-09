import { Router } from "express";
import LoginController from "../controllers/auth/login.controller.js";
import RegisterController from "../controllers/auth/register.controller.js";
import VerifyController from "../controllers/auth/verify.controller.js";

const AuthRouter = () => {
  const router = Router();

  router.post("/login", LoginController);
  router.post("/register", RegisterController);
  router.get("/verify", VerifyController);
  // router.get("/refresh-token", Refreshtoken);
  // router.get("/reset-password", ResetPassword);

  return router;
};

export default AuthRouter;
