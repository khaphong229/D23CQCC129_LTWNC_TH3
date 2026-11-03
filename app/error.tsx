'use client'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="wrap">
      <div className="box">
        <h2 style={{ marginBottom: '8px', color: '#c00' }}>Đã xảy ra lỗi</h2>
        <p style={{ marginBottom: '12px' }}>{error.message || 'Không thể tải trang này.'}</p>
        <button type="button" className="btn btn-primary" onClick={() => reset()}>
          Thử lại
        </button>
      </div>
    </div>
  )
}

