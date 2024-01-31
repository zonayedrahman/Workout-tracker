"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Dumbbell, Menu, X } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
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

const MobileNav = () => {
    const path = usePathname();

    return (
        <Sheet>
            <SheetTrigger>
                <Menu />
            </SheetTrigger>
            <SheetContent className="text-transparent">
                <div>
                    <div className="w-full flex ">
                        <Link href="/">
                            <Dumbbell className="text-white w-12 opacity-80 hover:opacity-100 h-12  hover:text-purple-600 hover:rotate-90  mr-3  transition-all  duration-500 cursor-pointer " />
                        </Link>
                    </div>
                </div>

                <div className="text-[20px] h-full w-full flex flex-col justify-center -translate-y-[10%] gap-10 text-left">
                    {Links.map((link) => {
                        const isActive = path === link.link;

                        return (
                            <Link href={link.link} key={link.name}>
                                <p
                                    className={`${
                                        isActive && `text-cyan-400`
                                    } hover:text-white/100 transition-all duration-500 text-white/60 `}
                                >
                                    {link.name}
                                </p>
                            </Link>
                        );
                    })}
                </div>

                <SheetClose>
                    <div className="fixed w-fit top-5 right-5 z-10">
                        <X className="text-white hover:text-purple-600 transition-all duration-300" />
                    </div>
                </SheetClose>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
