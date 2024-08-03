import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import homeRoute from "./src/routes/home.route.js";
import adminRoute from "./src/routes/admin.route.js";
import houseRoute from "./src/routes/house.route.js";
import userRoute from "./src/routes/user.route.js";
import reservationRoute from "./src/routes/reservation.route.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.use("/", homeRoute);
app.use("/api/admin", adminRoute);
app.use("/api/houses", houseRoute);
app.use("/api/users", userRoute);
app.use("/api/reservations", reservationRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is alive and run on port ${PORT}!`);
});
