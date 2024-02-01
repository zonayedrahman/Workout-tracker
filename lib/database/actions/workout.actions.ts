'use server';

import { connectToDatabase } from "..";
import Workout from "../models/workout.model";

export const createWorkout = async ( { workoutName} : { workoutName : string} ) => {

    try {
        await connectToDatabase();
        const newWorkout = await Workout.create({name: workoutName});

        return JSON.parse(JSON.stringify(newWorkout));


    } catch (error) {
        console.log(error)
        
    }
    
}


export const getAllWorkouts = async () => {
    try {
        await connectToDatabase();

        const workouts = await Workout.find({});

        return JSON.parse(JSON.stringify(workouts));
    } catch (error) {
        console.log(error)
        
    }
}

export const findWorkoutByName = async (workoutName : string ) => {
    try {
        await connectToDatabase();

        const workout = await Workout.findOne({name: workoutName});

        return JSON.parse(JSON.stringify(workout));
    } catch (error) {
        console.log(error)
        
    }
}