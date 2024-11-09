import { Router } from "express";
import UpdateUserController from "../controllers/user/update.controller";

const UserRouter = () => {
  const router = Router();

  router.patch("/:userId", UpdateUserController);
  router.patch("/:userId/cover", UpdateUserController);

  return router;
};

export default UserRouter;
