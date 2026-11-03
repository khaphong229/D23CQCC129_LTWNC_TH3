'use server'

import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { authOptions } from '../lib/auth'
import { getData, saveData } from '../lib/db'
import { can } from '../lib/perm'

export async function handleDone(formData: FormData) {
  const session = await getServerSession(authOptions)
  const role = session?.user?.role || 'guest'

  if (!session?.user?.id || !can(role, 'done')) {
    throw new Error('Bạn không có quyền đánh dấu hoàn thành deadline.')
  }

  const id = String(formData.get('id') || '').trim()
  if (!id) {
    throw new Error('Mã deadline không hợp lệ.')
  }

  const data = getData()
  const item = data.deadlines.find((d) => d.id === id)
  if (!item) {
    throw new Error('Không tìm thấy deadline này.')
  }

  const uid = session.user.id
  const idx = item.doneBy.indexOf(uid)
  if (idx === -1) {
    item.doneBy.push(uid)
  } else {
    item.doneBy.splice(idx, 1)
  }

  saveData(data)
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/done')
}

export async function handleAdd(formData: FormData) {
  const session = await getServerSession(authOptions)
  const role = session?.user?.role || 'guest'

  if (!can(role, 'add')) {
    throw new Error('Chỉ lớp trưởng (admin) mới có quyền thêm deadline.')
  }

  const title = String(formData.get('title') || '').trim()
  const subjectSlug = String(formData.get('subjectSlug') || '').trim()
  const dueDate = String(formData.get('dueDate') || '').trim()
  const desc = String(formData.get('desc') || '').trim()

  if (!title || title.length < 3 || !subjectSlug || !dueDate || !desc) {
    throw new Error('Vui lòng nhập đầy đủ và hợp lệ các trường thông tin.')
  }

  if (isNaN(new Date(dueDate).getTime())) {
    throw new Error('Ngày hạn nộp không hợp lệ.')
  }

  const data = getData()
  const sub = data.subjects.find((s) => s.slug === subjectSlug)
  if (!sub) {
    throw new Error('Môn học đã chọn không tồn tại.')
  }

  const maxId = data.deadlines.reduce((max, item) => {
    const num = Number(item.id)
    return !isNaN(num) && num > max ? num : max
  }, 0)

  const newItem = {
    id: String(maxId + 1),
    title,
    subjectSlug,
    dueDate,
    desc,
    doneBy: [],
  }

  console.log(newItem)
  data.deadlines.push(newItem)
  saveData(data)

  revalidatePath('/')
  revalidatePath('/deadlines')
  revalidatePath('/deadlines/' + newItem.id)
  revalidatePath('/subjects/' + subjectSlug)
  revalidatePath('/dashboard')
  revalidatePath('/admin')
}

export async function handleDel(formData: FormData) {
  const session = await getServerSession(authOptions)
  const role = session?.user?.role || 'guest'

  if (!can(role, 'del')) {
    throw new Error('Chỉ lớp trưởng (admin) mới có quyền xoá deadline.')
  }

  const id = String(formData.get('id') || '').trim()
  if (!id) {
    throw new Error('Thiếu mã deadline cần xoá.')
  }

  const data = getData()
  const idx = data.deadlines.findIndex((d) => d.id === id)
  if (idx === -1) {
    throw new Error('Deadline không tồn tại.')
  }

  const subSlug = data.deadlines[idx].subjectSlug
  data.deadlines.splice(idx, 1)
  saveData(data)

  revalidatePath('/')
  revalidatePath('/deadlines')
  revalidatePath('/deadlines/' + id)
  revalidatePath('/subjects/' + subSlug)
  revalidatePath('/dashboard')
  revalidatePath('/admin')
}
