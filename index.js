// main express server
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import createServer from "./server.js";
import apiLimiter from "./middleware/apiLimiter.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(apiLimiter)
const server = createServer(app);

app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/notifications', notificationRoutes);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
