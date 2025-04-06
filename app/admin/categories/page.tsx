import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Edit, MoreHorizontal, Plus, Trash} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {categoriesAPI} from "@/lib/api"

export default async function CategoriesPage() {
    // Fetch categories using the API
    const categories = await categoriesAPI.getAllCategories()

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">分类管理</h1>
                    <p className="text-muted-foreground mt-1">管理博客文章分类</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4"/>
                    新建分类
                </Button>
            </div>

            <div className="flex items-center space-x-2 mb-4">
                <Input placeholder="搜索分类..." className="max-w-sm"/>
                <Button variant="outline">搜索</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>所有分类</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>名称</TableHead>
                                <TableHead>别名</TableHead>
                                <TableHead>文章数</TableHead>
                                <TableHead>描述</TableHead>
                                <TableHead className="text-right">操作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.name}</TableCell>
                                    <TableCell>{category.slug}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{category.postCount}</Badge>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4"/>
                                                    <span className="sr-only">打开菜单</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4"/>
                                                    <span>编辑</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash className="mr-2 h-4 w-4"/>
                                                    <span>删除</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

