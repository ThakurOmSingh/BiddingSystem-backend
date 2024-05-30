
import itemUtills from "../utils/itemUtills.js";
import prisma from "../utils/database.js";

export const itemCreate = async (req, res) => {
  try {
    let { ownerId, name, description, starting_price, year, month, day, hours, minutes, seconds } = req.body;

    const specificDate = new Date(year, month - 1, day, hours, minutes, seconds);
    const formattedEndTime = specificDate.toISOString();

    let data = {
      ownerId: parseInt(ownerId),
      name,
      description,
      starting_price: parseFloat(starting_price),
      current_price: parseFloat(starting_price),
      end_time: formattedEndTime,
      image_url: req.file.path,
    };

    let response = await itemUtills.itemCreate({ data });
    return res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: error.message,
    });
  }
};

export const getItem = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);

    let response = await prisma.items.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    return res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: error.message,
    });
  }
};

export const getItems = async (req, res) => {
  try {
    let { page, status } = req.query;
    let query = {};
    let current_time = new Date();
    if (status == "active") {
      query = {
        where: {
          end_time: {
            gt: current_time,
          },
        },
      };
    } else if (status == "ended") {
      query = {
        where: {
          end_time: {
            lte: current_time,
          },
        },
      };
    }
    // bring only 5 items
    let morequery = {
      skip: (parseInt(page) - 1) * 5,
      take: 5,
    };
    let response = await prisma.items.findMany({
      ...query,
      include: {
        user: true,
      },
      ...morequery,
    });
    return res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: error.message,
    });
  }
};

export const itemDelete = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);

    let response = await prisma.items.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: error.message,
    });
  }
};

export const itemUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let { current_price } = req.body;
    id = parseInt(id);
    current_price = parseFloat(current_price);

    let response = await itemUtills.itemUpdate({ id, current_price });
    return res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: error.message,
    });
  }
};

