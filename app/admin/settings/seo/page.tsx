import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SeoSettingsPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold">SEO设置</h1>
        <p className="text-muted-foreground mt-1">优化博客的搜索引擎表现</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">基本SEO</TabsTrigger>
          <TabsTrigger value="social">社交媒体</TabsTrigger>
          <TabsTrigger value="sitemap">站点地图</TabsTrigger>
          <TabsTrigger value="analytics">分析工具</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>基本SEO设置</CardTitle>
              <CardDescription>配置基本的搜索引擎优化选项</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">默认元标题</Label>
                <Input id="meta-title" defaultValue="博客平台 | 专业内容创作" />
                <p className="text-sm text-muted-foreground">当页面没有指定标题时使用</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">默认元描述</Label>
                <Textarea
                  id="meta-description"
                  defaultValue="一个专业的内容创作和分享平台，提供高质量的技术、设计和营销文章。"
                />
                <p className="text-sm text-muted-foreground">当页面没有指定描述时使用</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">默认关键词</Label>
                <Input id="meta-keywords" defaultValue="博客,内容创作,技术,设计,营销" />
                <p className="text-sm text-muted-foreground">用逗号分隔的关键词列表</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="canonical-urls">使用规范URL</Label>
                  <p className="text-sm text-muted-foreground">自动生成规范URL以避免重复内容问题</p>
                </div>
                <Switch id="canonical-urls" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="noindex-archives">对归档页使用noindex</Label>
                  <p className="text-sm text-muted-foreground">防止搜索引擎索引归档页面</p>
                </div>
                <Switch id="noindex-archives" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>保存更改</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>社交媒体设置</CardTitle>
              <CardDescription>配置社交媒体分享和卡片</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="og-title">Open Graph 标题</Label>
                <Input id="og-title" defaultValue="博客平台 | 专业内容创作" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="og-description">Open Graph 描述</Label>
                <Textarea
                  id="og-description"
                  defaultValue="一个专业的内容创作和分享平台，提供高质量的技术、设计和营销文章。"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="og-image">默认社交分享图片</Label>
                <div className="flex items-center gap-2">
                  <Input id="og-image" defaultValue="/images/og-image.jpg" />
                  <Button variant="outline">上传</Button>
                </div>
                <p className="text-sm text-muted-foreground">推荐尺寸: 1200 x 630 像素</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-username">Twitter 用户名</Label>
                <Input id="twitter-username" defaultValue="@blogplatform" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-card-type">Twitter 卡片类型</Label>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="summary" name="twitter-card-type" defaultChecked />
                    <Label htmlFor="summary">摘要</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="summary_large_image" name="twitter-card-type" />
                    <Label htmlFor="summary_large_image">大图摘要</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>保存更改</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sitemap">
          <Card>
            <CardHeader>
              <CardTitle>站点地图设置</CardTitle>
              <CardDescription>配置XML站点地图</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-sitemap">启用XML站点地图</Label>
                  <p className="text-sm text-muted-foreground">自动生成XML站点地图以提交给搜索引擎</p>
                </div>
                <Switch id="enable-sitemap" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>包含的内容类型</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="include-posts" defaultChecked />
                    <Label htmlFor="include-posts">文章</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="include-pages" defaultChecked />
                    <Label htmlFor="include-pages">页面</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="include-categories" defaultChecked />
                    <Label htmlFor="include-categories">分类</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="include-tags" defaultChecked />
                    <Label htmlFor="include-tags">标签</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sitemap-url">站点地图URL</Label>
                <div className="flex items-center gap-2">
                  <Input id="sitemap-url" defaultValue="https://example.com/sitemap.xml" readOnly />
                  <Button variant="outline">复制</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>保存更改</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>分析工具设置</CardTitle>
              <CardDescription>配置网站分析和跟踪工具</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google-analytics">Google Analytics ID</Label>
                <Input id="google-analytics" placeholder="例如: G-XXXXXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google-tag-manager">Google Tag Manager ID</Label>
                <Input id="google-tag-manager" placeholder="例如: GTM-XXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="baidu-analytics">百度统计代码</Label>
                <Textarea id="baidu-analytics" placeholder="粘贴百度统计代码" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="disable-analytics-logged-in">对已登录用户禁用分析</Label>
                  <p className="text-sm text-muted-foreground">不跟踪已登录的管理员和编辑</p>
                </div>
                <Switch id="disable-analytics-logged-in" defaultChecked />
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

