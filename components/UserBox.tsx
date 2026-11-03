'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function UserBox() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <span>...</span>
  }

  if (!session?.user) {
    return (
      <Link href="/login" className="btn btn-primary">
        Đăng nhập
      </Link>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span>
        Xin chào, <b>{session.user.name}</b> ({session.user.role})
      </span>
      <button
        type="button"
        className="btn"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Đăng xuất
      </button>
    </div>
  )
}

