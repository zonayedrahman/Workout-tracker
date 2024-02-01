import CategorySearch from "@/components/CategorySearch";
import CreateWorkoutButton from "@/components/CreateWorkoutButton";

import { Button } from "@/components/ui/button";

import {
    createWorkout,
    findWorkoutByName,
} from "@/lib/database/actions/workout.actions";

import Link from "next/link";

export type SearchParamProps = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const page = async ({ searchParams }: SearchParamProps) => {
    // console.log("search: ", searchParams?.search);

    let searchResult = null;
    if (searchParams?.search) {
        searchResult = await findWorkoutByName(searchParams.search as string);

        if (searchResult?.length === 0) {
            searchResult = null;
        }
    }

    console.log("result: ", searchResult);

    if (searchResult) {
        console.log("find entries");
    }
    const handleCreateWorkout = async (workoutName: string) => {
        "use server";
        console.log("create workout: ", workoutName);

        const res = await createWorkout({
            workoutName: workoutName,
        });

        if (res) {
            console.log("workout created");
        }
    };

    return (
        <div className="relative text-white ">
            <CategorySearch />
            <div className=" border-t-[1px] border-t-red-200/30 mt-12 pt-12  w-full h-full transition-all duration-500">
                {searchParams?.search && !searchResult && (
                    <div className="flex flex-col gap-5  items-center  py-16 text-lg transition-all duration-500">
                        <div className="flex flex-col  h-24 items-center  gap-5 ">
                            <div>No workout found.</div>

                            <div className="flex gap-5">
                                <CreateWorkoutButton
                                    workoutName={searchParams.search as string}
                                    createHandler={handleCreateWorkout}
                                />

                                <Link href="/progress" scroll={false}>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="bg-black/30  hover:scale-110 hover:bg-red-500/80 mr-12 transition-all duration-500"
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {searchResult && (
                    <div className=" h-full flex flex-col gap-6 items-center  pt-2">
                        <div className="flex flex-col items-center gap-6">
                            <div className="capitalize font-bold underline-offset-2 underline text-lg">
                                {searchResult.name} Entries
                            </div>
                            <div>ENTRIES</div>
                        </div>
                        <div className="pl-12">
                            <Link
                                href={`/progress/${searchResult.name.replace(
                                    /\s/g,
                                    ""
                                )}/newentry`}
                                scroll={false}
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-black/30  hover:scale-110 hover:bg-indigo-500/80 mr-12 transition-all duration-500"
                                >
                                    New Entry
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;
