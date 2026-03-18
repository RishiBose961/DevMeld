/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from "@tanstack/react-query"
import { Progress } from "../ui/progress"
import React from "react"
import { useSelector } from "react-redux"

const Rankupcomp = () => {
const { user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        user: { token: string; _id: string };
      };
    }) => state.auth
  );
 
  const token = user?.token || localStorage.getItem("token")

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("No token found")

      const res = await fetch("http://localhost:5000/api/create/level", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          levelno: 1,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        // 🔥 show backend error
        throw new Error(result?.message || "Failed to fetch XP")
      }

      return result
    },
  })

  // ✅ run only when token exists
  React.useEffect(() => {
    if (token) {
      mutate()
    }
  }, [token])

  const totalXP = data?.xp || 0

  // 🔥 LEVEL LOGIC
  let level = 1
  let xpNeeded = 5
  let remainingXP = totalXP

  while (remainingXP >= xpNeeded) {
    remainingXP -= xpNeeded
    level++
    xpNeeded = 5 * Math.pow(2, level - 1)
  }

  const progress = (remainingXP / xpNeeded) * 100

  if (!token) return <div>Please login</div>
  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <div className="bg-card mt-3 rounded-xl p-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span>Level {level}</span>
        <span>{remainingXP}/{xpNeeded}</span>
      </div>

      <Progress value={progress} className="w-full" />
    </div>
  )
}

export default Rankupcomp