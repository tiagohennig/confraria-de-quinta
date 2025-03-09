import { Request, Response } from "express";
import { MeetBusiness } from "../business/MeetBusiness";
import { MeetInput, MeetInputDTO, MeetUpdateDTO } from "../model/meet";

export class MeetController {

    private meetBusiness = new MeetBusiness();

    public createMeet = async (req: Request, res: Response) => {
        try {
            const input: MeetInput = {
                name: req.body.name,
                date: req.body.date,
                location: req.body.location
            };

            await this.meetBusiness.createMeet(input);

            res.status(201).send({ message: "Meet created successfully" });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public getMeets = async (req: Request, res: Response) => {
        try {
            const meets = await this.meetBusiness.getMeets();

            res.status(200).send({ meets });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public getMeetById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const meet = await this.meetBusiness.getMeetById(id);

            res.status(200).send({ meet });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public updateMeet = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const input: MeetUpdateDTO = {
                id,
                name: req.body.name,
                date: req.body.date,
                location: req.body.location
            };

            await this.meetBusiness.updateMeet(input);

            res.status(200).send({ message: "Meet updated successfully" });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public deleteMeet = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            await this.meetBusiness.deleteMeet(id);

            res.status(200).send({ message: "Meet deleted successfully" });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };
}