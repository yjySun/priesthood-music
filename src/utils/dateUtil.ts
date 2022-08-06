import { format } from 'date-fns'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'
const DATE_FORMAT = 'yyyy-MM-dd '

export function formatToDateTime(date: null, formatStr = DATE_TIME_FORMAT): string {
  return format(date, formatStr)
}

export function formatToDate(date: null, formatStr = DATE_FORMAT): string {
  return format(date, formatStr)
}

export function getTodyDate(): string {
  return new Date().getDate().toString()
}
