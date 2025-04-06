"use client"

import type React from "react"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Switch} from "@/components/ui/switch"
import {Camera, Save} from "lucide-react"
import {toast} from "@/hooks/use-toast"

export default function AdminProfilePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [profileData, setProfileData] = useState({
        name: "张美丽",
        email: "zhang@example.com",
        bio: "资深技术博主，专注于Web开发和用户体验设计。喜欢分享前沿技术和实用经验。",
        website: "https://example.com",
        twitter: "@zhangmeili",
        github: "zhangmeili",
        location: "上海",
        emailNotifications: true,
        twoFactorAuth: false,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setProfileData((prev) => ({...prev, [name]: value}))
    }

    const handleSwitchChange = (name: string, checked: boolean) => {
        setProfileData((prev) => ({...prev, [name]: checked}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // 模拟API调用
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast({
                title: "个人资料已更新",
                description: "您的个人资料信息已成功保存",
            })
        } catch (error) {
            toast({
                title: "更新失败",
                description: error instanceof Error ? error.message : "发生未知错误",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // 模拟API调用
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast({
                title: "密码已更新",
                description: "您的密码已成功修改",
            })
        } catch (error) {
            toast({
                title: "更新失败",
                description: error instanceof Error ? error.message : "发生未知错误",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-bold">个人资料</h1>
                <p className="text-muted-foreground mt-1">管理您的账户信息和设置</p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="profile">个人资料</TabsTrigger>
                    <TabsTrigger value="account">账户设置</TabsTrigger>
                    <TabsTrigger value="security">安全设置</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>个人资料</CardTitle>
                                <CardDescription>更新您的个人信息</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                                    <div className="relative">
                                        <Avatar className="h-24 w-24">
                                            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="张美丽"/>
                                            <AvatarFallback className="text-2xl">张</AvatarFallback>
                                        </Avatar>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
                                        >
                                            <Camera className="h-4 w-4"/>
                                            <span className="sr-only">更换头像</span>
                                        </Button>
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">姓名</Label>
                                                <Input id="name" name="name" value={profileData.name}
                                                       onChange={handleInputChange} required/>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">邮箱</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={profileData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bio">个人简介</Label>
                                            <Textarea
                                                id="bio"
                                                name="bio"
                                                value={profileData.bio}
                                                onChange={handleInputChange}
                                                className="min-h-[100px]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="website">个人网站</Label>
                                        <Input
                                            id="website"
                                            name="website"
                                            value={profileData.website}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">所在地</Label>
                                        <Input
                                            id="location"
                                            name="location"
                                            value={profileData.location}
                                            onChange={handleInputChange}
                                            placeholder="城市"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="twitter">Twitter</Label>
                                        <Input
                                            id="twitter"
                                            name="twitter"
                                            value={profileData.twitter}
                                            onChange={handleInputChange}
                                            placeholder="@username"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="github">GitHub</Label>
                                        <Input
                                            id="github"
                                            name="github"
                                            value={profileData.github}
                                            onChange={handleInputChange}
                                            placeholder="username"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <span className="flex items-center">
                      <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                      >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      保存中...
                    </span>
                                    ) : (
                                        <span className="flex items-center">
                      <Save className="mr-2 h-4 w-4"/>
                      保存更改
                    </span>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>

                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>账户设置</CardTitle>
                            <CardDescription>管理您的账户偏好设置</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="emailNotifications">邮件通知</Label>
                                    <p className="text-sm text-muted-foreground">接收关于您的账户的电子邮件通知</p>
                                </div>
                                <Switch
                                    id="emailNotifications"
                                    checked={profileData.emailNotifications}
                                    onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="language">界面语言</Label>
                                <select
                                    id="language"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="zh-CN">简体中文</option>
                                    <option value="en-US">English (US)</option>
                                    <option value="ja-JP">日本語</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="timezone">时区</Label>
                                <select
                                    id="timezone"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="Asia/Shanghai">中国标准时间 (UTC+8)</option>
                                    <option value="America/New_York">美国东部时间 (UTC-5)</option>
                                    <option value="Europe/London">格林威治标准时间 (UTC+0)</option>
                                    <option value="Europe/Paris">中欧时间 (UTC+1)</option>
                                    <option value="Asia/Tokyo">日本标准时间 (UTC+9)</option>
                                </select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>保存更改</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>修改密码</CardTitle>
                                <CardDescription>更新您的账户密码</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">当前密码</Label>
                                    <Input id="currentPassword" type="password" required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">新密码</Label>
                                    <Input id="newPassword" type="password" required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">确认新密码</Label>
                                    <Input id="confirmPassword" type="password" required/>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button onClick={handlePasswordChange} disabled={isLoading}>
                                    {isLoading ? "更新中..." : "更新密码"}
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>两步验证</CardTitle>
                                <CardDescription>增强您的账户安全性</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="twoFactorAuth">两步验证</Label>
                                        <p className="text-sm text-muted-foreground">使用应用程序或短信进行两步验证</p>
                                    </div>
                                    <Switch
                                        id="twoFactorAuth"
                                        checked={profileData.twoFactorAuth}
                                        onCheckedChange={(checked) => handleSwitchChange("twoFactorAuth", checked)}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button variant="outline">配置</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

