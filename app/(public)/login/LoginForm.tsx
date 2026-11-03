'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    setLoading(true)

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (res?.error) {
      setErr('Email hoặc mật khẩu không đúng!')
      return
    }

    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <div className="box">
      <h1 style={{ fontSize: '20px', marginBottom: '12px' }}>Đăng nhập hệ thống</h1>

      {err && (
        <div
          style={{
            padding: '8px',
            marginBottom: '12px',
            border: '1px solid #c00',
            backgroundColor: '#fce8e6',
            color: '#900',
          }}
        >
          {err}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Email:</label>
          <input
            type="email"
            className="inp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sv@ptit.edu.vn"
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Mật khẩu:</label>
          <input
            type="password"
            className="inp"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginBottom: '10px' }}
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>

      <button
        type="button"
        className="btn"
        style={{ width: '100%', marginBottom: '14px' }}
        onClick={() => signIn('github', { callbackUrl })}
      >
        Đăng nhập với GitHub (OAuth)
      </button>

      <div style={{ fontSize: '13px', borderTop: '1px solid #ccc', paddingTop: '10px', color: '#444' }}>
        <p><b>Tài khoản thử nghiệm:</b></p>
        <p>- Admin: admin@ptit.edu.vn / admin123</p>
        <p>- Sinh viên: sv@ptit.edu.vn / sv123456</p>
      </div>
    </div>
  )
}

