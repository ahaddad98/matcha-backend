const FilterMiddleware = async (req, res, next) => {
  const auth_header = req.headers["authorization"];
  if (!auth_header) {
    return res.status(401).send("Access Denied. No token provided.");
  }
  const token = auth_header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token.");
  }
};

export default FilterMiddleware;
