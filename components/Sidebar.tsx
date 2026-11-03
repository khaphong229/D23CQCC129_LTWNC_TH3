'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const menu = [
    { href: '/dashboard', label: 'Tất cả Deadline' },
    { href: '/dashboard/done', label: 'Deadline đã xong' },
    { href: '/admin', label: 'Quản trị (Admin)' },
  ]

  return (
    <aside
      className="box"
      style={{
        width: '220px',
        flexShrink: 0,
        alignSelf: 'flex-start',
        padding: '12px',
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '6px' }}>
        Menu cá nhân
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {menu.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '8px 10px',
                border: '1px solid #ccc',
                backgroundColor: active ? '#0056b3' : '#f9f9f9',
                color: active ? '#fff' : '#111',
                fontWeight: active ? 700 : 400,
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
