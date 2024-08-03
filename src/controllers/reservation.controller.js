import prisma from "../database/connection.database.js";
export const makeReservation = async (req, res) => {
  const { houseId } = req.body;
  const userId = req.user.id;

  console.log("req.user:", req.user);
  console.log("userId:", userId); 

  try {
    const reservation = await prisma.reservation.create({
      data: {
        userId,
        houseId,
      },
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserReservations = async (req, res) => {
  const userId = req.user.id;

  try {
    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: { house: true },
    });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany({
      include: { user: true, house: true },
    });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.reservation.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
