/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function GithubButton() {
    const [username, setUsername] = useState("");

    const { user } = useSelector(
        (state: {
            auth: {
                isAuthenticated: boolean;
                user: { token: string; _id: string; username: string; githubProfile?: string };
            };
        }) => state.auth
    );


    // 🔥 Mutation
    const mutation = useMutation({
        mutationFn: async (githubProfile: string) => {
            const res = await fetch("http://localhost:5000/api/update/github", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({ githubProfile }),
            });

            if (!res.ok) {
                throw new Error("Failed to update");
            }

            return res.json();
        },
        onSuccess: () => {
            alert("GitHub username saved!");
        },
        onError: (error: any) => {
            console.error(error);
            alert(error.message || "Something went wrong");
        },
    });

    const handleShare = () => {
        const url = prompt("Enter GitHub profile URL:");

        if (!url) return;

        try {
            const parts = url.split("github.com/");
            const name = parts[1]?.split("/")[0];

            if (name) {
                setUsername(name);

                // 🔥 Call API
                mutation.mutate(name);
            } else {
                alert("Invalid GitHub URL");
            }
        } catch (err) {
            alert("Error parsing URL");
        }
    };

    return (
        <>
            {
                user?.githubProfile ? (
                    <Button variant="outline" >
                        {user.githubProfile}
                    </Button>
                ) : <Button onClick={handleShare} variant="outline" className="cursor-pointer">
                    {mutation.isPending ? "Saving..." : username || "Enter GitHub"}
                </Button>
            }

        </>

    );
}