/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TriangleAlertIcon } from "lucide-react";

import UseReportBan from "@/components/hook/postHook/UseReportBan";

export function ReportCreate() {
    const { user } = useSelector((state: any) => state.auth);

    const { isPending, blockBan } = UseReportBan() as {
        isPending: boolean;
        blockBan: Array<{
            _id: string;
            blockcompany: string;
            reason: string;
            blocker: string;
        }>;
    };

    const [selected, setSelected] = useState<string | null>(null);
    const [reason, setReason] = useState("");

    const { mutate, isPending: isSending } = useMutation({
        mutationFn: async (payload: { blocker: string; blocked: string; reason: string }) =>
            axios.post("http://localhost:5000/api/create/unblock", payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
            }),

        onSuccess: () => {
            alert("Unblock request sent!");
            setSelected(null);
            setReason("");
        },

        onError: () => {
            alert("Failed to send request");
        },
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const item = blockBan?.find((i) => i._id === selected);



        if (!item) return alert("Please select company");
        if (!reason) return alert("Please enter reason");

        mutate({
            blocker: item.blocker,
            blocked: user._id,
            reason,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer bg-orange-500 text-white hover:bg-orange-600">
                    <TriangleAlertIcon className="size-5" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Request To Remove Ban</DialogTitle>
                        <DialogDescription>
                            Select company and provide reason.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 mt-4">

                        {isPending && <p>Loading...</p>}

                        {!isPending &&
                            blockBan?.map((item: { _id: string; blockcompany: string; reason: string; blocker: string }) => (
                                <div
                                    key={item._id}
                                    className="p-4 bg-red-100 text-red-800 ring-1 rounded-lg flex justify-between"
                                >
                                    <div>
                                        <p>Company: {item.blockcompany}</p>
                                        <p className="font-medium">Reason: {item.reason}</p>
                                    </div>

                                    <Checkbox
                                        checked={selected === item._id}
                                        onCheckedChange={(value) =>
                                            setSelected(value ? item._id : null)
                                        }
                                    />
                                </div>
                            ))}

                        {/* Reason Input */}
                        {selected && (
                            <div className="grid gap-3">
                                <Label htmlFor="reason">Your Reason</Label>
                                <Input
                                    id="reason"
                                    placeholder="Enter your reason..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        {
                            blockBan?.length === 0 ? null : (<Button type="submit" disabled={isSending}>
                                {isSending ? "Sending..." : "Submit Request"}
                            </Button>)
                        }

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
