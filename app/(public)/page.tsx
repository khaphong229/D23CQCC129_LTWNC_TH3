import Link from 'next/link'
import { getData } from '../../lib/db'
import Countdown from '../../components/Countdown'

export default function HomePage() {
  const data = getData()
  const subjects = data.subjects
  const topDeadlines = data.deadlines.slice(0, 6)

  return (
    <div>
      <div className="box">
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>
          Cổng thông tin Class Deadline Hub
        </h1>
        <p style={{ marginBottom: '12px' }}>
          Theo dõi lịch nộp bài tập, tiểu luận và đồ án của lớp. Đăng nhập tài khoản sinh viên để đánh dấu hoàn thành.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/deadlines" className="btn btn-primary">
            Xem tất cả Deadline ({data.deadlines.length})
          </Link>
          <Link href="/dashboard" className="btn">
            Vào bảng điều khiển
          </Link>
        </div>
      </div>

      <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Danh sách môn học ({subjects.length})</h2>
      <div className="grid-list" style={{ marginBottom: '24px' }}>
        {subjects.map((sub) => {
          const count = data.deadlines.filter((d) => d.subjectSlug === sub.slug).length
          return (
            <div key={sub.id} className="box" style={{ marginBottom: 0 }}>
              <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>
                <Link href={'/subjects/' + sub.slug}>{sub.name}</Link>
              </h3>
              <p style={{ fontSize: '14px', marginBottom: '4px' }}>Giảng viên: {sub.teacher}</p>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                Số tín chỉ: {sub.credits} | Số deadline: <b>{count}</b>
              </p>
              <Link href={'/subjects/' + sub.slug} className="btn">
                Xem môn học
              </Link>
            </div>
          )
        })}
      </div>

      <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Deadline nổi bật</h2>
      <div className="grid-list">
        {topDeadlines.map((item) => (
          <div key={item.id} className="box" style={{ marginBottom: 0 }}>
            <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>
              <Link href={'/deadlines/' + item.id}>{item.title}</Link>
            </h3>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}>Hạn nộp: {item.dueDate}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Countdown dueDate={item.dueDate} />
              <Link href={'/deadlines/' + item.id} className="btn">
                Chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

