'use server';

import { connectToDatabase } from "..";
import Entry, { IEntry } from "../models/entry.model";





export const createEntry = async (entry: IEntry) => {

    try {
        await connectToDatabase();

        const newEntry = await Entry.create(entry);


        return JSON.parse(JSON.stringify(newEntry));


    } catch (error) {
        console.error(error);
    }

}