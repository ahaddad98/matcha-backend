import status from "http-status";
import Exception from "../../errors/Exception.js";
import UserSettingService from "../../services/user-settings.service.js";
import Validate from "../../validators/validate.js";

const EditPasswordController = async (req, res, next) => {
  try {
    const { reset_key, password } = req.body;
    const errors = Validate.validate_password({ password });
    if (errors) {
      throw new Exception(
        status[status.BAD_REQUEST],
        status.BAD_REQUEST,
        "invalid payload",
        errors
      );
    }
    await UserSettingService.editPassword({ reset_key, password });
    return res.status(204).json();
  } catch (error) {
    return next(error);
  }
};

export default EditPasswordController;
