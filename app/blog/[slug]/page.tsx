'use client'

import * as React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { RelatedPosts } from "@/components/related-posts"
import { CommentSection } from "@/components/comment-section"
import { postsAPI } from "@/lib/api"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"

interface BlogPostParams {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPost({ params }: BlogPostParams) {
  const { slug } = await params;

  // Fetch post using the API
  const post = await postsAPI.getPostBySlug(slug)

  // If post not found, show 404
  if (!post) {
    notFound()
  }

  // 模拟用户登录状态，实际应用中应从认证系统获取
  const isLoggedIn = false

  return (
    <div>
      <div className="mb-8 animate-fadeIn">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-4 transition-all duration-300 hover:translate-x-[-4px]"
        >
          ← 返回博客
        </Link>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2 transition-transform duration-300 hover:scale-110">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>2025年3月25日</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            <span>5分钟阅读</span>
          </div>
        </div>
      </div>

      <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-xl animate-fadeIn">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          fill
          alt="博客文章封面图"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      <article className="prose prose-lg max-w-none dark:prose-invert animate-fadeIn">
        <p>
          构建可扩展的博客需要仔细规划和正确的技术选择。在本文中，我们将探讨如何创建一个能够随着读者群体增长的博客。
        </p>

        <h2>为什么选择Next.js？</h2>
        <p>
          Next.js由于其内置功能如服务器端渲染、静态站点生成和API路由，为构建博客提供了出色的基础。这些功能允许快速页面加载和SEO友好的内容。
        </p>

        <h2>关键组件</h2>
        <p>构建博客时，有几个关键组件值得特别关注：</p>
        <ul>
          <li>内容管理</li>
          <li>用户体验</li>
          <li>性能优化</li>
          <li>SEO考虑因素</li>
        </ul>

        <h2>管理界面</h2>
        <p>一个好的博客应该有一个强大的管理界面，允许轻松的内容管理并提供关于读者参与度的分析。</p>

        <blockquote>"最好的博客是那些能够随着读者群体扩大而保持性能和用户体验的博客。" - Web开发专家</blockquote>

        <h2>结论</h2>
        <p>通过专注于可扩展性、性能和用户体验，您可以构建一个随着读者群体增长而良好服务的博客。</p>
      </article>

      <Separator className="my-12" />

      <CommentSection postId={post.id} isLoggedIn={isLoggedIn} />

      <div className="mt-16 animate-fadeIn">
        <NewsletterSignup />
      </div>

      <div className="mt-16 animate-fadeIn">
        <RelatedPosts />
      </div>
    </div>
  )
}

