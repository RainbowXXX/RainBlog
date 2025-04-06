import Link from "next/link"
import Image from "next/image"

interface FeaturedPostProps {
    title: string
    excerpt: string
    slug: string
    date: string
    author: string
    image: string
}

export function FeaturedPost({title, excerpt, slug, date, author, image}: FeaturedPostProps) {
    return (
        <Link href={`/blog/${slug}`}>
            <div className="group relative rounded-xl overflow-hidden">
                <div className="relative h-[500px] w-full">
                    <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-2">
                        {date} • 作者 {author}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 group-hover:underline decoration-2 underline-offset-4">
                        {title}
                    </h2>
                    <p className="text-lg max-w-3xl">{excerpt}</p>
                    <div
                        className="mt-4 inline-block font-medium underline underline-offset-4 group-hover:text-primary-foreground transition-colors duration-300">
                        阅读更多
                    </div>
                </div>
            </div>
        </Link>
    )
}

