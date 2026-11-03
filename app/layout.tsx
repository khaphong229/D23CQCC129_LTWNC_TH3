import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import AuthProvider from '../components/AuthProvider'

const font = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || ['http:', '', 'localhost:3000'].join('/')),
  title: 'Class Deadline Hub',
  description: 'Cổng thông tin theo dõi hạn nộp bài tập và đồ án của lớp học tại PTIT.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={font.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
