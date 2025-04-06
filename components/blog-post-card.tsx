import Link from "next/link"
import Image from "next/image"
import {CalendarIcon, UserIcon} from "lucide-react"

interface BlogPostCardProps {
    title: string
    excerpt: string
    slug: string
    date: string
    author: string
    image: string
}

export function BlogPostCard({title, excerpt, slug, date, author, image}: BlogPostCardProps) {
    return (
        <Link href={`/blog/${slug}`} className="group block">
            <div className="overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-md">
                <div className="relative h-52 w-full overflow-hidden">
                    <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-5">
                    <h3 className="line-clamp-2 text-xl font-semibold group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {title}
                    </h3>

                    <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4"/>
                            <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <UserIcon className="h-4 w-4"/>
                            <span>{author}</span>
                        </div>
                    </div>

                    <p className="mt-3 line-clamp-3 text-muted-foreground">{excerpt}</p>

                    <div className="mt-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                        阅读更多
                        <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

