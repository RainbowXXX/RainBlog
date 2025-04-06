import {BlogPostCard} from "@/components/blog-post-card"
import {postsAPI} from "@/lib/api";

export async function RelatedPosts() {
    const posts = (await postsAPI.getAllPosts()).posts;
    // 获取前3篇文章作为相关文章
    const relatedPosts = posts.slice(0, 3)

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">相关文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post, i) => (
                    <BlogPostCard
                        key={post.id}
                        title={post.title}
                        excerpt={post.excerpt}
                        slug={post.slug}
                        date={`2025年3月${15 + i}日`}
                        author={post.author.name}
                        image={`/placeholder.svg?height=400&width=600&text=相关+${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

