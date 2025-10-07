import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

const ChatMessage = ({
  isOwnMessage,
  handleUpdate,
  message,
  name,
  date,
  handleDelete
}: {
  isOwnMessage: boolean
  message: string
  name?: string
  date?: string
  handleDelete?: () => void
  handleUpdate?: () => void
}) => {
  const timestamp = date ? new Date(date) : new Date()
  const time = timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div
      className={cn("w-full flex gap-2 md:gap-3", isOwnMessage ? "justify-end" : "justify-start")}
      aria-label={`Message from ${name} at ${time}: ${message}`}
    >
      <ContextMenu>
        <ContextMenuTrigger asChild>
          {/* Bubble */}
          <div
            className={cn(
              "relative max-w-[78%] md:max-w-[68%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed text-pretty cursor-pointer",
              "after:content-[''] after:absolute after:top-4 after:w-2 after:h-2 after:rotate-45 after:bg-inherit",
              isOwnMessage
                ? "bg-primary text-primary-foreground after:right-[-6px]"
                : "bg-accent text-foreground after:left-[-6px]",
            )}
            role="group"
          >
            <div
              className={cn(
                "mb-1.5 flex items-baseline gap-2 text-[11px]",
                isOwnMessage ? "text-primary-foreground/80" : "text-muted-foreground",
              )}
            >
              <span className="font-medium">{name}</span>
              <time className="tabular-nums" dateTime={timestamp.toISOString()}>
                {time}
              </time>
            </div>

            <p className="text-sm whitespace-pre-wrap">{message}</p>
          </div>
        </ContextMenuTrigger>

        {/* Context Menu Options */}
        <ContextMenuContent>
          <ContextMenuItem onClick={() => navigator.clipboard.writeText(message)}>
            Copy
          </ContextMenuItem>
          <ContextMenuItem onClick={() => alert("Reply feature coming soon!")}>
            Reply
          </ContextMenuItem>
          {isOwnMessage && (
            <ContextMenuItem onClick={handleDelete}>
              Delete
            </ContextMenuItem>
          )}
          {isOwnMessage && (
            <ContextMenuItem onClick={handleUpdate}>
              Edit
            </ContextMenuItem>
          )}
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}

export default ChatMessage
