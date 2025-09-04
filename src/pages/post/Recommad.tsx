import UseRecommd from "@/components/hook/recommadationHook/UseRecommd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Coins, Eye, User, Users } from "lucide-react";
import { Link } from "react-router";

const Recommad = () => {
  const { isPending, getRecommad } = UseRecommd() as {
    isPending: boolean;
    getRecommad: Array<{
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
  };

  if (isPending) {
    return <div>Loading...</div>;
  }


 
  return (
    <>
      <p className="text-xl font-bold">Recommendation</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-3 mb-5">
        {getRecommad?.map(
          (item: {
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
                      {item.postedBy.companyName}
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
                <p className="text-sm leading-relaxed text-pretty">
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
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="size-4 text-blue-600" aria-hidden />
                    <span className="sr-only">Participants:</span>
                    <span>0/{item.noofparticipants ?? "—"}</span>
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
      </div>
    </>
  );
};

export default Recommad;
