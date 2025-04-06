"use client"

import type React from "react"
import {useState} from "react"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Switch} from "@/components/ui/switch"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ArrowLeft, CalendarIcon, ImageIcon, Save} from "lucide-react"
import {postsAPI} from "@/lib/api"
import {toast} from "@/hooks/use-toast"

export default function NewPostPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        excerpt: "",
        slug: "",
        status: "draft",
        categoryId: "",
        tags: [],
        featuredImage: "",
        publishDate: "",
        allowComments: true,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setPostData((prev) => ({...prev, [name]: value}))
    }

    const handleSelectChange = (name: string, value: string) => {
        setPostData((prev) => ({...prev, [name]: value}))
    }

    const handleSwitchChange = (name: string, checked: boolean) => {
        setPostData((prev) => ({...prev, [name]: checked}))
    }

    const generateSlug = () => {
        const slug = postData.title
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-")
        setPostData((prev) => ({...prev, slug}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await postsAPI.createPost(postData)
            toast({
                title: "文章已创建",
                description: postData.status === "published" ? "文章已成功发布" : "文章已保存为草稿",
            })
            router.push("/admin/posts")
        } catch (error) {
            toast({
                title: "创建失败",
                description: error instanceof Error ? error.message : "发生未知错误",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4"/>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">新建文章</h1>
                        <p className="text-muted-foreground mt-1">创建新的博客文章</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" disabled={isLoading}
                            onClick={() => handleSelectChange("status", "draft")}>
                        保存草稿
                    </Button>
                    <Button
                        className="bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-all duration-300"
                        disabled={isLoading}
                        onClick={() => handleSelectChange("status", "published")}
                    >
                        <Save className="mr-2 h-4 w-4"/>
                        发布
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Tabs defaultValue="content" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="content">内容</TabsTrigger>
                        <TabsTrigger value="seo">SEO</TabsTrigger>
                        <TabsTrigger value="settings">设置</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content">
                        <Card>
                            <CardHeader>
                                <CardTitle>文章内容</CardTitle>
                                <CardDescription>编写您的文章内容</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">标题</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={postData.title}
                                        onChange={handleInputChange}
                                        placeholder="输入文章标题"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label htmlFor="slug">别名</Label>
                                        <Button type="button" variant="ghost" size="sm" onClick={generateSlug}>
                                            生成别名
                                        </Button>
                                    </div>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        value={postData.slug}
                                        onChange={handleInputChange}
                                        placeholder="输入文章别名"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">摘要</Label>
                                    <Textarea
                                        id="excerpt"
                                        name="excerpt"
                                        value={postData.excerpt}
                                        onChange={handleInputChange}
                                        placeholder="输入文章摘要"
                                        className="min-h-[80px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">内容</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        value={postData.content}
                                        onChange={handleInputChange}
                                        placeholder="输入文章内容"
                                        className="min-h-[300px]"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="featuredImage">特色图片</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="featuredImage"
                                            name="featuredImage"
                                            value={postData.featuredImage}
                                            onChange={handleInputChange}
                                            placeholder="输入图片URL或上传图片"
                                        />
                                        <Button type="button" variant="outline" className="flex-shrink-0">
                                            <ImageIcon className="mr-2 h-4 w-4"/>
                                            上传
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="seo">
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO设置</CardTitle>
                                <CardDescription>优化文章的搜索引擎表现</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="seoTitle">SEO标题</Label>
                                    <Input id="seoTitle" placeholder="输入SEO标题（留空则使用文章标题）"/>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="seoDescription">SEO描述</Label>
                                    <Textarea
                                        id="seoDescription"
                                        placeholder="输入SEO描述（留空则使用文章摘要）"
                                        className="min-h-[80px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="seoKeywords">关键词</Label>
                                    <Input id="seoKeywords" placeholder="输入关键词，用逗号分隔"/>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="noindex">禁止索引</Label>
                                        <p className="text-sm text-muted-foreground">阻止搜索引擎索引此文章</p>
                                    </div>
                                    <Switch id="noindex"/>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle>文章设置</CardTitle>
                                <CardDescription>配置文章的分类、标签和其他设置</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">分类</Label>
                                    <Select
                                        value={postData.categoryId}
                                        onValueChange={(value) => handleSelectChange("categoryId", value)}
                                    >
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="选择分类"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">技术</SelectItem>
                                            <SelectItem value="2">设计</SelectItem>
                                            <SelectItem value="3">营销</SelectItem>
                                            <SelectItem value="4">创业</SelectItem>
                                            <SelectItem value="5">生活</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tags">标签</Label>
                                    <Input id="tags" placeholder="输入标签，用逗号分隔"/>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="publishDate">发布日期</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="publishDate"
                                            name="publishDate"
                                            type="datetime-local"
                                            value={postData.publishDate}
                                            onChange={handleInputChange}
                                        />
                                        <Button type="button" variant="outline" className="flex-shrink-0">
                                            <CalendarIcon className="mr-2 h-4 w-4"/>
                                            现在
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">状态</Label>
                                    <Select value={postData.status}
                                            onValueChange={(value) => handleSelectChange("status", value)}>
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="选择状态"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">草稿</SelectItem>
                                            <SelectItem value="published">已发布</SelectItem>
                                            <SelectItem value="scheduled">已计划</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="allowComments">允许评论</Label>
                                        <p className="text-sm text-muted-foreground">允许读者在此文章下发表评论</p>
                                    </div>
                                    <Switch
                                        id="allowComments"
                                        checked={postData.allowComments}
                                        onCheckedChange={(checked) => handleSwitchChange("allowComments", checked)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <CardFooter className="flex justify-end mt-6">
                    <Button
                        type="submit"
                        className="bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-all duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? "保存中..." : "保存文章"}
                    </Button>
                </CardFooter>
            </form>
        </div>
    )
}

