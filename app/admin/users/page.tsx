import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UsersTable } from "@/components/admin/users-table"
import { usersAPI } from "@/lib/api"

export default async function UsersPage() {
  // Fetch users using the API
  const { users } = await usersAPI.getAllUsers()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">用户</h1>
        <Button>添加用户</Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input placeholder="搜索用户..." className="max-w-sm" />
        <Button variant="outline">搜索</Button>
      </div>

      <UsersTable users={users} />
    </div>
  )
}

