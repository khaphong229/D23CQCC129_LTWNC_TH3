import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="wrap">
      <div className="box">
        <h1 style={{ fontSize: '22px', marginBottom: '8px' }}>404 - Không tìm thấy nội dung</h1>
        <p style={{ marginBottom: '12px' }}>
          Trang hoặc deadline bạn đang tìm không tồn tại hoặc đã bị xoá.
        </p>
        <Link href="/deadlines" className="btn btn-primary">
          Quay lại danh sách deadline
        </Link>
      </div>
    </div>
  )
}

