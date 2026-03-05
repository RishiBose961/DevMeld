import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
const HoverProfile = ({ username }: { username: string }) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <span className="cursor-pointer">{username}</span>
            </HoverCardTrigger>
            <HoverCardContent>
                <p className="text-xs">
                    Hello {username}, stay focused and never stop learning.
                </p>
            </HoverCardContent>
        </HoverCard>
    )
}

export default HoverProfile