import prisma from "../database/connection.database.js";

export const createHouse = async (req, res) => {
  const {
    title,
    status,
    category,
    description,
    price,
    location,
    bedroom,
    bathroom,
  } = req.body;
  const adminId = req.admin;

  try {
    const house = await prisma.house.create({
      data: {
        title,
        status,
        category,
        description,
        price,
        location,
        bedroom,
        bathroom,
        adminId,
      },
    });
    res.status(201).json(house);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getHouses = async (req, res) => {
  try {
    const houses = await prisma.house.findMany();
    res.status(200).json(houses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getHouseById = async (req, res) => {
  const { id } = req.params;

  try {
    const house = await prisma.house.findUnique({
      where: { id },
    });
    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }
    res.status(200).json(house);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateHouse = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    status,
    category,
    description,
    price,
    location,
    bedroom,
    bathroom,
  } = req.body;

  try {
    const house = await prisma.house.update({
      where: { id },
      data: {
        title,
        status,
        category,
        description,
        price,
        location,
        bedroom,
        bathroom,
      },
    });
    res.status(200).json(house);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteHouse = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.house.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const searchHouses = async (req, res) => {
  const { query } = req.query;

  try {
    const houses = await prisma.house.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { location: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    res.status(200).json(houses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
