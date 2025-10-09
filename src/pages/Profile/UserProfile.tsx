import useProfileDevHook from "@/components/hook/profileHook/useProfileDevHook"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartHandshake, QrCode } from "lucide-react"
import { useParams } from "react-router"

const UserProfile = () => {
  const { id } = useParams()


  const { isPending, getProfileDev } = useProfileDevHook({ username: id as string }) as {
    isPending: boolean;
    getProfileDev: {
      _id: string;
      fullName: string;
      username: string;
      role: string;
      experienceLevel: string;
      about: string;
      createdAt: string;
      updatedAt: string;
      skills?: string[];
      emailAddress?: string;
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

  const initials = getProfileDev?.fullName
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()


  if (isPending) {
    return <div>Loading...</div>

  }

  return (
    <div className="mt-5">
      <Card>
        <CardHeader className="flex flex-row items-start gap-4">
          <Avatar className="size-12">
            <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-balance">{getProfileDev?.fullName}</CardTitle>
            <CardDescription className="text-pretty">
              <span className="text-foreground/80">{getProfileDev?.username}</span> •{" "}
              <span className="capitalize">{getProfileDev?.role}</span> •{" "}
              <span className="capitalize">{getProfileDev?.experienceLevel}</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <h3 className="font-medium">Contact</h3>
            <div className="grid grid-cols-1 gap-1 text-muted-foreground md:grid-cols-2">
              <div>
                <span className="text-foreground">Email:</span>{" "}
                <a href={`mailto:${getProfileDev?.emailAddress}`} className="underline underline-offset-4">
                  {getProfileDev?.emailAddress}
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="font-medium">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {getProfileDev?.skills?.length ? (
                getProfileDev?.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="capitalize">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground">No skills listed.</p>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="font-medium">Timestamps</h3>
            <ul className="grid grid-cols-1 gap-1 text-muted-foreground md:grid-cols-2">
              <li>
                <span className="text-foreground">Created:</span> {formatDate(getProfileDev?.createdAt)}
              </li>
              <li>
                <span className="text-foreground">Updated:</span> {formatDate(getProfileDev?.updatedAt)}
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 w-fit space-x-3 bg-card p-2 rounded-3xl">
        <Button>
          <HeartHandshake />Follow</Button>
        <Button>
          <QrCode />QR Code</Button>
       
      </div>
    </div>
  )
}

export default UserProfile