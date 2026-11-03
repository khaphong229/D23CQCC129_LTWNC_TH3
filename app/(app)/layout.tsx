import Header from '../../components/Header'

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <div
        style={{
          backgroundColor: '#eef3f8',
          borderBottom: '1px solid #ccc',
          padding: '6px 16px',
          marginTop: '-20px',
          marginBottom: '20px',
          fontSize: '13px',
        }}
      >
        <div className="wrap" style={{ padding: 0 }}>
          Khu vực nội bộ lớp học (Yêu cầu đăng nhập)
        </div>
      </div>
      <main className="wrap">{children}</main>
    </div>
  )
}
