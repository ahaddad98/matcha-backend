import status from "http-status";
import UserSettingService from "../../services/user-settings.service.js";
import Validate from "../../validators/validate.js";
import Exception from "../../errors/Exception.js";

const ResetPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const errors = Validate.validate_email({ email });
    if (errors) {
      throw new Exception(
        status[status.BAD_REQUEST],
        status.BAD_REQUEST,
        "invalid payload",
        errors
      );
    }
    await UserSettingService.resetPassword({ email });
    return res.status(204).json();
  } catch (error) {
    return next(error);
  }
};

export default ResetPasswordController;
