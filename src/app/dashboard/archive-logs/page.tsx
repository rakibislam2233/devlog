import ArchiveLogsContent from "@/components/dashboard/archive-logs/ArchiveLogsContent";
import { getArchivedLogsAction } from "@/lib/actions/logs";

export default async function ArchiveLogsPage() {
  const result = await getArchivedLogsAction();
  const archivedLogs = result.success ? result.data : [];

  return <ArchiveLogsContent initialLogs={archivedLogs} />;
}
