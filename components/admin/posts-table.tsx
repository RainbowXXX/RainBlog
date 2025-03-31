import Link from "next/link"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Post {
  id: number
  title: string
  status: string
  date: string
  author: {
    name: string
  }
  views?: number
}

interface PostsTableProps {
  posts: Post[]
}

export function PostsTable({ posts }: PostsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>标题</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>日期</TableHead>
            <TableHead>作者</TableHead>
            <TableHead className="text-right">浏览量</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <Link href={`/admin/posts/${post.id}`} className="font-medium hover:underline">
                  {post.title}
                </Link>
              </TableCell>
              <TableCell>
                <StatusBadge status={post.status} />
              </TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell>{post.author.name}</TableCell>
              <TableCell className="text-right">{post.views || 0}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">打开菜单</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>编辑</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash className="mr-2 h-4 w-4" />
                      <span>删除</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "published") {
    return <Badge variant="default">已发布</Badge>
  }
  if (status === "draft") {
    return <Badge variant="outline">草稿</Badge>
  }
  if (status === "scheduled") {
    return <Badge variant="secondary">已计划</Badge>
  }
  return null
}

