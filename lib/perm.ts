export type Role = 'guest' | 'user' | 'admin'
export type Action = 'view' | 'done' | 'add' | 'del'

const rules: Record<Role, Record<Action, boolean>> = {
  guest: {
    view: true,
    done: false,
    add: false,
    del: false,
  },
  user: {
    view: true,
    done: true,
    add: false,
    del: false,
  },
  admin: {
    view: true,
    done: true,
    add: true,
    del: true,
  },
}

export function can(role: Role, action: Action): boolean {
  if (!role || !rules[role]) {
    return false
  }
  return Boolean(rules[role][action])
}
