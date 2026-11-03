import Image from 'next/image'
import Link from 'next/link'
import UserBox from './UserBox'

export default function Header() {
  return (
    <header className="hdr">
      <div className="hdr-inner">
        <div className="nav-links">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#111' }}>
            <Image src="/logo.svg" alt="Logo lớp" width={32} height={32} />
            <span>Class Deadline Hub</span>
          </Link>
          <Link href="/">Trang chủ</Link>
          <Link href="/deadlines">Deadline</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
        </div>
        <UserBox />
      </div>
    </header>
  )
}

