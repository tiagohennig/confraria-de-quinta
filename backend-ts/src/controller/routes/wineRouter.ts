import express from "express"
import { WineController } from "../WineController"

export const wineRouter = express.Router()

const wineController = new WineController()

wineRouter.post("/create", wineController.createWine)
wineRouter.get("/", wineController.getWines)
wineRouter.get("/:id", wineController.getWineById)
wineRouter.put("/update", wineController.updateWine)
wineRouter.delete("/delete/:id", wineController.deleteWine)
wineRouter.get("/meet/:meetId", wineController.getWineByMeetId)
