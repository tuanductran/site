export function filterTags(dataList: any[], tagFilter: string) {
  // If no tag is provided, return the sorted list
  if (!tagFilter) {
    return dataList
  }

  // Filter the list to return only items that include the specified tag
  return dataList.filter(item => item.tags && item.tags.includes(tagFilter))
}
