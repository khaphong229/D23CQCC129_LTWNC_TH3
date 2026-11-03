import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className="box">
      <h1 style={{ fontSize: '22px', color: '#c00', marginBottom: '8px' }}>
        403 - Từ chối truy cập
      </h1>
      <p style={{ marginBottom: '12px' }}>
        Tài khoản của bạn không có quyền truy cập vào khu vực quản trị của lớp trưởng (Admin).
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link href="/dashboard" className="btn btn-primary">
          Về trang Dashboard
        </Link>
        <Link href="/" className="btn">
          Về trang chủ
        </Link>
      </div>
    </div>
  )
}

