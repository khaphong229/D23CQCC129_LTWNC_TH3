import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import { getData } from '../../../../lib/db'
import { handleDone } from '../../../actions'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Deadline đã xong - Class Deadline Hub',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function DashboardDonePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard/done')
  }

  const uid = session.user.id
  const data = getData()
  const doneList = data.deadlines.filter((d) => d.doneBy.includes(uid))

  return (
    <div>
      <div className="box">
        <h1 style={{ fontSize: '20px', marginBottom: '6px' }}>
          Các Deadline bạn đã hoàn thành ({doneList.length})
        </h1>
        <p>Danh sách các bài tập và đồ án bạn đã đánh dấu xong.</p>
      </div>

      {doneList.length === 0 ? (
        <div className="box">Bạn chưa đánh dấu hoàn thành deadline nào.</div>
      ) : (
        <table className="tbl">
          <thead>
            <tr>
              <th>Tên deadline</th>
              <th>Hạn nộp</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {doneList.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link href={'/deadlines/' + item.id}>{item.title}</Link>
                </td>
                <td>{item.dueDate}</td>
                <td>
                  <form action={handleDone}>
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit" className="btn">
                      Hoàn tác
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
