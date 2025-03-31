import { BlogPostCard } from "@/components/blog-post-card"
import { Pagination } from "@/components/pagination"
import { postsAPI } from "@/lib/api"

export default async function BlogPage() {
  // Fetch posts using the API
  const { posts } = await postsAPI.getAllPosts()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">博客</h1>
        <p className="text-muted-foreground text-lg">探索我们的最新文章和见解</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {posts.map((post, i) => (
          <BlogPostCard
            key={post.id}
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
            date={`2025年3月${15 + i}日`}
            author={post.author.name}
            image={`/placeholder.svg?height=400&width=600&text=文章+${i + 1}`}
          />
        ))}
      </div>

      <Pagination totalPages={5} currentPage={1} />
    </div>
  )
}

