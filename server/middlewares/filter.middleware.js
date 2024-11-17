import jwt from "jsonwebtoken";
import Exception from "../errors/Exception.js";
import status from "http-status";

const FilterMiddleware = async (req, res, next) => {
  const openRoutes = [
    "/password/reset",
    "/password/verify",
    "/email/reset",
    "/email/verify",
  ];
  console.log("Request path", req.path)
  if (openRoutes.includes(req.path)) {
    return next();
  }
  const auth_header = req.headers["authorization"];
  if (!auth_header) {
    return next(
      new Exception(
        status[status.FORBIDDEN],
        status.FORBIDDEN,
        "Access Denied. No token provided"
      )
    );
  }
  const token = auth_header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return next(
      new Exception(
        status[status.UNAUTHORIZED],
        status.UNAUTHORIZED,
        "Invalid Token."
      )
    );
  }
};

export default FilterMiddleware;
