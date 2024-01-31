"use client";

import { createWorkout } from "@/lib/database/actions/workout.actions";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CreateWorkoutButton = async ({
    workoutName,
    createHandler,
}: {
    workoutName: string;
    createHandler: (workoutName: string) => Promise<void>;
}) => {
    const router = useRouter();
    return (
        <Button
            className="bg-indigo-800/80  hover:scale-110 hover:bg-green-700/80 mr-12 transition-all duration-500"
            size="lg"
            onClick={() =>
                createHandler(workoutName).then(() => router.refresh())
            }
        >
            Create Workout: {workoutName}
        </Button>
    );
};

export default CreateWorkoutButton;
