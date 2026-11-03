import { ImageResponse } from 'next/og'
import { getData } from '../../../../lib/db'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image({ params }: { params: { id: string } }) {
  const data = getData()
  const item = data.deadlines.find((d) => d.id === params.id)
  const sub = item ? data.subjects.find((s) => s.slug === item.subjectSlug) : null

  const title = item ? item.title : 'Deadline không tồn tại'
  const subName = sub ? sub.name : 'Class Deadline Hub'
  const due = item ? 'Hạn nộp: ' + item.dueDate : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#f5f5f5',
          padding: '60px',
          border: '12px solid #0056b3',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#0056b3',
            fontWeight: 'bold',
          }}
        >
          CLASS DEADLINE HUB - {subName}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 52,
            color: '#111111',
            fontWeight: 'bold',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: '#b3261e',
            fontWeight: 'bold',
          }}
        >
          {due}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

