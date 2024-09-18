export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export function distanceToNow(dateTime: number | Date): string {
  const now = new Date()
  const targetDate = new Date(dateTime)
  const secondsDiff = Math.floor((now.getTime() - targetDate.getTime()) / 1000)

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }

  let counter: number
  let unit: string

  for (const [key, value] of Object.entries(intervals)) {
    counter = Math.floor(Math.abs(secondsDiff) / value)
    if (counter > 0) {
      unit = key
      break
    }
  }

  const suffix = secondsDiff < 0 ? ' from now' : ' ago'
  return `${counter} ${unit}${counter === 1 ? '' : 's'}${suffix}`
}
