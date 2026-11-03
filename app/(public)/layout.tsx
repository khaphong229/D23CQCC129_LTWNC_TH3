import Header from '../../components/Header'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <main className="wrap">{children}</main>
      <footer className="wrap" style={{ borderTop: '1px solid #ccc', marginTop: '24px', fontSize: '13px', color: '#555' }}>
        Class Deadline Hub - Cổng thông tin bài tập lớp học PTIT
      </footer>
    </div>
  )
}

