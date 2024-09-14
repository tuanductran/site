export function filterStatus(dataList: any[], statusFilter: string) {
  // If no status filter is provided, return the original list
  if (!statusFilter) {
    return dataList
  }

  // Filter the list to include only items with the specified status
  return dataList.filter(item => item.status && item.status.includes(statusFilter))
}
