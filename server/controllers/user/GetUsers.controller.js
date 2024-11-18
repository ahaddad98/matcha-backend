import logger from "../../log/logger.js";
import UserService from "../../services/user.service.js";
import ApiQueryHandler from "../../shared/ApiQueryHandler.js";

const GetUsersController = async (req, res, next) => {
  try {
    const { min_age, max_age, fame_rating, distance, interests } = req.query;
    const { page, size, skip, sorting } = ApiQueryHandler.getQueries(req.query);
    const data = await UserService.getUsersByCriteria(req.user.id, {
      min_age,
      max_age,
      fame_rating,
      distance,
      interests,
      size,
      page,
      skip,
      sorting,
    });
    return res.status(200).json(data);
  } catch (error) {
    logger.error("Error while search for users", error);
    return next(error);
  }
};

export default GetUsersController;
