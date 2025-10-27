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
import { Users } from "lucide-react"
import { Button } from "../ui/button"
const CompanyProfie = ({ value, id }: { value: string, id: string }) => {
    return (
        <Drawer >
            <DrawerTrigger className=" cursor-pointer">{value}</DrawerTrigger>

            <DrawerContent className=" max-w-6xl mx-auto w-96" >
                <DrawerHeader>
                    <DrawerTitle className="text-left">{value}</DrawerTitle>
                    <DrawerDescription className="text-left">This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter >
                    <div className="pb-3 space-x-3">
                        
                        <a href={`/community/${id}`}>
                            <Button className="cursor-pointer" variant="outline">
                                <Users /> Community
                            </Button>
                        </a>

                        <DrawerClose className=" cursor-pointer">

                            Cancel
                        </DrawerClose>
                    </div>


                </DrawerFooter>
            </DrawerContent>

        </Drawer>
    )
}

export default CompanyProfie