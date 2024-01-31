import { Schema, models, model } from "mongoose";


export interface IEntry {
    user: string;
    workout: string;
    date: Date;
    weight: number;
    reps: number;

}


const entrySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    workout: { type: Schema.Types.ObjectId, ref: 'Workout' },
    date: { type: Date, default: Date.now },
    weight: { type: Number, required: true },
    reps: { type: Number, required: true },


})


const Entry = models.Entry || model('Entry', entrySchema);

export default Entry;