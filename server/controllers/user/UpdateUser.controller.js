import status from "http-status";
import Exception from "../../errors/Exception.js";
import logger from "../../log/logger.js";
import UserService from "../../services/user.service.js";
import Validate from "../../validators/validate.js";

const UpdateUserController = async (req, res, next) => {
  try {
    const errors = Validate.validate_update_fields(req.body);
    if (errors.length) {
      throw new Exception(
        status[status.BAD_REQUEST],
        status.BAD_REQUEST,
        "invalid update payload",
        errors
      );
    }
    const {
      first_name,
      last_name,
      gender,
      sexual_preferences,
      biography,
      tags,
      default_cover,
      latitude,
      longitude,
      birthday,
    } = req.body;
    const data = await UserService.update(req.user.id, {
      first_name,
      last_name,
      gender,
      sexual_preferences,
      biography,
      tags,
      default_cover,
      latitude,
      longitude,
      birthday,
    });
    return res.status(200).json(data);
  } catch (error) {
    logger.error("Error while update user", error);
    return next(error);
  }
};

export default UpdateUserController;
