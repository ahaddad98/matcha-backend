import { Router } from "express";
import ResetPasswordController from "../controllers/settings/reset-password.controller.js";
import EditPasswordController from "../controllers/settings/edit-password.contoller.js";
import ResetEmailController from "../controllers/settings/reset-email.controller.js";
import EditEmailController from "../controllers/settings/edit-email.controller.js";
import ResetEmailVerifyController from "../controllers/settings/reset-email-verify.controller.js";
import ResetPasswordVerifyController from "../controllers/settings/reset-password-verify.controller.js";

const UserSettingsRouter = () => {
  const router = Router();

  // password
  router.post("/password/reset", ResetPasswordController);
  router.post("/password/edit", EditPasswordController);
  router.get("/password/verify", ResetPasswordVerifyController);

  // email
  router.post("/email/reset", ResetEmailController);
  router.post("/email/edit", EditEmailController);
  router.get("/email/verify", ResetEmailVerifyController);

  return router;
};

export default UserSettingsRouter;
