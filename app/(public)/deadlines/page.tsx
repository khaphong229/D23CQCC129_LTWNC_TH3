import { getData } from '../../../lib/db'
import DeadlineFilter from '../../../components/DeadlineFilter'

export const revalidate = 60

export default function DeadlinesPage() {
  const data = getData()

  return (
    <div>
      <div className="box">
        <h1 style={{ fontSize: '22px', marginBottom: '6px' }}>
          Danh sách tất cả Deadline
        </h1>
        <p>
          Trang tự động làm mới định kỳ sau mỗi 60 giây (ISR). Bạn có thể tìm kiếm hoặc lọc theo môn học bên dưới.
        </p>
      </div>

      <DeadlineFilter list={data.deadlines} subjects={data.subjects} />
    </div>
  )
}

