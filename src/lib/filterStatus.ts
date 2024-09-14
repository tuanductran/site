export function filterStatus(type: any, status: string) {
  const sortedStatus = type.sort(
    (a, b) =>
      Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
  )

  if (!status) {
    return sortedStatus
  }

  return sortedStatus.filter((type: any) => type.status.string.includes(status))
}
