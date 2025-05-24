import express from "express";
import { MeetController } from "../MeetController";
import { authenticateToken } from "../../auth/auth";

export const meetRouter = express.Router();

const meetController = new MeetController();

meetRouter.post("/create", authenticateToken, meetController.createMeet);
meetRouter.get("/", authenticateToken, meetController.getMeets);
meetRouter.get("/next", authenticateToken, meetController.getNextMeet);
meetRouter.get("/:id", authenticateToken, meetController.getMeetById);
meetRouter.put("/update", authenticateToken, meetController.updateMeet);
meetRouter.delete("/delete/:id", authenticateToken, meetController.deleteMeet);