import logger from "../../log/logger.js";
import AuthService from "../../services/auth.service.js";

const VerifyController = async (req, res, next) => {
  try {
    const { token } = req.query;
    logger.info("query param:", token);
    await AuthService.verify(token);
    // redirect to frontend login
    return res.redirect("http://localhost:3000/login");
  } catch (error) {
    logger.error("Error while login", error);
    return next(error);
  }
};

export default VerifyController;
