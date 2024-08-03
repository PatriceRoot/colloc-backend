import { Router } from "express";
import {
  getReservations,
  deleteReservation,
} from "../controllers/reservation.controller.js";
import {
  makeReservation,
  getUserReservations,
} from "../controllers/user.controller.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const reservationRoute = Router();

reservationRoute.post("/", authenticateToken, makeReservation);
reservationRoute.get("/", authenticateToken, getUserReservations);
reservationRoute.get(
  "/admin",
  authenticateToken,
  authorizeAdmin,
  getReservations
);
reservationRoute.delete(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  deleteReservation
);

export default reservationRoute;
