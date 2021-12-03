import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  console.log("inside auth");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    console.log("token is null");
    //return res.status(401).json({ message: "token bad?" });
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      //return res.status(403);
      return res.sendStatus(403);
    }
    next();
  });
};

export { authenticateToken };
