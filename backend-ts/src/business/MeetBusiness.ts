
import { MeetDatabase } from "../data/MeetDatabase";
import { MeetInput, MeetUpdateDTO } from "../model/meet";
import { generateId } from "../services/generateId";

export class MeetBusiness {
    public createMeet = async (input: MeetInput) => {
        const { name, date, location } = input;

        if (!name || !date || !location) {
            throw new Error(
                'All fields are required. Please provide "name", "date", and "location"'
            );
        }

        const id: string = generateId();

        const meetDatabase = new MeetDatabase();
        await meetDatabase.insertMeet({
            id,
            name,
            date,
            location,
        });
    };

    public getMeets = async () => {
        const meetDatabase = new MeetDatabase();
        const meets = await meetDatabase.getAllMeets();
        return meets;
    };

    public getMeetById = async (id: string) => {
        const meetDatabase = new MeetDatabase();
        const meet = await meetDatabase.getMeetById(id);
        if (!meet) {
            throw new Error("Meet not found");
        }
        return meet;
    };

    public updateMeet = async (input: MeetUpdateDTO) => {
        const { id, name, date, location } = input;

        if (!id || !name || !date || !location) {
            throw new Error(
                '"id", "name", "date", and "location" are required'
            );
        }

        const meetDatabase = new MeetDatabase();
        await meetDatabase.updateMeet({
            id,
            name,
            date,
            location,
        });
    };

    public deleteMeet = async (id: string) => {
        const meetDatabase = new MeetDatabase();
        await meetDatabase.deleteMeet(id);
    };
}