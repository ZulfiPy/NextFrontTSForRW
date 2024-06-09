'use client';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun, Settings, CircleUserRound, GitGraph, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
const MainNav = () => {
    const { data: session, status } = useSession();
    const { setTheme } = useTheme();
    const router = useRouter();
    return (<>
            <nav className="lg:hidden p-2 bg-gray-900 md:p-3">
                <div className="flex justify-between items-center max-w-5xl mx-auto">
                    <div className="flex-grow flex justify-center">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link href='/' legacyBehavior passHref>
                                        <NavigationMenuLink className="text-lg font-bold">
                                            Home
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon">
                                    <Menu className="rotate-0 scale-100 transition-all"/>
                                    <span className="sr-only">Mobile menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="flex flex-col items-center pb-3 font-bold text-lg md-2 w-64 mt-2 md:mt-3">
                                <DropdownMenuLabel>Mobile Navigation</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href='/components' legacyBehavior passHref>
                                        Components
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href='/collaborations' legacyBehavior passHref>
                                        Collaborations
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href='/training' legacyBehavior passHref>
                                        Training
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />

                                {status === 'authenticated' && (session === null || session === void 0 ? void 0 : session.user) ?
            (<div className="flex flex-col">
                                            <DropdownMenuItem className="flex flex-col space-y-2">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button className="text-md font-bold md:p-5 text-md w-24">
                                                            {session.user.username}
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="start">
                                                        <DropdownMenuLabel>Your links</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <CircleUserRound className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  mr-1"/> Your profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <GitGraph className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  mr-1"/> Your last commits
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all mr-1"/> Settings
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                                <Button className="ext-md font-bold md:p-5 text-md w-24" onClick={() => signOut()}>
                                                    Sign out
                                                </Button>
                                            </DropdownMenuItem>
                                        </div>) : (<div className="flex flex-col">
                                            <DropdownMenuItem>
                                                <Button className="text-md font-bold md:p-5  w-24" onClick={() => router.push('/sign-in')}>
                                                    Sign In
                                                </Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Button className="text-md font-bold md:p-5  w-24" onClick={() => router.push('/register')}>
                                                    Register
                                                </Button>
                                            </DropdownMenuItem>
                                        </div>)}

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>

            <div className="hidden justify-center shadow shadow-gray-300 lg:flex">
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
                                {status === 'authenticated' && (session === null || session === void 0 ? void 0 : session.user) ? (<>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button className="text-md font-bold md:p-5 md:text-lg">
                                                    {session.user.username}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                <DropdownMenuLabel>Your links</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <CircleUserRound className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  mr-1"/> Your profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <GitGraph className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  mr-1"/> Your last commits
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all mr-1"/> Settings
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <Button className="text-md font-bold md:p-5 md:text-lg" onClick={() => signOut()}>
                                            Sign out
                                        </Button>
                                    </>) : (<>
                                        <Button className="text-md font-bold md:p-5 md:text-lg" onClick={() => router.push('/sign-in')}>
                                            Sign In
                                        </Button>

                                        <Button className="text-md font-bold md:p-5 md:text-lg" onClick={() => router.push('/register')}>
                                            Register
                                        </Button>
                                    </>)}

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon">
                                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
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
        </>);
};
export default MainNav;
