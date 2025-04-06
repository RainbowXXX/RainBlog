import Link from "next/link"
import {BlogPostCard} from "@/components/blog-post-card"
import {NewsletterSignup} from "@/components/newsletter-signup"
import {FeaturedPost} from "@/components/featured-post"
import {postsAPI} from "@/lib/api"

export default async function Home() {
    // Fetch posts using the API
    const {posts} = await postsAPI.getAllPosts()

    // 获取第一篇文章作为特色文章
    const featuredPost = posts[0]
    // 获取其他文章
    const latestPosts = posts.slice(1, 7)

    return (
        <div className="px-4 py-8">
            <section className="mb-16">
                <FeaturedPost
                    title={featuredPost.title}
                    excerpt={featuredPost.excerpt}
                    image="/placeholder.svg?height=600&width=1200"
                    slug={featuredPost.slug}
                    date="2025年3月25日"
                    author={featuredPost.author.name}
                />
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8">最新文章</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestPosts.map((post, i) => (
                        <BlogPostCard
                            key={post.id}
                            title={post.title}
                            excerpt={post.excerpt}
                            slug={post.slug}
                            date={`2025年3月${20 + i}日`}
                            author={post.author.name}
                            image={`/placeholder.svg?height=400&width=600&text=文章+${i + 1}`}
                        />
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
                    >
                        查看所有文章
                    </Link>
                </div>
            </section>

            <section>
                <NewsletterSignup/>
            </section>
        </div>
    )
}

