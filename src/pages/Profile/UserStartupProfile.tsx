import useProfileStartupHook from "@/components/hook/profileHook/useProfileStartupHook"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Share2 } from "lucide-react"
import { useParams } from "react-router"
import { toast } from "sonner"
import ViewStartupProfile from "./ViewStartupProfile"


const UserStartupProfile = () => {
    const { id } = useParams()
    const { isPending, getProfileStartup } = useProfileStartupHook({ username: id ?? "" }) as {
        isPending: boolean;
        getProfileStartup: {
            _id: string;
            fullName: string;
            username: string;
            role: string;
            companyName: string;
            experienceLevel: string;
            about: string;
            createdAt: string;
            updatedAt: string;
            skills?: string[];
            emailAddress?: string;
            avatar?: string;
        };
    }

    function formatDate(iso: string) {
        try {
            const d = new Date(iso)
            return new Intl.DateTimeFormat(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(d)
        } catch {
            return iso
        }
    }

    const handleShare = () => {
        navigator.clipboard.writeText(`${window.location.origin}/startup/${getProfileStartup?.username}`)
        toast.success("Profile URL copied to clipboard! Share with friends.");
    }


    if (isPending) {
        return <div>Loading...</div>

    }

    return (
        <div className="mt-5">
            <Card>
                <CardHeader className="flex flex-row items-start gap-4">
                    <Avatar className="size-12">
                        <AvatarImage className=" bg-card ring-2 rounded-full" src={getProfileStartup?.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">loading</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-balance">{getProfileStartup?.fullName}</CardTitle>
                        <CardDescription className="text-pretty">
                            <span className="text-foreground/80">{getProfileStartup?.username}</span> •{" "}
                            <span className="capitalize">{getProfileStartup?.role}</span> •{" "}
                            <span className="capitalize">{getProfileStartup?.companyName}</span>
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="grid gap-6">
                    <div className="grid gap-2">
                        <h3 className="font-medium">Contact</h3>
                        <div className="grid grid-cols-1 gap-1 text-muted-foreground md:grid-cols-2">
                            <div>
                                <span className="text-foreground">Email:</span>{" "}
                                <a href={`mailto:${getProfileStartup?.emailAddress}`} className="underline underline-offset-4">
                                    {getProfileStartup?.emailAddress}
                                </a>
                            </div>
                        </div>
                    </div>



                    <div className="grid gap-2">
                        <h3 className="font-medium">Timestamps</h3>
                        <ul className="grid grid-cols-1 gap-1 text-muted-foreground md:grid-cols-2">
                            <li>
                                <span className="text-foreground">Created:</span> {formatDate(getProfileStartup?.createdAt)}
                            </li>
                            <li>
                                <span className="text-foreground">Updated:</span> {formatDate(getProfileStartup?.updatedAt)}
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
            <div className="mt-4 w-fit space-x-3 bg-card p-2 rounded-3xl">
                <Button
                    onClick={handleShare}
                >
                    <Share2 /> Share
                </Button>
            </div>
            <ViewStartupProfile id={getProfileStartup?._id} />
        </div>
    )
}

export default UserStartupProfile