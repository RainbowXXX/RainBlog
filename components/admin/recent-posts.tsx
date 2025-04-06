import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

interface RecentPost {
    id: number
    title: string
    author: string
    date: string
    views: number
}

interface RecentPostsProps {
    posts: RecentPost[]
}

export function RecentPosts({posts}: RecentPostsProps) {
    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <div key={post.id} className="flex justify-between border-b pb-4">
                    <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={post.author}/>
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <Link href={`/admin/posts/${post.id}`} className="font-medium hover:underline">
                                {post.title}
                            </Link>
                            <div className="text-xs text-muted-foreground">
                                {post.author} • {post.date}
                            </div>
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{post.views} 浏览</div>
                </div>
            ))}
            <div className="text-center pt-4">
                <Link href="/admin/posts" className="text-sm text-primary hover:underline">
                    查看所有文章
                </Link>
            </div>
        </div>
    )
}

