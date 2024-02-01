"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createEntry } from "@/lib/database/actions/entry.actions";
import {
    formSchema,
    onSubmitForm,
} from "@/app/(root)/progress/[workout_name]/newentry/page";
import { findWorkoutByName } from "@/lib/database/actions/workout.actions";

const EntryForm = ({
    workout_name,
    current_user,
}: {
    workout_name: string;
    current_user: string;
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user: current_user,
            workout: workout_name,
            date: new Date(),
            weight: `0`,
            reps: `0`,
        },
    });

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

        // onSubmitForm(values);
        const workoutId = await findWorkoutByName(values.workout);
        console.log(workoutId);

        const res = await createEntry({
            user: values.user,
            workout: workoutId.id,
            date: values.date,
            weight: weight as number,
            reps: reps as number,
        });
        console.log(res);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-1/5 "
            >
                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Weight (lb)</FormLabel>
                            <FormControl>
                                <Input placeholder="150..." {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the weight you lifted
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="reps"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reps</FormLabel>
                            <FormControl>
                                <Input placeholder="5..." {...field} />
                            </FormControl>
                            <FormDescription>Repetition</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of Lift</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Day it was performed
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default EntryForm;
