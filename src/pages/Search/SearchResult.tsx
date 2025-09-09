import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, HeartHandshake, User } from "lucide-react";
import { Link } from "react-router";

type SearchResultItem = {
    title?: string;
    _id: string;
    requiredtech?: string[];
    postedBy?: {
        username?: string;
        companyName?: string;
    };
    fullName?: string;
    username?: string;
};

type SearchResultProps = {
    getSearch?: {
        results: SearchResultItem[];
    };
};

const SearchResult = ({ getSearch }: SearchResultProps) => {

    return (
        <div className="grid grid-cols-3 mt-5 gap-4">{getSearch?.results.map((item, idx) => {
            if (item.title) {

                return (
                    <div key={idx} className="p-4 h-56 rounded-lg shadow">

                        <h2 className="text-lg font-bold">{item.title}</h2>

                        <div className=" space-y-4 mt-3 space-x-3">
                            {item.requiredtech?.map((tech: string, i: number) => (
                                <Badge
                                    key={`${tech}-${i}`}
                                    variant="secondary"
                                    className="bg-primary-foreground ring-1 text-foreground"
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>

                        <p className="text-xs text-gray-400">
                            Posted by: {item.postedBy?.username || "Unknown"}
                        </p>
                        <p>{item.postedBy?.companyName}</p>
                        <div className=" space-x-3 pt-2">
                            <Link to={`/p/${item._id}`}> <Button><Eye /></Button></Link>

                        </div>
                    </div>
                );
            } else {
                return (
                    <div key={idx} className="p-4  h-56 text-center bg-primary/20  rounded-lg shadow">
                        <div className="flex justify-center">
                            <img className="size-20 rounded-full" src={"https://images.unsplash.com/photo-1757377125320-cf0d54c0c6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"} alt="avatar" />
                        </div>
                        <Badge className=" font-bold bg-cyan-400">Developer</Badge>
                        <h2 className="text-lg font-bold">{item.fullName}</h2>
                        <p className="text-sm ">{item.username}</p>
                        <div className=" space-x-3 pt-2">
                            <Button><User /></Button>
                            <Button><HeartHandshake /></Button>
                        </div>

                    </div>
                );
            }
        })}</div>
    )
}

export default SearchResult