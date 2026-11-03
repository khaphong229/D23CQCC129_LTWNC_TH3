import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Đăng nhập - Class Deadline Hub',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return (
    <div style={{ maxWidth: '420px', margin: '20px auto' }}>
      <Suspense fallback={<div className="box">Đang tải form đăng nhập...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

