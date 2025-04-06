import Link from "next/link"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

interface PopularPost {
    id: number
    title: string
    views: number
    comments: number
    shares: number
}

interface PopularPostsProps {
    posts: PopularPost[]
}

export function PopularPosts({posts}: PopularPostsProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>文章</TableHead>
                    <TableHead className="text-right">浏览量</TableHead>
                    <TableHead className="text-right">评论</TableHead>
                    <TableHead className="text-right">分享</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {posts.map((post) => (
                    <TableRow key={post.id}>
                        <TableCell>
                            <Link href={`/admin/posts/${post.id}`} className="hover:underline">
                                {post.title}
                            </Link>
                        </TableCell>
                        <TableCell className="text-right">{post.views}</TableCell>
                        <TableCell className="text-right">{post.comments}</TableCell>
                        <TableCell className="text-right">{post.shares}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

