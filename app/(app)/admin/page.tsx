import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { getData } from '../../../lib/db'
import { can } from '../../../lib/perm'
import { handleAdd, handleDel } from '../../actions'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Quản trị Deadline - Class Deadline Hub',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login?callbackUrl=/admin')
  }

  const role = session.user.role
  if (!can(role, 'add') || !can(role, 'del')) {
    redirect('/403')
  }

  const data = getData()

  return (
    <div>
      <div className="box">
        <h1 style={{ fontSize: '22px', marginBottom: '6px' }}>
          Quản lý Deadline Lớp học (Dành cho Lớp trưởng)
        </h1>
        <p>
          Khi thêm hoặc xoá deadline tại đây, trang danh sách và trang chi tiết ISR sẽ được làm mới ngay lập tức.
        </p>
      </div>

      <div className="box">
        <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>Thêm Deadline mới</h2>
        <form action={handleAdd}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px' }}>Tiêu đề deadline:</label>
              <input
                type="text"
                name="title"
                className="inp"
                placeholder="VD: Bài tập lớn cuối kỳ"
                required
                minLength={3}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px' }}>Môn học:</label>
              <select name="subjectSlug" className="inp" required>
                {data.subjects.map((s) => (
                  <option key={s.id} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Hạn nộp (YYYY-MM-DD):</label>
            <input type="date" name="dueDate" className="inp" style={{ maxWidth: '240px' }} required />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Mô tả chi tiết:</label>
            <textarea
              name="desc"
              className="inp"
              rows={3}
              placeholder="Nhập yêu cầu cụ thể của bài tập..."
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Thêm Deadline
          </button>
        </form>
      </div>

      <div className="box">
        <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>
          Danh sách Deadline hiện tại ({data.deadlines.length})
        </h2>
        <table className="tbl">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>Môn học</th>
              <th>Hạn nộp</th>
              <th>Số SV đã xong</th>
              <th>Xoá</th>
            </tr>
          </thead>
          <tbody>
            {data.deadlines.map((item) => {
              const sub = data.subjects.find((s) => s.slug === item.subjectSlug)
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <Link href={'/deadlines/' + item.id}>{item.title}</Link>
                  </td>
                  <td>{sub ? sub.name : item.subjectSlug}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.doneBy.length}</td>
                  <td>
                    <form action={handleDel}>
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className="btn btn-danger">
                        Xoá
                      </button>
                    </form>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
