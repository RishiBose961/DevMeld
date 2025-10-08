import UseSearchRecommd from "@/components/hook/recommadationHook/UseSearchRecommd";
import LoadingFace from "@/components/Loading/LoadingFace";
import CompanyProfie from "@/components/profie/CompanyProfie";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Coins, Eye, User } from "lucide-react";
import { Link } from "react-router";
const SearchRecommad = () => {
  const { isPending, getSearchRecommd } = UseSearchRecommd() as {
    isPending: boolean;
    getSearchRecommd:Array<{
      _id: string;
      title: string;
      description: string;
      postedBy?: {
        username?: string;
        companyName?: string;
      };
      requiredtech?: string[];
      credits: number;
      noofparticipants?: number;
      createdAt?: string;
      duration?: string;
    }>;
  }

    if (isPending) {
    return <>
      <LoadingFace value={4} gridvalue={4}/>
    </>;
  }
  return (
    <div> {
      getSearchRecommd?.length > 0 &&  <p className="text-xl font-bold">You might be interested in</p>} 
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-3 mb-5">
        {Array.isArray(getSearchRecommd) && getSearchRecommd.map(
          (item: {
            _id: string;
            title: string;
            description: string;
            postedBy?: {
              username?: string;
              companyName?: string;
              _id?: string;
            };
            requiredtech?: string[];
            credits: number;
            noofparticipants?: number;
            createdAt?: string;
          }) => (
            <Card
              role="article"
              aria-labelledby={`rec-title-${item._id}`}
              className="transition-colors hover:border-blue-600 focus-within:border-blue-600"
            >
              <CardHeader className="gap-2">
                <CardTitle
                  id={`rec-title-${item._id}`}
                  className="text-pretty leading-tight"
                >
                  {item.title}
                </CardTitle>

                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  {item.postedBy?.companyName ? (
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="size-4" aria-hidden />
                      <span className="sr-only">Company:</span>
                      <CompanyProfie value={item.postedBy.companyName}  id={item.postedBy._id ?? ""} />  
                    
                    </span>
                  ) : null}
                  {item.postedBy?.username ? (
                    <span className="inline-flex items-center gap-1">
                      <User className="size-4" aria-hidden />
                      <span className="sr-only">Posted by:</span>
                      {item.postedBy.username}
                    </span>
                  ) : null}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-pretty line-clamp-2">
                  {item.description}
                </p>

                {item.requiredtech && item.requiredtech.length > 0 ? (
                  <div
                    className="flex flex-wrap gap-2"
                    aria-label="Required technologies"
                  >
                    {item.requiredtech.map((tech, i) => (
                      <Badge
                        key={`${tech}-${i}`}
                        variant="secondary"
                        className="bg-primary-foreground ring-1 text-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                ) : null}

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Coins className="size-4 text-amber-500" aria-hidden />
                    <span className="sr-only">Credits:</span>
                    <span className="font-medium">{item.credits}</span>
                  </div>


                  <Link to={`/p/${item._id}`} >
                    <Button className="cursor-pointer">
                      <Eye className="size-4" />
                    </Button>
                  </Link>


                </div>
              </CardContent>

              <CardFooter>

              </CardFooter>
            </Card>
          )
        )}
      </div></div>
  )
}

export default SearchRecommad