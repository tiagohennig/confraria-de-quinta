import { Request, Response } from "express";
import { MeetBusiness } from "../business/MeetBusiness";
import { Meeting } from "../model/meet";
import { CustomError } from "../services/CustomError";

export class MeetController {
    private meetBusiness = new MeetBusiness();

    public createMeet = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: Meeting = {
                id: req.body.id,
                name: req.body.name,
                date: req.body.date,
                place: req.body.place,
                description: req.body.description,
                host: req.body.host,
                maxParticipants: req.body.maxParticipants
            };

            await this.meetBusiness.createMeet(input);

            res.status(201).send({ 
                success: true, 
                message: "Encontro criado com sucesso",
                meeting: { ...input } 
            });
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ success: false, message: error.message });
            } else {
                res.status(400).send({ success: false, message: error.message || "Erro inesperado" });
            }
        }
    };

    public getMeets = async (req: Request, res: Response): Promise<void> => {
        try {
            const meets = await this.meetBusiness.getMeets();

            res.status(200).send({ 
                success: true, 
                meetings: meets,
                count: meets.length 
            });
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ success: false, message: error.message });
            } else {
                res.status(400).send({ success: false, message: error.message || "Erro inesperado" });
            }
        }
    };

    public getMeetById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;

            const meet = await this.meetBusiness.getMeetById(id);

            res.status(200).send({ 
                success: true, 
                meeting: meet 
            });
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ success: false, message: error.message });
            } else {
                res.status(400).send({ success: false, message: error.message || "Erro inesperado" });
            }
        }
    };

    public updateMeet = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: Meeting = {
                id: req.body.id,
                name: req.body.name,
                date: req.body.date,
                place: req.body.place,
                description: req.body.description,
                host: req.body.host,
                maxParticipants: req.body.maxParticipants
            };

            await this.meetBusiness.updateMeet(input);

            res.status(200).send({ 
                success: true, 
                message: "Encontro atualizado com sucesso",
                meeting: input 
            });
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ success: false, message: error.message });
            } else {
                res.status(400).send({ success: false, message: error.message || "Erro inesperado" });
            }
        }
    };

    public deleteMeet = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;

            await this.meetBusiness.deleteMeet(id);

            res.status(200).send({ 
                success: true, 
                message: "Encontro deletado com sucesso" 
            });
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ success: false, message: error.message });
            } else {
                res.status(400).send({ success: false, message: error.message || "Erro inesperado" });
            }
        }
    };

    public getNextMeet = async (req: Request, res: Response): Promise<void> => {
        try {
            const nextMeets = await this.meetBusiness.getNextMeets();

            res.status(200).send({ 
                success: true, 
                meetings: nextMeets
            });
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ success: false, message: error.message });
            } else {
                res.status(400).send({ success: false, message: error.message || "Erro inesperado" });
            }
        }
    };
}