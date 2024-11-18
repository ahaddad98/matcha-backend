import logger from "../../log/logger.js";
import UserService from "../../services/user.service.js";

const GetUsersController = async (req, res, next) => {
  try {
    const { min_age, max_age, fame_rating, distance, interests, size, page, sort } =
      req.query;
    const data = await UserService.getUsersByCriteria(req.user.id, {
      min_age,
      max_age,
      fame_rating,
      distance,
      interests,
      size,
      page,
      sort,
    });
    return res.status(200).json(data);
  } catch (error) {
    logger.error("Error while search for users", error);
    return next(error);
  }
};

export default GetUsersController;
