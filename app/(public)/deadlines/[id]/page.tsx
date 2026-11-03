import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getData } from '../../../../lib/db'
import Countdown from '../../../../components/Countdown'

export const revalidate = 3600

export function generateStaticParams() {
  const data = getData()
  return data.deadlines.map((item) => ({
    id: item.id,
  }))
}

export function generateMetadata({
  params,
}: {
  params: { id: string }
}): Metadata {
  const data = getData()
  const item = data.deadlines.find((d) => d.id === params.id)

  if (!item) {
    return {
      title: 'Không tìm thấy Deadline - Class Deadline Hub',
    }
  }

  const sub = data.subjects.find((s) => s.slug === item.subjectSlug)
  const subName = sub ? sub.name : item.subjectSlug

  return {
    title: item.title + ' - ' + subName,
    description: 'Hạn nộp: ' + item.dueDate + '. ' + item.desc,
    openGraph: {
      title: item.title + ' (' + subName + ')',
      description: 'Hạn nộp: ' + item.dueDate + ' - ' + item.desc,
      type: 'article',
    },
  }
}

export default function DeadlineDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const data = getData()
  const item = data.deadlines.find((d) => d.id === params.id)

  if (!item) {
    notFound()
  }

  const sub = data.subjects.find((s) => s.slug === item.subjectSlug)
  const subName = sub ? sub.name : item.subjectSlug
  const baseUrl = process.env.NEXTAUTH_URL || ['http:', '', 'localhost:3000'].join('/')

  const jsonLd = {
    '@context': ['https:', '', 'schema.org'].join('/'),
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: baseUrl + '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Danh sách Deadline',
        item: baseUrl + '/deadlines',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: item.title,
        item: baseUrl + '/deadlines/' + item.id,
      },
    ],
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="box">
        <p style={{ marginBottom: '10px', fontSize: '14px' }}>
          <Link href="/">Trang chủ</Link> / <Link href="/deadlines">Deadline</Link> /{' '}
          <span>{item.title}</span>
        </p>

        <div style={{ marginBottom: '10px' }}>
          <span className="tag">{subName}</span>
        </div>

        <h1 style={{ fontSize: '22px', marginBottom: '10px' }}>{item.title}</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span>
            Hạn nộp: <b>{item.dueDate}</b>
          </span>
          <Countdown dueDate={item.dueDate} />
        </div>

        <div style={{ borderTop: '1px solid #ccc', paddingTop: '12px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>Nội dung yêu cầu:</h3>
          <p>{item.desc}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/deadlines" className="btn">
            Quay lại danh sách
          </Link>
          <Link href="/dashboard" className="btn btn-primary">
            Đánh dấu hoàn thành tại Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

