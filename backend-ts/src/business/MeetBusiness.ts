import { MeetDatabase } from "../data/MeetDatabase";
import { Meeting } from "../model/meet";
import { generateId } from "../services/generateId";
import { CustomError } from "../services/CustomError";

export class MeetBusiness {
    public createMeet = async (input: Meeting): Promise<void> => {
        const { name, date, place, description, host, maxParticipants } = input;

        if (!name) {
            throw new CustomError(400, "Nome do encontro é obrigatório");
        }
        if (!date) {
            throw new CustomError(400, "Data é obrigatória");
        }
        if (!place) {
            throw new CustomError(400, "Local é obrigatório");
        }
        if (!description) {
            throw new CustomError(400, "Descrição é obrigatória");
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;
        if (!dateRegex.test(date)) {
            throw new CustomError(400, "Formato de data inválido. Use o formato ISO: YYYY-MM-DDTHH:MM");
        }

        const meetDate = new Date(date);
        if (meetDate < new Date()) {
            throw new CustomError(400, "A data do encontro deve ser no futuro");
        }

        const id: string = input.id || generateId();

        const meetDatabase = new MeetDatabase();
        
        try {
            await meetDatabase.insertMeet({
                id,
                name,
                date,
                place,
                description,
                host,
                maxParticipants
            });
        } catch (error: any) {
            throw new CustomError(500, `Erro ao criar encontro: ${error.message}`);
        }
    };

    public getMeets = async (): Promise<Meeting[]> => {
        try {
            const meetDatabase = new MeetDatabase();
            const meets = await meetDatabase.getAllMeets();
            
            meets.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.getTime() - dateB.getTime();
            });
            
            return meets;
        } catch (error: any) {
            throw new CustomError(500, `Erro ao buscar encontros: ${error.message}`);
        }
    };

    public getMeetById = async (id: string): Promise<Meeting> => {
        if (!id) {
            throw new CustomError(400, "ID do encontro é necessário");
        }

        try {
            const meetDatabase = new MeetDatabase();
            const meet = await meetDatabase.getMeetById(id);
            
            if (!meet) {
                throw new CustomError(404, "Encontro não encontrado");
            }
            
            return meet;
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(500, `Erro ao buscar encontro: ${error.message}`);
        }
    };

    public updateMeet = async (input: Meeting): Promise<void> => {
        const { id, name, date, place, description } = input;

        if (!id) {
            throw new CustomError(400, "ID do encontro é necessário");
        }
        if (!name) {
            throw new CustomError(400, "Nome do encontro é obrigatório");
        }
        if (!date) {
            throw new CustomError(400, "Data é obrigatória");
        }
        if (!place) {
            throw new CustomError(400, "Local é obrigatório");
        }
        if (!description) {
            throw new CustomError(400, "Descrição é obrigatória");
        }

        const meetDatabase = new MeetDatabase();
        const existingMeet = await meetDatabase.getMeetById(id);
        
        if (!existingMeet) {
            throw new CustomError(404, "Encontro não encontrado");
        }

        try {
            await meetDatabase.updateMeet(input);
        } catch (error: any) {
            throw new CustomError(500, `Erro ao atualizar encontro: ${error.message}`);
        }
    };

    public deleteMeet = async (id: string): Promise<void> => {
        if (!id) {
            throw new CustomError(400, "ID do encontro é necessário");
        }

        const meetDatabase = new MeetDatabase();
        const existingMeet = await meetDatabase.getMeetById(id);
        
        if (!existingMeet) {
            throw new CustomError(404, "Encontro não encontrado");
        }

        try {
            await meetDatabase.deleteMeet(id);
        } catch (error: any) {
            throw new CustomError(500, `Erro ao deletar encontro: ${error.message}`);
        }
    };
    
public getNextMeets = async (): Promise<Meeting[]> => {
    try {
        const meetDatabase = new MeetDatabase();
        const meets = await meetDatabase.getAllMeets();

        const now = new Date();
        const futureMeets = meets.filter(meet => new Date(meet.date) > now);

        futureMeets.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return futureMeets;
    } catch (error: any) {
        throw new CustomError(500, `Erro ao buscar próximas reuniões: ${error.message}`);
    }
};
}