import EntryForm from "@/components/EntryForm";
import { createEntry } from "@/lib/database/actions/entry.actions";
import { findUserId } from "@/lib/database/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { z } from "zod";

export type SearchParamProps = {
    params: { workout_name: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export const formSchema = z.object({
    user: z.string(),
    workout: z.string(),
    date: z.date(),
    weight: z
        .string()
        .refine((v) => !isNaN(Number(v)), { message: "Invalid/Numbers Only" }),
    reps: z
        .string()
        .refine((v) => !isNaN(Number(v)), { message: "Invalid/Numbers Only" }),
});

export const onSubmitForm = async (values: {
    user: string;
    workout: string;
    date: Date;
    weight: string;
    reps: string;
}) => {
    console.log(values);
};

const page = async ({ params, searchParams }: SearchParamProps) => {
    const user = await currentUser();

    const userInDatabase = await findUserId(user!.id);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const weight = Number(values.weight) || 0;
        const reps = Number(values.reps) || 0;

        if (
            weight === 0 ||
            reps === 0 ||
            values.weight.includes(".") ||
            values.reps.includes(".")
        ) {
            console.log("Please enter a valid weight and reps");
        }
        console.log(values);

        const res = await createEntry({
            user: values.user,
            workout: values.workout,
            date: values.date,
            weight: weight,
            reps: reps,
        });
        console.log(res);
    }

    return (
        <div className="h-screen pt-28 text-white">
            <div className=" border-t-[1px] border-t-red-200/30 mt-12 pt-12  w-full h-full transition-all duration-500 flex justify-center">
                <EntryForm
                    workout_name={params.workout_name}
                    current_user={userInDatabase._id}
                />
            </div>
        </div>
    );
};

export default page;
