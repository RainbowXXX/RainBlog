import { NewsletterSignup } from "@/components/newsletter-signup"

export default function NewsletterPage() {
  return (
    <div className="px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">订阅我们的通讯</h1>

      <div className="prose prose-lg mb-8">
        <p>订阅我们的通讯，获取最新的博客文章、技术趋势和行业见解。我们每周发送一次通讯， 您可以随时取消订阅。</p>

        <h2>您将获得什么？</h2>
        <ul>
          <li>最新的博客文章和更新</li>
          <li>行业趋势和见解</li>
          <li>专家提示和最佳实践</li>
          <li>独家内容和资源</li>
        </ul>
      </div>

      <div className="bg-muted p-8 rounded-xl">
        <NewsletterSignup />
      </div>
    </div>
  )
}

