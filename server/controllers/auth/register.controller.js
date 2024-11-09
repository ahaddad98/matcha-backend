import AuthService from "../../services/auth.service.js";

const RegisterController = async (req, res, next) => {
  try {
    const { email, first_name, last_name, password, username, geoPoint } =
      req.body;
    const data = await AuthService.register({
      email,
      first_name,
      last_name,
      password,
      username,
      geoPoint,
    });
    return res.status(201).json(data);
  } catch (error) {
    return next(error);
  }
};

export default RegisterController;
