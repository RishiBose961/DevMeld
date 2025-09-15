import UseSearchHook from "@/components/hook/searchhOOK/UseSearchHook"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScanQrCode, Search, SearchIcon, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useLocation, useSearchParams } from "react-router"
import SearchResult from "./SearchResult"
import SearchHistory from "./SearchHistory"

const SearchPage = () => {
  const location = useLocation()
  const valueloc = location.pathname.split("/")[1]

  const [searchParams, setSearchParams] = useSearchParams()
  const queryParam = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [isFocused] = useState(valueloc)

  // hook only runs when queryParam changes
  const { isPending, getSearch } = UseSearchHook(queryParam) as {
    isPending: boolean
    getSearch: {
      results: SearchResultItem[]
    }
  }

  type SearchResultItem = {
    _id: string
    title: string
    description?: string
  }

  // update input field only
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }


  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setSearchParams({ q: searchQuery })
    } else {
      setSearchParams({})
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchParams({})
  }

  useEffect(() => {
    setSearchQuery(queryParam)
  }, [queryParam])


    if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex-1 mt-10 mx-3 lg:mx-8">
      <div>
        <p className="text-5xl font-bold text-center mb-4">
          DevMeld
          <span className="mx-3 text-blue-500 text-2xl">Search</span>
        </p>
      </div>

      <div
        className={`relative transition-all duration-300 ${
          isFocused ? "transform scale-105" : ""
        }`}
      >
        <div
          className={`relative bg-white dark:bg-gray-800 rounded-full border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
            isFocused
              ? "border-blue-500 shadow-2xl ring-4 ring-blue-100 dark:ring-blue-900/30"
              : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
          }`}
        >
          {/* Left search icon */}
          <Search
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
              isFocused ? "text-blue-500" : "text-gray-400"
            }`}
          />

          {/* Input field */}
          <Input
            type="text"
            placeholder="Search the DevMeld"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // 🔹 press Enter to search
            className="pl-12 pr-24 py-4 text-lg bg-transparent border-0 rounded-full focus:ring-0 focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />

          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            )}

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

            {/* Search button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSearch}
              disabled={isPending}
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Search now"
            >
              {isPending ? (
                <span className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></span>
              ) : (
                <SearchIcon className="h-4 w-4 text-blue-500" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Search by image"
            >
              <ScanQrCode className="h-4 w-4 text-green-500" />
            </Button>
          </div>
        </div>
      </div>

      <SearchResult getSearch={getSearch} />

      <SearchHistory/>
    </div>
  )
}

export default SearchPage
