export function filterStatus(type: any, status: any) {
  const sortedStatus = type.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  if (!status) {
    return sortedStatus
  }

  return sortedStatus.filter((type: any) => type.status.string.includes(status))
}

export function filterTags(type: any, tag: any) {
  const sortedTags = type.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  if (!tag) {
    return sortedTags
  }

  return sortedTags.filter((type: any) => type.tags.includes(tag))
}