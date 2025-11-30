import EditorTheme from "@/components/hook/editorTheme/EditorTheme"
import useProfileDevHook from "@/components/hook/profileHook/useProfileDevHook"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { logoutUserAction } from "@/slice/authSlice"
import { LogOut, QrCode } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { SkillsDialog } from "../Skill/SkillEdit"
import TimeLineDev from "../TimeLine/TimeLineDev"
import { ReportCreate } from "./ReportCreate"

const UserProfile = () => {
  const { id } = useParams()

  const { user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        user: { token: string; _id: string; username: string };
      };
    }) => state.auth
  );

  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(logoutUserAction());
  };


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

  const { theme,
    handleThemeChange,
    themes } = EditorTheme();



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
      <div className="mt-4 w-fit space-x-3 lg:flex bg-card p-2 rounded-3xl">
        {/* {isAuthenticated && user?._id !== getProfileDev?._id && (
          <Button>
            <HeartHandshake />
            Follow
          </Button>
        )} */}


        <Button variant="secondary" className=" cursor-pointer">
          <QrCode />QR Code
        </Button>


        {
          user?._id === getProfileDev?._id && (
            <SkillsDialog />
          )
        }

        {
          user?._id === getProfileDev?._id && (
            <ReportCreate />

          )
        }

        {
          user?._id === getProfileDev?._id && (
            <>
              <select
                value={theme}
                onChange={handleThemeChange}
                className="
    w-20 p-2 rounded-md border 
    bg-white text-gray-900 
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
    focus:outline-none focus:ring-2 focus:ring-blue-500
  "
              >
                {themes.map((t) => (
                  <option
                    key={t}
                    value={t}
                    className="dark:bg-gray-800 dark:text-gray-100"
                  >
                    {t}
                  </option>
                ))}
              </select>
            </>

          )
        }



        {
          user?._id === getProfileDev?._id && (
            <Button onClick={handleLogout} variant="destructive" className=" cursor-pointer">
              <LogOut />Logout
            </Button>
          )
        }






      </div>

      <TimeLineDev id={getProfileDev?._id} />
    </div>
  )
}

export default UserProfile