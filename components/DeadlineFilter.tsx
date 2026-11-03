'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DeadlineItem, SubjectItem } from '../lib/db'
import Countdown from './Countdown'

export default function DeadlineFilter({
  list,
  subjects,
}: {
  list: DeadlineItem[]
  subjects: SubjectItem[]
}) {
  const [kw, setKw] = useState('')
  const [cat, setCat] = useState('all')

  const filtered = list.filter((item) => {
    const matchKw = item.title.toLowerCase().includes(kw.toLowerCase())
    const matchCat = cat === 'all' || item.subjectSlug === cat
    return matchKw && matchCat
  })

  const getSubName = (slug: string) => {
    const found = subjects.find((s) => s.slug === slug)
    return found ? found.name : slug
  }

  return (
    <div>
      <div className="box" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>
            Tìm theo tên:
          </label>
          <input
            type="text"
            className="inp"
            placeholder="Nhập từ khoá deadline..."
            value={kw}
            onChange={(e) => setKw(e.target.value)}
          />
        </div>
        <div style={{ minWidth: '220px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>
            Lọc môn học:
          </label>
          <select
            className="inp"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <option value="all">-- Tất cả môn học --</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="box">Không có deadline nào khớp bộ lọc.</div>
      ) : (
        <div className="grid-list">
          {filtered.map((item) => (
            <div key={item.id} className="box" style={{ marginBottom: 0 }}>
              <div style={{ marginBottom: '6px' }}>
                <span className="tag">{getSubName(item.subjectSlug)}</span>
              </div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>
                <Link href={'/deadlines/' + item.id}>{item.title}</Link>
              </h3>
              <p style={{ fontSize: '14px', color: '#444', marginBottom: '10px' }}>
                Hạn nộp: <b>{item.dueDate}</b>
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Countdown dueDate={item.dueDate} />
                <Link href={'/deadlines/' + item.id} className="btn">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

