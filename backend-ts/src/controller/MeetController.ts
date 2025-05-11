import { Request, Response } from "express";
import { MeetBusiness } from "../business/MeetBusiness";
import { Meeting } from "../model/meet";
import { v4 as uuidv4 } from "uuid";

export class MeetController {

    private meetBusiness = new MeetBusiness();

    public createMeet = async (req: Request, res: Response) => {

        const id = uuidv4();

        try {
            const input: Meeting = {
                id,
                name: req.body.name,
                date: req.body.date,
                place: req.body.place,
                description: req.body.description
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