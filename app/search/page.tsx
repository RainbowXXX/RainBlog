import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BlogPostCard } from "@/components/blog-post-card"
import { posts } from "@/lib/mock-data"

export default function SearchPage() {
  // 获取前4篇文章作为搜索结果示例
  const searchResults = posts.slice(0, 4)

  return (
    <div className="px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">搜索</h1>

      <div className="flex gap-2 mb-8 max-w-xl">
        <Input placeholder="输入关键词搜索..." className="flex-1" />
        <Button>搜索</Button>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">搜索结果</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((post, i) => (
            <BlogPostCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              date={`2025年3月${15 + i}日`}
              author={post.author.name}
              image={`/placeholder.svg?height=400&width=600&text=搜索结果+${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

