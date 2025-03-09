import { Request, Response } from "express";
import { WineBusiness } from "../business/WineBusiness";
import { WineInput, WineInputDTO, WineUpdateDTO } from "../model/wineDTO";

export class WineController {
  
  private wineBusiness = new WineBusiness();

  public createWine = async (req: Request, res: Response) => {
    try {
      const input: WineInput = {
        name: req.body.name,
        year: req.body.year,
        producer: req.body.producer,
        grape: req.body.grape,
        country: req.body.country,
        region: req.body.region,
        tastedAt: req.body.tastedAt,
        meetId: req.body.meetId
      };

      await this.wineBusiness.createWine(input);

      res.status(201).send({ message: "Wine created successfully" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public getWines = async (req: Request, res: Response) => {
    try {
      const wines = await this.wineBusiness.getWines();

      res.status(200).send({ wines });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public getWineById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const wine = await this.wineBusiness.getWineById(id);

      res.status(200).send({ wine });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public updateWine = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const input: WineUpdateDTO = {
        id,
        name: req.body.name,
        year: req.body.year,
        producer: req.body.producer,
        grape: req.body.grape,
        country: req.body.country,
        region: req.body.region,
        score: req.body.score,
        tastedAt: req.body.tastedAt,
        meetId: req.body.meetId
      };

      await this.wineBusiness.updateWine(input);

      res.status(200).send({ message: "Wine updated successfully" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public deleteWine = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      await this.wineBusiness.deleteWine(id);

      res.status(200).send({ message: "Wine deleted successfully" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public getWineByMeetId = async (req: Request, res: Response) => {
    try {
      const meetId = req.params.meetId;

      const wines = await this.wineBusiness.getWineByMeetId(meetId);

      res.status(200).send({ wines });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public scoreWine = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const score = req.body.score;

      await this.wineBusiness.scoreWine(id, score);

      res.status(200).send({ message: "Wine scored successfully" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
}