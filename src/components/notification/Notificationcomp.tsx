import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Heart, MessageSquare, Settings, User, X } from "lucide-react"


import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"

// Mock notification data
const notifications = [
  {
    id: 1,
    type: "message",
    title: "New message from Sarah",
    description: "Hey! Are we still on for the meeting tomorrow?",
    time: "2 min ago",
    read: false,
    icon: MessageSquare,
  },
  {
    id: 2,
    type: "like",
    title: "Someone liked your post",
    description: "Your recent post about React hooks got 15 new likes",
    time: "1 hour ago",
    read: false,
    icon: Heart,
  },
  {
    id: 3,
    type: "system",
    title: "System update completed",
    description: "Your account settings have been successfully updated",
    time: "3 hours ago",
    read: true,
    icon: Settings,
  },
  {
    id: 4,
    type: "user",
    title: "New follower",
    description: "John Doe started following you",
    time: "1 day ago",
    read: true,
    icon: User,
  },
]



export const Notificationcomp = () => {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative p-2 transition-colors bg-transparent">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center justify-between px-2 py-2">
          <DropdownMenuLabel className="text-base font-semibold">Notifications</DropdownMenuLabel>
        
        </div>

        <DropdownMenuSeparator />

        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => {
                const IconComponent = notification.icon
                return (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex items-start gap-3 p-3 cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
                  >
                    <div className={`mt-0.5 `}>
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-sm font-medium leading-tight ${
                            notification.read ? "text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">{notification.description}</p>

                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </DropdownMenuItem>
                )
              })}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center py-2 text-sm font-medium text-primary">
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Notificationcomp
