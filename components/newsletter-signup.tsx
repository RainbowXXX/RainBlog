"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MailIcon } from "lucide-react"
import { newsletterAPI } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsLoading(true)

    try {
      const response = await newsletterAPI.subscribe(email)
      toast({
        title: "订阅成功",
        description: "感谢您订阅我们的通讯",
      })
      setEmail("")
    } catch (error) {
      toast({
        title: "订阅失败",
        description: "请稍后再试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-xl bg-muted/50 p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <MailIcon className="h-6 w-6 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">保持最新动态</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        当我们发布新文章和更新时获得通知。我们不会向您的收件箱发送垃圾邮件。
      </p>

      <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="输入您的邮箱"
          className="flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "订阅中..." : "订阅"}
        </Button>
      </form>
    </div>
  )
}

