/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Code, Loader2 } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import UsePayHook from "../hook/postHook/UsePayHook"

export default function JoinPay({
  id,
  postid,
  pay,
}: {
  id: string
  postid: string
  pay: number
}) {
  const [isChecked, setIsChecked] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)


  const { isPending, getPays } = UsePayHook({ postId: postid }) as {
    isPending: boolean
    getPays: any
  }
  const queryClient = useQueryClient();
  const { user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean
        user: { token: string; _id: string }
      }
    }) => state.auth
  )

  const navigate = useNavigate()

  const createWorkMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        "http://localhost:5000/api/c/work",
        { postId: postid },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      return res.data
    },
    onSuccess: () => {
      setIsSpinning(true)
      queryClient.invalidateQueries({ queryKey: ["getPayss"] });
      // Wait 3 seconds before navigating
      setTimeout(() => {
        setIsSpinning(false)
        navigate(`/code-solution/${id}/post/${postid}`)
      }, 3000)
    },
    onError: (err: any) => {
      console.error("Error creating work:", err)
      alert("Failed to join — please try again.")
      setIsChecked(false)
    },
  })

  const handleCheckChange = (checked: boolean) => {
    if (typeof checked === "boolean") {
      setIsChecked(checked)
      if (checked) {
        createWorkMutation.mutate()
      }
    }
  }

  return (
    <div className="flex flex-col mt-5 gap-6 p-8 bg-card rounded-lg border border-border shadow-lg">
      {isPending ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="animate-spin w-4 h-4" />
          <span>Loading status...</span>
        </div>
      ) : getPays ? (
        <>
          <p>You have joined </p>
          <Link
            to={`/code-solution/${postid}/post/${id}`}
            className="flex items-center space-x-2"
          >
            <button className="bg-primary flex text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/80 transition-colors">
              <Code className="mx-3" />
              Let me solve this
            </button>
          </Link>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Checkbox
              id="show-button"
              checked={isChecked}
              onCheckedChange={handleCheckChange}
              disabled={createWorkMutation.isPending || isSpinning}
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
            />
            <label
              htmlFor="show-button"
              className="text-sm font-medium text-foreground cursor-pointer"
            >
              Agree to our terms and conditions to Join Using {pay} Points{" "}
              <span className="text-red-500">
                (Once you check, points will be deducted)
              </span>
            </label>
          </div>

          {(createWorkMutation.isPending || isSpinning) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>Processing... please wait</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
