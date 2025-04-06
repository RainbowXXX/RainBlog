import type {ReactNode} from "react"

// 移除单独的管理布局，直接使用主布局
export default function AdminLayout({children}: { children: ReactNode }) {
    return children
}

