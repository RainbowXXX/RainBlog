import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Trash } from "lucide-react"
import { tagsAPI } from "@/lib/api"

export default async function TagsPage() {
  // Fetch tags using the API
  const tags = await tagsAPI.getAllTags()

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">标签管理</h1>
          <p className="text-muted-foreground mt-1">管理博客文章标签</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建标签
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <Input placeholder="搜索标签..." className="max-w-sm" />
        <Button variant="outline">搜索</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>所有标签</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {tags.map((tag) => (
              <Card key={tag.id} className="group overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{tag.name}</h3>
                    <p className="text-sm text-muted-foreground">别名: {tag.slug}</p>
                    <Badge variant="outline" className="mt-2">
                      {tag.postCount} 篇文章
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">编辑</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">删除</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

