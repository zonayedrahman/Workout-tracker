"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Dumbbell } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const Links = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Progress",
        link: "/progress",
    },
    {
        name: "Exercises",
        link: "/exercises",
    },
];

const Navbar = () => {
    const path = usePathname();

    console.log(path);
    return (
        <div className="z-10 absolute top-4 left-[7.5%] bg-gradient-to-r from-indigo-700/10 via-purple-900/50 to-pink-100/10 h-24 w-[85%] rounded-xl flex items-center justify-between text-white">
            <div className="">
                <Link href="/">
                    <Dumbbell className="w-12 opacity-80 hover:opacity-100 h-12 mr-6 hover:text-purple-600 hover:rotate-90 ml-12   transition-all  duration-500" />
                </Link>
            </div>

            <SignedOut>
                <Link href="/sign-in">
                    <Button
                        variant="outline"
                        size="lg"
                        className="bg-black/30  hover:scale-110 hover:bg-black/80 mr-12 transition-all duration-500  "
                    >
                        Sign In
                    </Button>
                </Link>
            </SignedOut>

            <SignedIn>
                {/* desktop nav */}
                <div className="md:flex hidden w-full items-center justify-between">
                    <div className=" w-[95%] flex  justify-end gap-12">
                        {Links.map((link) => {
                            const isActive = path === link.link;

                            return (
                                <Link href={link.link} key={link.name}>
                                    <p
                                        className={`${
                                            isActive && `text-cyan-400`
                                        } hover:text-white/100 transition-all duration-500 text-white/60`}
                                    >
                                        {link.name}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mr-12 ml-10">
                        <UserButton />
                    </div>
                </div>
            </SignedIn>
        </div>
    );
};

export default Navbar;
