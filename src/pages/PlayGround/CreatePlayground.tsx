/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Grape } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useSelector } from "react-redux"

export function CreatePlayground({ postId }: { postId: string }) {
  const navigate = useNavigate()

  const { user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean
        user: { token: string; _id: string }
      }
    }) => state.auth
  )
  const [newRoom, setNewRoom] = useState({
    playgroundName: "",
    language: "javascript",
    isPublic: true,
    postId: postId,
  })

  const createPlaygroundMutation = useMutation({
    mutationFn: async (data: typeof newRoom) => {
      const response = await axios.post(
        "http://localhost:5000/api/create/playground",
        data,{
            headers: {
                 Authorization: `Bearer ${user?.token}`,
              },
        }
      )
      return response.data
    },
    onSuccess: (data) => {
      // Navigate to new room
      navigate(`/playground/${data?.playgroundName}`)
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || "Failed to create room")
    },
  })

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault()
    createPlaygroundMutation.mutate(newRoom)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="cursor-pointer">
          <Grape />
          Create Playground
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleCreateRoom}>
          <DialogHeader>
            <DialogTitle>Playground</DialogTitle>
            <DialogDescription>
              Create your coding playground to practice and enhance your skills.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Playground Name</Label>
              <Input
                id="name-1"
                placeholder="Enter Playground Name"
                value={newRoom.playgroundName}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, playgroundName: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="language">Language</Label>
              <Select
                value={newRoom.language}
                onValueChange={(value) =>
                  setNewRoom({ ...newRoom, language: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a language</SelectLabel>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <label className="mt-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newRoom.isPublic}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, isPublic: e.target.checked })
                  }
                />
                <span>Public Room</span>
              </label>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={createPlaygroundMutation.isPending}
            >
              {createPlaygroundMutation.isPending
                ? "Creating..."
                : "Create Playground"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
