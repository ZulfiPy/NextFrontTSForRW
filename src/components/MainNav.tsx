'use client'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import Link from "next/link";

const MainNav = () => {
    const { setTheme } = useTheme();
    const router = useRouter();

    return (
        <div className="flex justify-center shadow shadow-gray-300">
            <NavigationMenu>
                <NavigationMenuList>

                    <div className="container flex flex-col items-center space-y-3 my-3 md:space-y-0 md:justify-around w-screen md:flex-wrap md:h-24 md:px-4 md:flex-row xl:justify-between">
                        <div className="text-lg font-semibold md:text-xl md:order-1 md:font-bold">
                            <NavigationMenuItem>
                                <Link href='/' legacyBehavior passHref>
                                    <NavigationMenuLink>
                                        Home
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </div>

                        <div className="flex flex-col w-80 items-center text-lg font-semibold space-y-4 py-5 md:py-0 md:space-y-0 md:space-x-4 md:order-2 md:justify-between md:text-xl md:font-bold md:flex-row md:shadow-none">
                            <NavigationMenuItem>
                                <Link href='/components' legacyBehavior passHref>
                                    <NavigationMenuLink>
                                        Components
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link href='/collaborations' legacyBehavior passHref>
                                    <NavigationMenuLink>
                                        Collaborations
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link href='/training' legacyBehavior passHref>
                                    <NavigationMenuLink>
                                        Training
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </div>

                        <div className="flex flex-col items-center space-y-3 md:space-y-0 md:space-x-2 md:flex-row md:order-3 ">
                            <Button
                                className="text-md font-bold md:p-5 md:text-lg"
                                onClick={() => router.push('/sign-in')}>
                                Sign In
                            </Button>

                            <Button 
                            className="text-md font-bold md:p-5 md:text-lg"
                            onClick={() => router.push('/register')}>
                                Register
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon">
                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuLabel>Styling Theme</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setTheme('light')}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme('system')}>
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default MainNav;