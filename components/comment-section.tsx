"use client"

import type * as React from "react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, MessageSquare, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"

interface Comment {
  id: number
  author: {
    name: string
    avatar?: string
  }
  content: string
  createdAt: Date
  replies?: Comment[]
}

interface CommentSectionProps {
  postId: number
  isLoggedIn?: boolean
}

export function CommentSection({ postId, isLoggedIn = false }: CommentSectionProps) {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: "张美丽",
        avatar: "/placeholder.svg?height=40&width=40&text=张",
      },
      content: "这篇文章非常有见地！我特别喜欢关于性能优化的部分。",
      createdAt: new Date(2025, 2, 24, 14, 30),
    },
    {
      id: 2,
      author: {
        name: "李明",
        avatar: "/placeholder.svg?height=40&width=40&text=李",
      },
      content: "我对无服务器架构部分有一些疑问。你能否详细解释一下它如何影响博客的可扩展性？",
      createdAt: new Date(2025, 2, 24, 16, 45),
    },
    {
      id: 3,
      author: {
        name: "王静",
        avatar: "/placeholder.svg?height=40&width=40&text=王",
      },
      content: "非常感谢分享这些见解。我刚开始构建自己的博客，这些信息对我很有帮助。",
      createdAt: new Date(2025, 2, 25, 9, 15),
    },
  ])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    const newComment: Comment = {
      id: comments.length + 1,
      author: {
        name: "当前用户",
        avatar: "/placeholder.svg?height=40&width=40&text=用",
      },
      content: comment,
      createdAt: new Date(),
    }

    setComments([...comments, newComment])
    setComment("")
  }

  return (
    <div className="mt-12 animate-fadeIn">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5" />
        <h2 className="text-2xl font-bold">评论 ({comments.length})</h2>
      </div>

      {isLoggedIn ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=用" alt="当前用户" />
              <AvatarFallback>用</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="分享您的想法..."
                className="min-h-24 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
              />
              <div className="mt-2 flex justify-end">
                <Button type="submit" className="transition-all duration-300 hover:scale-105">
                  <Send className="mr-2 h-4 w-4" />
                  发表评论
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <Card className="mb-8 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-center">加入讨论</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>登录后即可发表评论并参与讨论</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="outline"
              className="mr-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <LogIn className="mr-2 h-4 w-4" />
              登录
            </Button>
            <Button className="transition-all duration-300">注册</Button>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex gap-4 transition-all duration-300 hover:bg-muted/30 p-4 rounded-lg -mx-4"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{comment.author.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: zhCN })}
                </span>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

