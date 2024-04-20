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
import { Moon, Sun, Settings, CircleUserRound, GitGraph } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { signOutUserRequest } from "@/lib/backendRequests";

import Link from "next/link";

const MainNav = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const { setTheme } = useTheme();
    const router = useRouter();

    async function handleSignOut() {
        const signOutResponse = await signOutUserRequest();

        if (signOutResponse.status === 200) {
            setAuth({
                username: '',
                roles: [],
                accessToken: ''
            })
        }
    }

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
                            {auth?.accessToken ? (
                                <>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                className="text-md font-bold md:p-5 md:text-lg">
                                                {auth.username}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            <DropdownMenuLabel>Your links</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <CircleUserRound className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  mr-1" /> Your profile
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <GitGraph className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  mr-1" /> Your last commits
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all mr-1" /> Settings
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <Button
                                        className="text-md font-bold md:p-5 md:text-lg"
                                        onClick={handleSignOut}>
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <>
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
                                </>
                            )}

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
                </NavigationMenuList >
            </NavigationMenu >
        </div >
    )
}

export default MainNav;