import express from "express";
import { WineController } from "../WineController";
import { authenticateToken } from "../../auth/auth";

export const wineRouter = express.Router();

const wineController = new WineController();

wineRouter.post("/create", authenticateToken, wineController.createWine);
wineRouter.get("/", authenticateToken, wineController.getWines);
wineRouter.get("/:id", authenticateToken, wineController.getWineById);
wineRouter.put("/update", authenticateToken, wineController.updateWine);
wineRouter.delete("/delete/:id", authenticateToken, wineController.deleteWine);
wineRouter.get("/meet/:meetId", authenticateToken, wineController.getWineByMeetId);