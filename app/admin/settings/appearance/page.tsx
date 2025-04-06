import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Switch} from "@/components/ui/switch"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

export default function AppearanceSettingsPage() {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-bold">外观设置</h1>
                <p className="text-muted-foreground mt-1">自定义博客的外观和主题</p>
            </div>

            <Tabs defaultValue="theme" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="theme">主题</TabsTrigger>
                    <TabsTrigger value="layout">布局</TabsTrigger>
                    <TabsTrigger value="colors">颜色</TabsTrigger>
                    <TabsTrigger value="typography">排版</TabsTrigger>
                </TabsList>

                <TabsContent value="theme">
                    <Card>
                        <CardHeader>
                            <CardTitle>主题设置</CardTitle>
                            <CardDescription>选择和配置博客主题</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>主题模式</Label>
                                <RadioGroup defaultValue="system" className="flex flex-col space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="light" id="theme-light"/>
                                        <Label htmlFor="theme-light">浅色模式</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="dark" id="theme-dark"/>
                                        <Label htmlFor="theme-dark">深色模式</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="system" id="theme-system"/>
                                        <Label htmlFor="theme-system">跟随系统</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="theme-switcher">显示主题切换按钮</Label>
                                    <p className="text-sm text-muted-foreground">允许用户手动切换主题</p>
                                </div>
                                <Switch id="theme-switcher" defaultChecked/>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>保存更改</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="layout">
                    <Card>
                        <CardHeader>
                            <CardTitle>布局设置</CardTitle>
                            <CardDescription>配置博客的布局结构</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="layout-type">布局类型</Label>
                                <Select defaultValue="sidebar">
                                    <SelectTrigger id="layout-type">
                                        <SelectValue placeholder="选择布局类型"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sidebar">侧边栏布局</SelectItem>
                                        <SelectItem value="centered">居中布局</SelectItem>
                                        <SelectItem value="fullwidth">全宽布局</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="container-width">内容宽度</Label>
                                <Select defaultValue="max-w-5xl">
                                    <SelectTrigger id="container-width">
                                        <SelectValue placeholder="选择内容宽度"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="max-w-3xl">窄</SelectItem>
                                        <SelectItem value="max-w-5xl">中等</SelectItem>
                                        <SelectItem value="max-w-7xl">宽</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="sticky-header">固定顶部导航</Label>
                                    <p className="text-sm text-muted-foreground">滚动时保持顶部导航栏可见</p>
                                </div>
                                <Switch id="sticky-header" defaultChecked/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="show-sidebar">显示侧边栏</Label>
                                    <p className="text-sm text-muted-foreground">在博客页面显示侧边栏</p>
                                </div>
                                <Switch id="show-sidebar" defaultChecked/>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>保存更改</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="colors">
                    <Card>
                        <CardHeader>
                            <CardTitle>颜色设置</CardTitle>
                            <CardDescription>自定义博客的颜色方案</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="primary-color">主色调</Label>
                                    <div className="flex gap-2">
                                        <Input id="primary-color" type="color" defaultValue="#000000"
                                               className="w-12 h-10 p-1"/>
                                        <Input defaultValue="#000000" className="flex-1"/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="secondary-color">次要色调</Label>
                                    <div className="flex gap-2">
                                        <Input id="secondary-color" type="color" defaultValue="#6b7280"
                                               className="w-12 h-10 p-1"/>
                                        <Input defaultValue="#6b7280" className="flex-1"/>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="background-color">背景色</Label>
                                    <div className="flex gap-2">
                                        <Input id="background-color" type="color" defaultValue="#ffffff"
                                               className="w-12 h-10 p-1"/>
                                        <Input defaultValue="#ffffff" className="flex-1"/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="text-color">文本色</Label>
                                    <div className="flex gap-2">
                                        <Input id="text-color" type="color" defaultValue="#1f2937"
                                               className="w-12 h-10 p-1"/>
                                        <Input defaultValue="#1f2937" className="flex-1"/>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>保存更改</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="typography">
                    <Card>
                        <CardHeader>
                            <CardTitle>排版设置</CardTitle>
                            <CardDescription>自定义博客的字体和文本样式</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="heading-font">标题字体</Label>
                                    <Select defaultValue="inter">
                                        <SelectTrigger id="heading-font">
                                            <SelectValue placeholder="选择标题字体"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="inter">Inter</SelectItem>
                                            <SelectItem value="roboto">Roboto</SelectItem>
                                            <SelectItem value="opensans">Open Sans</SelectItem>
                                            <SelectItem value="lato">Lato</SelectItem>
                                            <SelectItem value="montserrat">Montserrat</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="body-font">正文字体</Label>
                                    <Select defaultValue="inter">
                                        <SelectTrigger id="body-font">
                                            <SelectValue placeholder="选择正文字体"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="inter">Inter</SelectItem>
                                            <SelectItem value="roboto">Roboto</SelectItem>
                                            <SelectItem value="opensans">Open Sans</SelectItem>
                                            <SelectItem value="lato">Lato</SelectItem>
                                            <SelectItem value="montserrat">Montserrat</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="base-font-size">基础字体大小</Label>
                                    <Select defaultValue="16px">
                                        <SelectTrigger id="base-font-size">
                                            <SelectValue placeholder="选择基础字体大小"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="14px">14px</SelectItem>
                                            <SelectItem value="16px">16px</SelectItem>
                                            <SelectItem value="18px">18px</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="line-height">行高</Label>
                                    <Select defaultValue="1.5">
                                        <SelectTrigger id="line-height">
                                            <SelectValue placeholder="选择行高"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1.2">紧凑 (1.2)</SelectItem>
                                            <SelectItem value="1.5">标准 (1.5)</SelectItem>
                                            <SelectItem value="1.8">宽松 (1.8)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
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

