import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getData } from '../../../../lib/db'
import Countdown from '../../../../components/Countdown'

export const dynamicParams = false

export function generateStaticParams() {
  const data = getData()
  return data.subjects.map((s) => ({
    slug: s.slug,
  }))
}

export default function SubjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const data = getData()
  const sub = data.subjects.find((s) => s.slug === params.slug)

  if (!sub) {
    notFound()
  }

  const list = data.deadlines.filter((d) => d.subjectSlug === sub.slug)

  return (
    <div>
      <div className="box">
        <p style={{ marginBottom: '6px' }}>
          <Link href="/">Trang chủ</Link> / <span>{sub.name}</span>
        </p>
        <h1 style={{ fontSize: '22px', marginBottom: '6px' }}>{sub.name}</h1>
        <p>
          Giảng viên: <b>{sub.teacher}</b> | Số tín chỉ: <b>{sub.credits}</b>
        </p>
      </div>

      <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>
        Danh sách deadline của môn ({list.length})
      </h2>

      {list.length === 0 ? (
        <div className="box">Chưa có deadline nào cho môn học này.</div>
      ) : (
        <div className="grid-list">
          {list.map((item) => (
            <div key={item.id} className="box" style={{ marginBottom: 0 }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>
                <Link href={'/deadlines/' + item.id}>{item.title}</Link>
              </h3>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}>Hạn nộp: {item.dueDate}</p>
              <p style={{ fontSize: '14px', color: '#444', marginBottom: '10px' }}>{item.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Countdown dueDate={item.dueDate} />
                <Link href={'/deadlines/' + item.id} className="btn">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
