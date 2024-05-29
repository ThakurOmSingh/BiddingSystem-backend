import prisma from "./database.js"

const createNotification = async ({ message, id }) => {
  return await prisma.notification.create({
    data: {
      message,
      user: {
        connect: {
          id
        }
      }
    }
  })
}

export default {
  createNotification
}