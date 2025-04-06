import Link from "next/link"
import {Button} from "@/components/ui/button"
import {ChevronLeft, ChevronRight} from "lucide-react"

interface PaginationProps {
    totalPages: number
    currentPage: number
}

export function Pagination({totalPages, currentPage}: PaginationProps) {
    return (
        <div className="flex justify-center items-center gap-1">
            <Button variant="outline" size="icon" disabled={currentPage === 1} asChild>
                <Link href={`/blog?page=${currentPage - 1}`}>
                    <ChevronLeft className="h-4 w-4"/>
                </Link>
            </Button>

            {Array.from({length: totalPages}).map((_, i) => {
                const page = i + 1
                return (
                    <Button key={page} variant={currentPage === page ? "default" : "outline"} size="icon" asChild>
                        <Link href={`/blog?page=${page}`}>{page}</Link>
                    </Button>
                )
            })}

            <Button variant="outline" size="icon" disabled={currentPage === totalPages} asChild>
                <Link href={`/blog?page=${currentPage + 1}`}>
                    <ChevronRight className="h-4 w-4"/>
                </Link>
            </Button>
        </div>
    )
}

