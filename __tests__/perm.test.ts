import { can } from '../lib/perm'

describe('can(role, action)', () => {
  test('guest chi duoc xem deadline', () => {
    expect(can('guest', 'view')).toBe(true)
    expect(can('guest', 'done')).toBe(false)
    expect(can('guest', 'add')).toBe(false)
    expect(can('guest', 'del')).toBe(false)
  })

  test('user duoc xem va danh dau xong deadline', () => {
    expect(can('user', 'view')).toBe(true)
    expect(can('user', 'done')).toBe(true)
    expect(can('user', 'add')).toBe(false)
    expect(can('user', 'del')).toBe(false)
  })

  test('admin co toan quyen xem, danh dau xong, them va xoa deadline', () => {
    expect(can('admin', 'view')).toBe(true)
    expect(can('admin', 'done')).toBe(true)
    expect(can('admin', 'add')).toBe(true)
    expect(can('admin', 'del')).toBe(true)
  })

  test('role khong hop le tra ve false', () => {
    expect(can('' as any, 'view')).toBe(false)
  })
})

