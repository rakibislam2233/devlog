import LogHistory from '@/components/dashboard/workspace/LogHistory'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getLogsAction } from '@/lib/actions/logs'

const LogDetails = async () => {
  const result = await getLogsAction();
  const logs = result.success ? result.data : [];

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Page Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/dev-logs">
              <Button
                variant="outline"
                size="icon"
              >
                <ArrowLeft size={16} />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Log Details</h1>
              <p className="text-sm text-gray-600 mt-1">View and manage your development log entry</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <LogHistory initialLogs={logs} />
      </div>
    </div>
  )
}

export default LogDetails
