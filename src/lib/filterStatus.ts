import { dateSortDesc } from './dateSortDesc'

export function filterStatus(type: any, status: string) {
  const sortedStatus = type.sort((a, b) => dateSortDesc(a.createdAt, b.createdAt))

  if (!status) {
    return sortedStatus
  }

  return sortedStatus.filter((type: any) => type.status.string.includes(status))
}
