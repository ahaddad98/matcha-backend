const ResetEmailVerifyController = async (req, res, next) => {
  try {
    const { token } = req.query;
    return res
      .cookie("token", token)
      .redirect("http://localhost:3000/user_settings/edit-email");
  } catch (error) {
    return next(error);
  }
};

export default ResetEmailVerifyController;
