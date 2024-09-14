export function filterTags(dataList: any[], tagFilter: string) {
  // Sort the list by the createdAt property, from newest to oldest
  const sortedData = dataList.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  // If no tag is provided, return the sorted list
  if (!tagFilter) {
    return sortedData
  }

  // Filter the list to return only items that include the specified tag
  return sortedData.filter(item => item.tags && item.tags.includes(tagFilter))
}
