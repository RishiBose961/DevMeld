import { useSelector } from "react-redux";
import { AvatarFallback, Avatar } from "../ui/avatar";
import { Link } from "react-router";

const Avatars = () => {
    const { user } = useSelector(
        (state: {
            auth: {
                user: { username: string; _id: string, fullName: string };
            };
        }) => state.auth
    );

    const initials = user?.fullName
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    return (
        <Link to={`/dev/${user?.username}`}> <Avatar className="size-10 ring-1">
            <AvatarFallback className="bg-card">{initials}</AvatarFallback>
        </Avatar></Link>
    )
}

export default Avatars