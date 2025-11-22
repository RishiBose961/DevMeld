/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Radio } from "lucide-react";
import { useLocation } from "react-router";
import useEditorPostid from "../hook/profileHook/useEditorPostid";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import BottomInd from "./BottomInd";
const RightSideBar = ({ isConnected, users, typingUsers, handleLanguageChange, socketRef, leaveRoom, language }: {
    isConnected: boolean;
    users: any[];
    typingUsers: string[];
    handleLanguageChange: (lang: string) => void;
    socketRef: React.MutableRefObject<any>;
    leaveRoom: () => void;
    language: string
}) => {

    const id = useLocation().pathname.split("/")[3];

  

    const { isPending, getEditorPost } = useEditorPostid(id) as {
        isPending: boolean;
        getEditorPost: {
            _id: string;
            title: string;
            description: string;
            requiredtech: string[];
        };
    }


    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-3">
            <span
                className={`font-bold text-sm ring-1 p-1 rounded-full ${isConnected ? ' text-green-400' : ' text-red-400'
                    }`}
            >
                {isConnected ? 'Connected' : 'Disconnected'}
            </span>
            <div className="mt-3">
                <p>Problem Title: {getEditorPost?.title}</p>
                <p className="mt-2">Description: {getEditorPost?.description}</p>
                <p className="mt-2">Required Tech:</p>
                {getEditorPost?.requiredtech.map((tech: string, index: number) => (
                    <Badge key={index} className="mr-2 mt-1">{tech}</Badge>
                ))}
            </div>

            <div className="mt-3 mb-3">
                <label className="block mb-2 font-medium">Language</label>
                <Select
                    value={language}
                    onValueChange={(value) => handleLanguageChange(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Languages</SelectLabel>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="typescript">TypeScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="cpp">C++</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                            <SelectItem value="css">CSS</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

               

            </div>
            <Button variant="destructive" className="w-full mb-4" onClick={leaveRoom}>Leave Room</Button>


            <div>
                <h3 className="font-bold mb-2">Online Users</h3>
                {users.map((userData) => (
                    <div key={userData.socketId} className="user-item">

                        <div>
                            <div className="flex justify-start items-center gap-2">
                                <Radio className=" text-red-500" />  {userData.username}
                                {userData.socketId === socketRef.current?.id && ' (You)'}
                            </div>
                            {typingUsers.includes(userData.username) && (
                                <>

                                    <BottomInd usernames={userData.username} />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div></div>
    )
}

export default RightSideBar