import UseStartupProfile from "@/components/hook/profileHook/UseStartupProfile"
import CompanyProfie from "@/components/profie/CompanyProfie";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Building2, Eye, HandCoins, HandHeart, User } from "lucide-react";
import { Link } from "react-router";


interface StartupProfileItem {
    _id: string;
    title: string;
    description: string;
    pay?: number;
    credits?: number;
    requiredtech?: string[];
    postedBy?: {
        _id: string;
        username?: string;
        companyName?: string;
    };
}
const ViewStartupProfile = ({ id }: { id: string }) => {
    const { isPending, getProfileStartup } = UseStartupProfile({ id }) as {
        isPending: boolean;
        getProfileStartup: StartupProfileItem[];
    }

    return (
        <div>
            {
                isPending ? <div>Loading...</div> :
                    getProfileStartup?.length === 0 ? <div>No Posts Found</div> :
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                            {
                                getProfileStartup?.map((item: StartupProfileItem) => (
                                    <>
                                        <Card className="group relative flex flex-col overflow-hidden  transition-all hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10">
                                            <CardHeader className="pb-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="space-y-1">
                                                        <h3 className="font-semibold leading-tight tracking-tight  group-hover:text-blue-400 transition-colors">
                                                            {item.title}

                                                        </h3>
                                                        <div className="flex items-center gap-3 text-xs text-zinc-400">
                                                            <div className="flex items-center gap-1">
                                                                {item.postedBy?.companyName ? (
                                                                    <span className="inline-flex items-center gap-1">
                                                                        <Building2 className="size-4" aria-hidden />
                                                                        <span className="sr-only">Company:</span>
                                                                        <CompanyProfie value={item.postedBy.companyName} postid={item._id} id={item.postedBy._id ?? ""} />

                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                            <div className="flex items-center gap-1">

                                                                {item.postedBy?.username ? (
                                                                    <Link to={`/startup/${item?.postedBy?.username}`}>
                                                                        <div className="flex items-center space-x-1 cursor-pointer">
                                                                            <User className="size-4" />
                                                                            <span>{item?.postedBy?.username}</span>

                                                                        </div>
                                                                    </Link>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="flex-1 pb-4">
                                                <p className="mb-6 text-sm leading-relaxed text-zinc-400 line-clamp-3">{item.description}</p>

                                                <div className="flex flex-wrap gap-1.5">
                                                    {item.requiredtech && item.requiredtech.length > 0 ? (item.requiredtech.map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="outline"
                                                            className="px-2 py-0.5 text-xs font-normal"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))) : null}
                                                </div>
                                            </CardContent>

                                            <CardFooter className="flex items-center justify-between pt-2">
                                                <div className="flex items-center gap-4 text-sm font-medium">
                                                    <div className="flex items-center gap-1.5 text-amber-400/90">
                                                        <HandCoins className="h-4 w-4" />
                                                        <span className="sr-only">Select Join Using Points</span>
                                                        <span className="font-medium">{item.pay ?? 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-rose-400/90">
                                                        <HandHeart className="size-5 " aria-hidden />
                                                        <span className="sr-only">Credits:</span>
                                                        <span className="font-medium">{item.credits ?? 0}</span>

                                                    </div>
                                                </div>

                                                <Link className="bg-blue-600 text-white p-3 rounded-full" to={`/p/${item._id}`} >
                                                    <Eye className="h-4 w-4 " />
                                                </Link>

                                            </CardFooter>


                                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                        </Card>

                                    </>
                                ))
                            }
                        </div>

            }
        </div>
    )
}

export default ViewStartupProfile