import status from "http-status";
import Exception from "../../errors/Exception.js";
import AuthService from "../../services/auth.service.js";
import Validate from "../../validators/validate.js";

const RegisterController = async (req, res, next) => {
  try {
    const errors = Validate.validate_fields(req.body);
    if (errors.length) {
      throw new Exception(
        status[status.BAD_REQUEST],
        status.BAD_REQUEST,
        "invalid register payload",
        errors
      );
    }
    const { email, first_name, last_name, password, username, latitude, longitude } =
      req.body;
    const data = await AuthService.register({
      email,
      first_name,
      last_name,
      password,
      username,
      latitude,
      longitude
    });
    return res.status(201).json(data);
  } catch (error) {
    return next(error);
  }
};

export default RegisterController;
