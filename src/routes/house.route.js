import { Router } from "express";
import {
  createHouse,
  getHouses,
  getHouseById,
  updateHouse,
  deleteHouse,
  searchHouses,
} from "../controllers/house.controller.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const houseRoute = Router();

houseRoute.post("/", authenticateToken, authorizeAdmin, createHouse);
houseRoute.get("/", getHouses);
houseRoute.get("/search", searchHouses);
houseRoute.get("/:id", getHouseById);
houseRoute.put("/:id", authenticateToken, authorizeAdmin, updateHouse);
houseRoute.delete("/:id", authenticateToken, authorizeAdmin, deleteHouse);

export default houseRoute;
