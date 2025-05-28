import { userServices } from "../services/user.services.js";
import { verifyToken } from "../utils/jwt.js";

export const checkTokenHeader = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No se provee un token" });

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);
    const user = await userServices.getOne({ _id: decoded._id });
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};