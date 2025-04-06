import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Switch} from "@/components/ui/switch"

export default function GeneralSettingsPage() {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-bold">基本设置</h1>
                <p className="text-muted-foreground mt-1">管理博客的基本配置</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="general">基本信息</TabsTrigger>
                    <TabsTrigger value="reading">阅读设置</TabsTrigger>
                    <TabsTrigger value="discussion">讨论设置</TabsTrigger>
                    <TabsTrigger value="media">媒体设置</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>站点信息</CardTitle>
                            <CardDescription>设置您的博客基本信息</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="site-title">站点标题</Label>
                                    <Input id="site-title" defaultValue="博客平台"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="site-tagline">站点副标题</Label>
                                    <Input id="site-tagline" defaultValue="专业内容创作"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="site-description">站点描述</Label>
                                <Textarea id="site-description" defaultValue="一个专业的内容创作和分享平台"/>
                                <p className="text-sm text-muted-foreground">简短描述您的站点，这将显示在搜索引擎结果中</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="site-url">站点地址 (URL)</Label>
                                    <Input id="site-url" defaultValue="https://example.com"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="admin-email">管理员邮箱</Label>
                                    <Input id="admin-email" type="email" defaultValue="admin@example.com"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timezone">时区</Label>
                                <Select defaultValue="Asia/Shanghai">
                                    <SelectTrigger id="timezone">
                                        <SelectValue placeholder="选择时区"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Asia/Shanghai">中国标准时间 (UTC+8)</SelectItem>
                                        <SelectItem value="America/New_York">美国东部时间 (UTC-5)</SelectItem>
                                        <SelectItem value="Europe/London">格林威治标准时间 (UTC+0)</SelectItem>
                                        <SelectItem value="Europe/Paris">中欧时间 (UTC+1)</SelectItem>
                                        <SelectItem value="Asia/Tokyo">日本标准时间 (UTC+9)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>保存更改</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="reading">
                    <Card>
                        <CardHeader>
                            <CardTitle>阅读设置</CardTitle>
                            <CardDescription>配置博客的阅读体验</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="posts-per-page">每页显示文章数</Label>
                                <Input id="posts-per-page" type="number" defaultValue="10"/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="show-full-content">在首页显示完整文章内容</Label>
                                    <p className="text-sm text-muted-foreground">启用后将在首页显示完整文章而非摘要</p>
                                </div>
                                <Switch id="show-full-content"/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="related-posts">显示相关文章</Label>
                                    <p className="text-sm text-muted-foreground">在文章底部显示相关文章推荐</p>
                                </div>
                                <Switch id="related-posts" defaultChecked/>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>保存更改</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="discussion">
                    <Card>
                        <CardHeader>
                            <CardTitle>讨论设置</CardTitle>
                            <CardDescription>配置评论和用户交互</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="enable-comments">允许评论</Label>
                                    <p className="text-sm text-muted-foreground">允许访问者在文章下方发表评论</p>
                                </div>
                                <Switch id="enable-comments" defaultChecked/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="comment-moderation">评论审核</Label>
                                    <p className="text-sm text-muted-foreground">评论需要管理员审核后才能显示</p>
                                </div>
                                <Switch id="comment-moderation"/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="comment-notification">评论通知</Label>
                                    <p className="text-sm text-muted-foreground">当有新评论时发送邮件通知</p>
                                </div>
                                <Switch id="comment-notification" defaultChecked/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="comment-blacklist">评论黑名单</Label>
                                <Textarea id="comment-blacklist" placeholder="输入关键词，每行一个"/>
                                <p className="text-sm text-muted-foreground">包含这些关键词的评论将被自动标记为垃圾评论</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>保存更改</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="media">
                    <Card>
                        <CardHeader>
                            <CardTitle>媒体设置</CardTitle>
                            <CardDescription>配置图片和媒体文件</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="thumbnail-size">缩略图尺寸</Label>
                                    <Input id="thumbnail-size" defaultValue="150x150"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="medium-size">中等尺寸</Label>
                                    <Input id="medium-size" defaultValue="300x300"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="large-size">大尺寸</Label>
                                    <Input id="large-size" defaultValue="1024x1024"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="image-compression">图片压缩</Label>
                                    <p className="text-sm text-muted-foreground">自动压缩上传的图片以提高性能</p>
                                </div>
                                <Switch id="image-compression" defaultChecked/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="max-upload-size">最大上传大小 (MB)</Label>
                                <Input id="max-upload-size" type="number" defaultValue="10"/>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>保存更改</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

