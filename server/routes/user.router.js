import { Router } from "express";
import UpdateUserController from "../controllers/user/UpdateUser.controller.js"

const UserRouter = () => {
  const router = Router();

  router.get("/", (req, res, next) => {
    return res.status(200).send(req.user);
  })
  router.patch("/:userId", UpdateUserController);
  // router.patch("/:userId/cover", UpdateUserController);

  return router;
};

export default UserRouter;
