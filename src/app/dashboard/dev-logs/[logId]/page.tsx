'use client'
import LogHistory from '@/components/dashboard/workspace/LogHisotry'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const LogDetails = () => {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Page Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push('/dashboard/dev-logs')}
            >
              <ArrowLeft size={16} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Log Details</h1>
              <p className="text-sm text-gray-600 mt-1">View and manage your development log entry</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <LogHistory />
      </div>
    </div>
  )
}

export default LogDetails
