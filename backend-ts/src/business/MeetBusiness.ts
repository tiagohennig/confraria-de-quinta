
import { MeetDatabase } from "../data/MeetDatabase";
import { Meeting } from "../model/meet";
import { generateId } from "../services/generateId";

export class MeetBusiness {
    public createMeet = async (input: Meeting) => {

        const { id, name, date, place, description } = input;

        if (!name || !date || !place || !description) {
            throw new Error(
                'All fields are required. Please provide "name", "date", and "location"'
            );
        }

        const meetDatabase = new MeetDatabase();
        await meetDatabase.insertMeet({
            id,
            name,
            date,
            place,
            description
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

    public deleteMeet = async (id: string) => {
        const meetDatabase = new MeetDatabase();
        await meetDatabase.deleteMeet(id);
    };
}