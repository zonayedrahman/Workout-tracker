import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const page = () => {
    return (
        <div className="relative">
            <div className=" pt-36 flex justify-end">
                <Search className="absolute top-[158px] right-32 text-white/50 hidden lg:flex" />
                <Input
                    placeholder="Search workout..."
                    type="text"
                    className="relative w-1/4 pl-8 mr-28 text-green-300/70 text-[15px] h-12  bg-indigo-400/20 border-0 outline-offset-0 placeholder:text-white/50 placeholder:font-normal focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
        </div>
    );
};

export default page;
