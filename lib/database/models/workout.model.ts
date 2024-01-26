import { Schema, models, model } from "mongoose";


export interface IWorkout {
    _id?: string;
    name: string;

}

const workoutSchema = new Schema({
    name: {type:String, required:true},
})

const Workout = models.Workout || model('Workout', workoutSchema)

export default Workout;