'use client'

export default function Countdown({ dueDate }: { dueDate: string }) {
  const now = new Date()
  const target = new Date(dueDate + 'T23:59:59')
  const diffTime = target.getTime() - now.getTime()
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (days >= 0) {
    return <span className="tag tag-ok">Còn {days} ngày</span>
  }

  return <span className="tag tag-late">Quá hạn {Math.abs(days)} ngày</span>
}

