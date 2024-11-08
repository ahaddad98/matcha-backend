import { Router } from 'express';
import AuthRouter from "./auth.router";


const GlobalRouter = () => {
  const router = Router();

  router.use('/auth', AuthRouter());
//   router.use('/user', );

  return router;
};

export default GlobalRouter;
