import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.controller.js";

const adminRoute = Router();

adminRoute.post("/register", registerAdmin);
adminRoute.post("/login", loginAdmin);

export default adminRoute;
