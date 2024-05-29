import notificationUtils from "./utils/notificationUtils.js"
import bidUtills from "./utils/bidUtills.js";
import prisma from "./utils/database.js";
import itemUtills from "./utils/itemUtills.js";
export const socketServices = async (io , incomingData) => {
  let { item_id, user_id, bid_amount } = incomingData;
  item_id = parseInt(item_id),
    user_id = parseInt(user_id),
    bid_amount = parseFloat(bid_amount)
  let data = {
    item_id: item_id,
    user_id: user_id,
    bid_amount: bid_amount
  };
  console.log("data")
  console.log(data)

  try {
    // Check if the user is outbid
    let highestBid = await bidUtills.highestBid({item_id })
    console.log("HIGHEST BID_______________________________________________")
    if (highestBid && highestBid.bid_amount < bid_amount) {
      // Notify the previous highest bidder that they have been outbid
      let data = {
        
        message: `You have been outbid on item ${highestBid.item_id}.`,
        id: highestBid.user_id,
        }
      let notified = await notificationUtils.createNotification({...data});
       
    }

    // Place the new bid
    const newBid = await bidUtills.newItemBid({data});

    // Create notification for the current bidder
    await notificationUtils.createNotification({
      message: `You placed a new bid of $${bid_amount} on item ${item_id}.`,
      id: user_id,
    });

    console.log("newBidCreated")

    // Update current price of the item in the database
    let updated = await itemUtills.itemUpdate({id : item_id , curent_price : bid_amount})

    // Emit update event to notify clients
    io.emit('update', { itemId: data.item_id, bidAmount: data.bid_amount });
  } catch (error) {
    console.error('Error handling bid:', error);
  }
}
