import { Router } from 'express';
import UserRouter from "./user.router.js";
import AuthRouter from "./auth.router.js";
import FilterMiddleware from '../middlewares/filter.middleware.js';
import UserSettingsRouter from './user_settings.router.js';


const GlobalRouter = () => {
  const router = Router();

  router.use('/auth', AuthRouter());
  router.use('/user', FilterMiddleware, UserRouter());
  router.use('/user_settings', FilterMiddleware, UserSettingsRouter());

  return router;
};

export default GlobalRouter;
