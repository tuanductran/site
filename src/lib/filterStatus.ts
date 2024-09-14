export function filterStatus(dataList: any[], statusFilter: string) {
  // Sort the data list by the createdAt date in descending order
  const sortedList = dataList.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  // If no status filter is provided, return the sorted list
  if (!statusFilter) {
    return sortedList
  }

  // Filter the sorted list to include only items with the specified status
  return sortedList.filter(item => item.status && item.status.includes(statusFilter))
}
