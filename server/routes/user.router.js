import { Router } from "express";
import UpdateUserController from "../controllers/user/updateUser.controller.js";
import SuggestionUsersController from "../controllers/user/suggestionUsers.Controller.js";
import GetUsersController from "../controllers/user/GetUsers.controller.js";
import GetUserById from "../controllers/user/getUserById.controller.js";

const UserRouter = () => {
  const router = Router();

  router.get("/suggestions", SuggestionUsersController);
  router.get("/search", GetUsersController);
  router.patch("/:userId", UpdateUserController);
  router.get("/:userId", GetUserById);
  // router.patch("/:userId/cover/:profileId", UpdateUserController);
  // router.post("/presigned-url", UpdateUserController);

  return router;
};

export default UserRouter;
