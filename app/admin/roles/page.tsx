import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Edit, MoreHorizontal, Plus, Shield, Trash} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {rolesAPI} from "@/lib/api"

export default async function RolesPage() {
    // Fetch roles using the API
    const roles = await rolesAPI.getAllRoles()

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">角色权限</h1>
                    <p className="text-muted-foreground mt-1">管理用户角色和权限</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4"/>
                    新建角色
                </Button>
            </div>

            <div className="flex items-center space-x-2 mb-4">
                <Input placeholder="搜索角色..." className="max-w-sm"/>
                <Button variant="outline">搜索</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>所有角色</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>名称</TableHead>
                                <TableHead>别名</TableHead>
                                <TableHead>用户数</TableHead>
                                <TableHead>描述</TableHead>
                                <TableHead className="text-right">操作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow key={role.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            {role.slug === "admin" && <Shield className="h-4 w-4 text-primary"/>}
                                            {role.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{role.slug}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{role.userCount}</Badge>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">{role.description}</TableCell>
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
                                                <DropdownMenuItem className="text-destructive"
                                                                  disabled={role.slug === "admin"}>
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

