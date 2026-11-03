import fs from 'fs'
import path from 'path'
import { Role } from './perm'

export interface UserItem {
  id: string
  name: string
  email: string
  password: string
  role: Role
}

export interface SubjectItem {
  id: string
  slug: string
  name: string
  teacher: string
  credits: number
}

export interface DeadlineItem {
  id: string
  title: string
  subjectSlug: string
  dueDate: string
  desc: string
  doneBy: string[]
}

export interface DbData {
  users: UserItem[]
  subjects: SubjectItem[]
  deadlines: DeadlineItem[]
}

const filePath = path.join(process.cwd(), 'data', 'db.json')

export function getData(): DbData {
  const txt = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(txt) as DbData
  return data
}

export function saveData(data: DbData) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}
