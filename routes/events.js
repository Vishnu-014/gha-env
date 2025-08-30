import { Router } from "express";
import getDB from "../data/database.js";

const router = Router();

router.get("/", async (req, res) => {
  const db = getDB();
  const allEvents = await db.collection("events").find().toArray();
  res.json({ events: allEvents });
});

router.post("/", async (req, res) => {
  const db = getDB();
  const eventData = req.body;
  const result = await db.collection("events").insertOne(eventData);
  res.status(201).json({
    message: "Event created.",
    event: { ...eventData, id: result.insertedId },
  });
});

export default router;
