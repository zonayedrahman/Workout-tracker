"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CategorySearch = () => {
    const [query, setQuery] = useState("");

    const pathname = usePathname();

    const { replace } = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let url = `${pathname}?search=${query}`;
            const params = new URLSearchParams(searchParams);

            if (query) {
                params.set("search", query);

                replace(`${pathname}?${params.toString()}`);
            } else {
                params.delete("search");
                replace(`${pathname}?${params.toString()}`);
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div className=" pt-36 flex justify-end">
            <Search className="absolute top-[156px] right-32 text-white/50 hidden lg:flex" />
            <Input
                placeholder="Search workout..."
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                className="relative w-1/4 pl-8 focus:pl-7 mr-28 text-green-300/70 text-[15px] h-12  bg-indigo-400/20 border-0 outline-offset-0 placeholder:text-white/50 placeholder:font-normal focus:border-2 focus:border-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
        </div>
    );
};

export default CategorySearch;
