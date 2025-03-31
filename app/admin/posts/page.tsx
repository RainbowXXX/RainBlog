"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, Filter, Grid3X3, List, MoreHorizontal, Plus, Search, Trash, X } from "lucide-react"
import { posts } from "@/lib/mock-data"

export default function PostsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Filter posts based on search term and status
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || post.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">文章管理</h1>
          <p className="text-muted-foreground mt-1">管理和发布您的博客文章</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-all duration-300">
            <Plus className="mr-2 h-4 w-4" />
            新建文章
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-1 w-full sm:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索文章..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-9 w-9"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="状态" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有状态</SelectItem>
                  <SelectItem value="published">已发布</SelectItem>
                  <SelectItem value="draft">草稿</SelectItem>
                  <SelectItem value="scheduled">已计划</SelectItem>
                </SelectContent>
              </Select>

              <div className="border rounded-md p-1 flex">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className={`h-8 w-8 ${viewMode === "list" ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className={`h-8 w-8 ${viewMode === "grid" ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">所有文章 ({posts.length})</TabsTrigger>
              <TabsTrigger value="published">
                已发布 ({posts.filter((p) => p.status === "published").length})
              </TabsTrigger>
              <TabsTrigger value="draft">草稿 ({posts.filter((p) => p.status === "draft").length})</TabsTrigger>
              <TabsTrigger value="scheduled">
                已计划 ({posts.filter((p) => p.status === "scheduled").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {viewMode === "list" ? <PostsTable posts={filteredPosts} /> : <PostsGrid posts={filteredPosts} />}
            </TabsContent>

            <TabsContent value="published" className="mt-0">
              {viewMode === "list" ? (
                <PostsTable posts={filteredPosts.filter((p) => p.status === "published")} />
              ) : (
                <PostsGrid posts={filteredPosts.filter((p) => p.status === "published")} />
              )}
            </TabsContent>

            <TabsContent value="draft" className="mt-0">
              {viewMode === "list" ? (
                <PostsTable posts={filteredPosts.filter((p) => p.status === "draft")} />
              ) : (
                <PostsGrid posts={filteredPosts.filter((p) => p.status === "draft")} />
              )}
            </TabsContent>

            <TabsContent value="scheduled" className="mt-0">
              {viewMode === "list" ? (
                <PostsTable posts={filteredPosts.filter((p) => p.status === "scheduled")} />
              ) : (
                <PostsGrid posts={filteredPosts.filter((p) => p.status === "scheduled")} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function PostsTable({ posts }: { posts: any[] }) {
  if (posts.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>标题</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>日期</TableHead>
            <TableHead>作者</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id} className="group">
              <TableCell>
                <div className="font-medium">{post.title}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</div>
              </TableCell>
              <TableCell>
                <StatusBadge status={post.status} />
              </TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell>{post.author.name}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">查看</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">编辑</span>
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">更多选项</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>删除</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function PostsGrid({ posts }: { posts: any[] }) {
  if (posts.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Card key={post.id} className="group overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
              <StatusBadge status={post.status} />
            </div>
            <CardDescription className="line-clamp-2 mt-1">{post.excerpt}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{post.date}</span>
              <span className="text-muted-foreground">{post.author.name}</span>
            </div>
          </CardContent>
          <div className="bg-muted p-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/blog/${post.slug}`}>
                <Eye className="mr-2 h-4 w-4" />
                查看
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/admin/posts/${post.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                编辑
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              删除
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "published") {
    return (
      <Badge variant="default" className="bg-green-600 hover:bg-green-700">
        已发布
      </Badge>
    )
  }
  if (status === "draft") {
    return <Badge variant="outline">草稿</Badge>
  }
  if (status === "scheduled") {
    return <Badge variant="secondary">已计划</Badge>
  }
  return null
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <Search className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">没有找到文章</h3>
      <p className="text-muted-foreground mt-2 mb-6 max-w-md">
        没有找到符合当前筛选条件的文章。请尝试调整筛选条件或创建新文章。
      </p>
      <Link href="/admin/posts/new">
        <Button className="bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-all duration-300">
          <Plus className="mr-2 h-4 w-4" />
          新建文章
        </Button>
      </Link>
    </div>
  )
}

