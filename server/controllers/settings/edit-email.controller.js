import status from "http-status";
import Exception from "../../errors/Exception.js";
import UserSettingService from "../../services/user-settings.service.js";
import Validate from "../../validators/validate.js";

const EditEmailController = async (req, res, next) => {
  try {
    const { reset_key, email } = req.body;
    const errors = Validate.validate_email({ email });
    if (errors) {
      throw new Exception(
        status[status.BAD_REQUEST],
        status.BAD_REQUEST,
        "invalid payload",
        errors
      );
    }
    await UserSettingService.editEmail({ reset_key, email });
    return res.status(204).json();
  } catch (error) {
    return next(error);
  }
};

export default EditEmailController;
