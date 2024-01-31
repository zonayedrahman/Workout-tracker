import EntryForm from "@/components/EntryForm";
import { findUserId } from "@/lib/database/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export type SearchParamProps = {
    params: { workout_name: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const page = async ({ params, searchParams }: SearchParamProps) => {
    const user = await currentUser();

    const userInDatabase = await findUserId(user!.id);

    // console.log("user: ", userInDatabase._id);

    // console.log("searchParams: ", params.workout_name);
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
