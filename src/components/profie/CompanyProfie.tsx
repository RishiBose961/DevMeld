import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Code, MessageSquareText } from "lucide-react"
import { Link } from "react-router"
import { Button } from "../ui/button"
const CompanyProfie = ({ value, id, postid }: { value: string, id: string, postid: string }) => {

    return (
        <Drawer>
            <DrawerTrigger className="cursor-pointer">{value}</DrawerTrigger>

            <DrawerContent className="max-w-6xl mx-auto w-96">
                <DrawerHeader className="text-left">
                    <DrawerTitle>{value}</DrawerTitle>
                    <DrawerDescription />
                </DrawerHeader>

                <DrawerFooter>
                    <div className="flex items-center gap-3">
                        <a href={`/community/${id}`}>
                            <Button variant="outline">
                                <MessageSquareText className="mr-2 h-4 w-4" />
                                Community
                            </Button>
                        </a>

                        <Link to={`/p/${postid}?tab=playground`}>
                            <Button variant="outline">
                                <Code className="mr-2 h-4 w-4" />
                                Playground
                            </Button>
                        </Link>

                        <DrawerClose asChild>
                            <Button variant="ghost">Cancel</Button>
                        </DrawerClose>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}

export default CompanyProfie