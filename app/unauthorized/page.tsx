import Link from "next/link"
import {Button} from "@/components/ui/button"
import {ShieldAlert} from "lucide-react"

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <ShieldAlert className="h-12 w-12 text-muted-foreground"/>
            </div>
            <h1 className="text-4xl font-bold mb-4">访问被拒绝</h1>
            <p className="text-muted-foreground text-lg max-w-md mb-8">
                您没有权限访问此页面。如果您认为这是一个错误，请联系管理员。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                    <Link href="/">返回首页</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/login">登录其他账号</Link>
                </Button>
            </div>
        </div>
    )
}

