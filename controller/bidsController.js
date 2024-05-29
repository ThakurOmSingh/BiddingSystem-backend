import bidUtills from "../utils/bidUtills.js";
import prisma from "../utils/database.js";

export const getItemBids = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);

    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        error: "Invalid item ID",
      });
    }

    let response = await prisma.items.findFirst({
      where: {
        id,
      },
      include: {
        bid: true,
      },
    });

    if (!response) {
      return res.status(404).json({
        status: false,
        error: "Item not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Internal server error",
    });
  }
};

export const newItemBid = async (req, res) => {
  try {
    let { bid_amount, userId } = req.body;
    let { id } = req.params;
    let data = {
      item_id: parseInt(id),
      user_id: parseInt(userId),
      bid_amount: parseFloat(bid_amount),
    };

    if (isNaN(data.item_id) || isNaN(data.user_id) || isNaN(data.bid_amount)) {
      return res.status(400).json({
        status: false,
        error: "Invalid input data",
      });
    }

    let response = await bidUtills.newItemBid({ data });

    return res.status(201).json({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Internal server error",
    });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, startingPrice, endTime } = req.body;

  try {
    const itemId = parseInt(id);
    if (isNaN(itemId)) {
      return res.status(400).json({
        status: false,
        error: "Invalid item ID",
      });
    }

    const item = await prisma.items.update({
      where: { id: itemId },
      data: { name, description, startingPrice: parseFloat(startingPrice), endTime: new Date(endTime) },
    });

    return res.status(200).json({
      status: true,
      data: item,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: false,
        error: "Item not found",
      });
    }
    return res.status(500).json({
      status: false,
      error: "Internal server error",
    });
  }
};
