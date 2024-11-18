import UserService from "../../services/user.service.js";
import ApiQueryHandler from "../../shared/ApiQueryHandler.js";

const SuggestionUsersController = async (req, res, next) => {
  try {
    const { page, size, skip, sorting } = ApiQueryHandler.getQueries(req.query);
    const data = await UserService.suggestionUsersBasedOnCriteria({
      page,
      size,
      skip,
      sorting,
    });
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export default SuggestionUsersController;
