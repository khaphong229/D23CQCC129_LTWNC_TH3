import Sidebar from '../../../components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: '280px' }}>{children}</div>
    </div>
  )
}
