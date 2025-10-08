import UseHistorySearch from "@/components/hook/searchhOOK/UseHistorySearch";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

const SearchHistory = () => {
    type SearchHistoryItem = string;
    const { isPending, search } = UseHistorySearch() as { isPending: boolean; search: SearchHistoryItem[] }

    if (isPending) {
        return <>
            <p>LOADING</p>

        </>
    }
    return (
        <div className="mt-5">
            {search?.length === 0 ? "" : <p className="text-xl font-bold">Search History</p>}
            <div className="flex flex-wrap gap-2 mt-2">

                {search?.map((search: SearchHistoryItem, index: number) => (
                    <Link key={index} to={`/search?q=${search}`}>
                        <Badge className="cursor-pointer capitalize" key={index} variant="secondary">
                            <p className="p-1">{search}</p>
                        </Badge>
                    </Link>

                ))}
            </div>
        </div>

    )
}

export default SearchHistory