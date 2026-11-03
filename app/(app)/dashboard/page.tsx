import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { getData } from '../../../lib/db'
import { can } from '../../../lib/perm'
import { handleDone } from '../../actions'
import Countdown from '../../../components/Countdown'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Dashboard - Class Deadline Hub',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard')
  }

  const uid = session.user.id
  const role = session.user.role
  const data = getData()
  const list = data.deadlines
  const doneCount = list.filter((d) => d.doneBy.includes(uid)).length

  return (
    <div>
      <div className="box">
        <h1 style={{ fontSize: '20px', marginBottom: '6px' }}>
          Bảng theo dõi Deadline của {session.user.name}
        </h1>
        <p>
          Vai trò: <b>{role}</b> | Tiến độ hoàn thành: <b>{doneCount} / {list.length}</b> deadline
        </p>
      </div>

      <table className="tbl">
        <thead>
          <tr>
            <th>Tên deadline</th>
            <th>Môn học</th>
            <th>Hạn nộp</th>
            <th>Đếm ngược</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            const sub = data.subjects.find((s) => s.slug === item.subjectSlug)
            const isDone = item.doneBy.includes(uid)
            return (
              <tr key={item.id}>
                <td>
                  <Link href={'/deadlines/' + item.id}>{item.title}</Link>
                </td>
                <td>{sub ? sub.name : item.subjectSlug}</td>
                <td>{item.dueDate}</td>
                <td>
                  <Countdown dueDate={item.dueDate} />
                </td>
                <td>
                  {isDone ? (
                    <span className="tag tag-ok">Đã xong</span>
                  ) : (
                    <span className="tag">Chưa xong</span>
                  )}
                </td>
                <td>
                  {can(role, 'done') && (
                    <form action={handleDone}>
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className={isDone ? 'btn' : 'btn btn-primary'}
                      >
                        {isDone ? 'Bỏ đánh dấu' : 'Đánh dấu xong'}
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
