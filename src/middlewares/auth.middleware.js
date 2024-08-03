import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

export const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Access denied, please authenticate." });
  }

  try {
    const verified = jwt.verify(token, "SECRET_KEY");
    req.admin = verified.adminId;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (!req.admin) {
    return res.status(403).json({ error: "Access denied, admin only." });
  }
  next();
};
