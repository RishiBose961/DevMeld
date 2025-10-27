import useRankHook from "@/components/hook/creditHook/useRankHook";
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Mail, User } from "lucide-react"
import { Link } from "react-router";
import { toast } from "sonner";
const LeaderBoard = () => {
    const { isPending, getRankData } = useRankHook() as {
        isPending: boolean;
        getRankData: {
            credits: Array<{
                rank: number;
                userId: string;
                fullName: string;
                emailAddress: string;
                credits: number;
                username: string;
            }>;
        };
    };


    const handleCopyEmail = (email: string) => {
        navigator.clipboard.writeText(email);
        toast.success(`Email copied to clipboard: ${email}`,{
            duration: 3000
        });
    }

    return (
        <>
        <p className="text-2xl font-bold mt-2">Leaderboard</p>
        <div className="bg-card mt-3 rounded-xl p-2">
            <Table>
            <TableCaption>Rank Leaderboard</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Rank No</TableHead>
                    <TableHead>Name</TableHead>

                    <TableHead>Score</TableHead>
                    <TableHead className="text-center">Profile</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    isPending ? <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow> :
                    getRankData && getRankData.credits.map((data: {
                        rank: number;
                        userId: string;
                        fullName: string;
                        emailAddress: string;
                        username: string;
                        credits: number;
                    }, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{data.rank}</TableCell>
                            <TableCell>{data.fullName}</TableCell>

                            <TableCell>{data.credits}</TableCell>
                            <TableCell className="text-center space-x-2">
                                <Link to={`/dev/${data.username}`}><Button><User /></Button></Link>
                                <Button onClick={handleCopyEmail.bind(null, data.emailAddress)}><Mail /></Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
               
            </TableBody>
        </Table></div>
        </>
        
    )
}

export default LeaderBoard