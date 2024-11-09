import logger from "../../log/logger.js";
import AuthService from "../../services/auth.service.js";

const LoginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    logger.info("Incoming Payload:", { username, password });
    const data = await AuthService.login({ username, password });
    return res.status(200).json(data);
  } catch (error) {
    logger.error("Error while login", error);
    return next(error);
  }
};

export default LoginController;
