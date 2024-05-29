import { connect } from "http2";
import prisma from "./database.js";

const newItemBid = async ({ data }) => {
  return await prisma.bid.create({
    data: {
      user: {
        connect: {
          id: data.user_id
        }
      },
      item: {
        connect: {
          id: data.item_id
        }
      },
      bid_amount: data.bid_amount
    }
  })

}

const highestBid = async ({ item_id }) => {
  return await prisma.bid.findFirst({
    where: { item_id: item_id },
    orderBy: { bid_amount: 'desc' }
  });
}

export default {
  newItemBid,
  highestBid
}