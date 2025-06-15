import { Request, Response } from "express";
import { WineBusiness } from "../business/WineBusiness";
import { Wine } from "../model/wineDTO";
import { CustomError } from "../services/CustomError";

export class WineController {
  
  private wineBusiness = new WineBusiness();

  public createWine = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: Wine = {
        id: req.body.id || "",
        name: req.body.name,
        year: req.body.year,
        producer: req.body.producer,
        grape: req.body.grape,
        country: req.body.country,
        region: req.body.region,
        meet_id: req.body.meetId,
        oak_ageing_time: req.body.oak_ageing_time,
        price: req.body.price
      };

      await this.wineBusiness.createWine(input);

      res.status(201).send({ 
        success: true, 
        message: "Wine created successfully",
        wine: { ...input }
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: error.message || "Unexpected error" });
      }
    }
  };

  public getWines = async (req: Request, res: Response): Promise<void> => {
    try {
      const wines = await this.wineBusiness.getWines();

      res.status(200).send({ 
        success: true, 
        wines 
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: error.message || "Unexpected error" });
      }
    }
  };

  public getWineById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;

      const wine = await this.wineBusiness.getWineById(id);

      res.status(200).send({ 
        success: true, 
        wine 
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send({ success: false, message: error.message });
      } else {
        res.status(404).send({ success: false, message: error.message || "Wine not found" });
      }
    }
  };

  public updateWine = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: Wine = {
        id: req.body.id,
        name: req.body.name,
        year: req.body.year,
        producer: req.body.producer,
        grape: req.body.grape,
        country: req.body.country,
        region: req.body.region,
        meet_id: req.body.meetId,
        oak_ageing_time: req.body.oak_ageing_time,
        price: req.body.price
      };

      if (!input.id) {
        throw new CustomError(400, "Wine ID is required");
      }

      await this.wineBusiness.updateWine(input);

      res.status(200).send({ 
        success: true, 
        message: "Wine updated successfully",
        wine: input
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: error.message || "Error updating wine" });
      }
    }
  };

  public deleteWine = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;

      await this.wineBusiness.deleteWine(id);

      res.status(200).send({ 
        success: true, 
        message: "Wine deleted successfully" 
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: error.message || "Error deleting wine" });
      }
    }
  };

  public getWineByMeetId = async (req: Request, res: Response): Promise<void> => {
    try {
      const meetId = req.params.meetId;

      const wines = await this.wineBusiness.getWineByMeetId(meetId);

      res.status(200).send({ 
        success: true, 
        wines,
        count: wines.length
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: error.message || "Error fetching wines" });
      }
    }
  };
}