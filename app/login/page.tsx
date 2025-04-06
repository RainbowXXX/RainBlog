"use client"

import * as React from "react"
import Link from "next/link"
import {useRouter, useSearchParams} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {LogIn} from "lucide-react"
import {useAuth} from "@/contexts/auth-context"

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectTo = searchParams.get("redirect") || "/"

    const {login, isLoading} = useAuth()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const success = await login(email, password)
        if (success) {
            router.push(redirectTo)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] animate-fadeIn">
            <Card className="w-full max-w-md transition-all duration-300 hover:shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">登录</CardTitle>
                    <CardDescription>输入您的账号信息登录</CardDescription>
                </CardHeader>
                <CardContent>
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
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">密码</Label>
                                <Link
                                    href="/password/forgot"
                                    className="text-sm text-primary hover:underline transition-all duration-300"
                                >
                                    忘记密码?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                  登录中...
                </span>
                            ) : (
                                <span className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4"/>
                  登录
                </span>
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-center text-muted-foreground">
                        还没有账号?{" "}
                        <Link href="/register" className="text-primary hover:underline transition-all duration-300">
                            注册
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

