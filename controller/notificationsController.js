import prisma from "../utils/database.js";

export const getNotifications = async (req, res) => {
  let { user_id } = req.query;
  user_id = parseInt(user_id);

  try {
    const notifications = await prisma.notification.findMany({ where: { user_id } });
    return res.status(200).json({
      status: true,
      data: notifications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: 'Failed to fetch notifications',
    });
  }
};

export const markNotificationsRead = async (req, res) => {
  const { id } = req.body;

  try {
    let response = await prisma.notification.updateMany({
      where: { id },
      data: { is_read: true },
    });
    return res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: 'Failed to mark notifications as read',
    });
  }
};
