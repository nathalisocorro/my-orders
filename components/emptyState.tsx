import { SearchAlert } from "lucide-react";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";

export default function EmptyContent() {
    return (
        <div className="grid place-items-center w-full h-full">
            <Empty>
                <EmptyHeader>
                <EmptyTitle>
                    No data found
                </EmptyTitle>
                </EmptyHeader>
                <EmptyDescription>
                    Add new elements to the list and they will be displayed here
                </EmptyDescription>
            </Empty>
        </div>
    )
}