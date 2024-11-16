import logger from "../../log/logger.js";
import UserService from "../../services/user.service.js";

const UpdateUserController = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      gender,
      sexual_preferences,
      biography,
      tags,
      default_cover,
      covers,
      geoPoint
    } = req.body;
    const data = await UserService.update(req.user.id, {
      first_name,
      last_name,
      email,
      gender,
      sexual_preferences,
      biography,
      tags,
      default_cover,
      covers,
      geoPoint
    });
    return res.status(200).json(data);
  } catch (error) {
    logger.error("Error while update user", error);
    return next(error);
  }
};

export default UpdateUserController;
