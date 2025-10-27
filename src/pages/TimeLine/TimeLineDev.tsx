import UseTimeLineHook from "@/components/hook/postHook/UseTimeLineHook";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router";
import { Loader2 } from "lucide-react"; // optional loading icon

const TimeLineDev = ({ id }: { id: string }) => {
    const { isPending, getTimeLine } = UseTimeLineHook({ timelineid: id }) as {
        isPending: boolean;
        getTimeLine: Array<{
            _id: string;
            userId: { fullName: string; username: string };
            code: string;
            language: string;
            createdAt?: string;
            topicId?: { _id: string; title: string };
        }>;
    }

    return (
        <div className="mt-4">
            {isPending ? (
                <div className="flex items-center justify-center text-gray-500 py-6">
                    <Loader2 className="animate-spin mr-2" /> Loading...
                </div>
            ) : getTimeLine?.length === 0 ? (
                <div className="text-center text-gray-500 py-6">No activity found</div>
            ) : (
                <ol className="relative border-s border-gray-200 dark:border-gray-700 pl-6">
                    {getTimeLine.map((post, index) => (
                        <li key={index} className="mb-10 ms-2">
                            {/* Avatar on the timeline line */}
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                <Link to={`/dev/${post?.userId?.username}`}>
                                    <Avatar className="size-8">
                                        <AvatarImage
                                            src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${post?.userId?.username}`}
                                        />
                                        <AvatarFallback>
                                            {post?.userId?.username?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>
                            </span>

                            {/* Card Content */}
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                                <div>
                                    <time className="text-xs text-gray-400 mb-2 sm:mb-0">
                                        {post?.createdAt
                                            ? new Date(post.createdAt).toLocaleString()
                                            : "just now"}
                                    </time>
                                    <div className="text-sm text-gray-500 dark:text-gray-300">
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                                            {post?.userId?.username}
                                        </span>{" "}
                                        Recently Completed Submissions{" "}
                                        <Link
                                            to={`/p/${post?.topicId?._id}`}
                                            className="font-semibold text-gray-900 dark:text-white hover:underline"
                                        >
                                            {post?.topicId?.title}
                                        </Link>
                                        <span className="bg-gray-100 text-gray-800 text-xs font-normal px-2 py-0.5 rounded-sm ml-2 dark:bg-gray-600 dark:text-gray-300">
                                            {post?.language}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
};

export default TimeLineDev;
