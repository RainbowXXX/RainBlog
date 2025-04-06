"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // 模拟API调用
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setIsSubmitted(true)
            toast({
                title: "重置链接已发送",
                description: "请检查您的邮箱以获取密码重置链接",
            })
        } catch (error) {
            toast({
                title: "发送失败",
                description: error instanceof Error ? error.message : "发生未知错误",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] animate-fadeIn">
            <Card className="w-full max-w-md transition-all duration-300 hover:shadow-lg">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                            <Link href="/login">
                                <ArrowLeft className="h-4 w-4" />
                                <span className="sr-only">返回</span>
                            </Link>
                        </Button>
                        <CardTitle className="text-2xl font-bold">忘记密码</CardTitle>
                    </div>
                    <CardDescription>输入您的电子邮件地址，我们将向您发送重置密码的链接</CardDescription>
                </CardHeader>
                <CardContent>
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">邮箱</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full transition-all duration-300 hover:scale-[1.02]"
                                disabled={isLoading}
                            >
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
                    发送中...
                  </span>
                                ) : (
                                    <span className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    发送重置链接
                  </span>
                                )}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center py-4">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">检查您的邮箱</h3>
                            <p className="text-muted-foreground mb-4">我们已向 {email} 发送了一封包含密码重置链接的电子邮件。</p>
                            <p className="text-sm text-muted-foreground">
                                如果您没有收到邮件，请检查您的垃圾邮件文件夹，或
                                <Button variant="link" className="p-0 h-auto" onClick={() => setIsSubmitted(false)}>
                                    尝试使用其他邮箱
                                </Button>
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-center text-muted-foreground">
                        记起密码了?{" "}
                        <Link href="/login" className="text-primary hover:underline transition-all duration-300">
                            返回登录
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

