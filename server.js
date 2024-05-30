//socketio server connection
import http from "http";
import { Server } from "socket.io";
import notificationUtils from "./utils/notificationUtils.js";
import bidUtills from "./utils/bidUtills.js";
import itemUtills from "./utils/itemUtills.js";

const createServer = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('bid', async (incomingData) => {
      let { item_id, user_id, bid_amount } = incomingData;
      item_id = parseInt(item_id);
      user_id = parseInt(user_id);
      bid_amount = parseFloat(bid_amount);
      let data = {
        item_id: item_id,
        user_id: user_id,
        bid_amount: bid_amount,
      };


      try {
        // Check if the user is outbid
        let highestBid = await bidUtills.highestBid({ item_id });

        if (highestBid && highestBid.bid_amount < bid_amount) {
          // Notify the previous highest bidder that they have been outbid
          let data = {
            message: `You have been outbid on item ${highestBid.item_id}.`,
            id: highestBid.user_id,
          };
          await notificationUtils.createNotification({ ...data });
        }

        // Place the new bid
        await bidUtills.newItemBid({ data });

        // Create notification for the current bidder
        await notificationUtils.createNotification({
          message: `You placed a new bid of $${bid_amount} on item ${item_id}.`,
          id: user_id,
        });

       

        // Update current price of the item in the database
        await itemUtills.itemUpdate({ id: item_id, curent_price: bid_amount });

        // Emit update event to notify clients
        io.emit('update', { itemId: data.item_id, bidAmount: data.bid_amount });
      } catch (error) {
        console.error('Error handling bid:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return server;
};

export default createServer;