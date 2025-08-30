import express from "express";
import eventsRouter from "./routes/events.js";
import { connectDB } from "./data/database.js";

const app = express();
app.use(express.json());

async function startServer() {
  await connectDB(); // ✅ ensures DB is connected before routes use it

  app.use("/events", eventsRouter);

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
  });
}

startServer();
