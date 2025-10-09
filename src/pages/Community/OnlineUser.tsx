import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import useOnlineStore from "@/ZustandStore/useOnlineStore";
import { Radio, Users } from "lucide-react";

const OnlineUser = () => {
    const users = useOnlineStore((state) => state.users);

    return (
        <Sheet>
            {/* Trigger button */}
            <SheetTrigger>
                <div className="flex items-center gap-1 h-12 px-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                    <Radio className="size-5 text-red-500" />
                    <span className="font-medium text-sm">({users.length})</span>
                </div>
            </SheetTrigger>

            {/* Drawer Content */}
            <SheetContent className="rounded-xl">
                <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                        <Users className="mr-3" /> Online Users ({users.length})
                    </SheetTitle>
                    <SheetDescription>
                        View the list of users currently online in this community.
                    </SheetDescription>
                    <>
                        <div className="mt-4 space-y-4">
                            {users.length === 0 ? (
                                <p className="text-sm text-gray-500">No users online</p>
                            ) : (
                                users.map((user) => (
                                    <div
                                        key={user.userId}
                                        className="flex items-center space-x-3 border-b pb-2"
                                    >
                                        {/* Avatar with online status */}
                                        <div className="relative">
                                            <img
                                                className="w-12 h-12 rounded-full ring-2 ring-gray-300 bg-amber-200"
                                                src={
                                                    `https://api.dicebear.com/8.x/notionists/svg?seed=${user.userName}`
                                                }
                                                alt={user.userName}
                                            />
                                            <span className="absolute bottom-0 right-0 block w-3 h-3 border-2 border-white rounded-full bg-green-500" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold ">
                                                {user.userName}
                                            </p>
                                            <p className="text-xs text-gray-500">{user.userId}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default OnlineUser;
