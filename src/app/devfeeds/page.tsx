
import Image from "next/image";
import { Sparkle, Users, Telescope, UserSearch } from "lucide-react";
export default function ForumPage() {
    return (
        <main>
            <div className="lg:grid grid-cols-10 max-w-7xl lg:mx-auto ">
                <div className="col-span-2">
                    <ul className="flex flex-row lg:flex-col flex-nowrap overflow-x-auto">
                        <li className="shrink-0">
                            <a href="#" className="flex items-center space-x-3 py-2 px-2">
                                <Sparkle />
                                <span>For you</span>
                            </a>
                        </li>
                        <li className="shrink-0">
                            <a href="#" className="flex items-center space-x-3 py-2 px-2">
                                <UserSearch />
                                <span>Following</span>
                            </a>
                        </li>
                        <li className="shrink-0">
                            <a href="#" className="flex items-center space-x-3 py-2 px-2">
                                <Users />
                                <span>Friends</span>
                            </a>
                        </li>
                        <li className="shrink-0">
                            <a href="#" className="flex items-center space-x-3 py-2 px-2">
                                <Telescope />
                                <span>Explore</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-span-5">

                </div>
                <div className="col-span-3">

                </div>
            </div>
        </main>
    );
}