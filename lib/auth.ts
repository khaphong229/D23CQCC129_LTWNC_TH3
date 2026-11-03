import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import { getData } from './db'
import { Role } from './perm'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'ptit_deadline_hub_secret_key_123456',
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mật khẩu', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const data = getData()
        const res = data.users.find(
          (item) => item.email === credentials.email && item.password === credentials.password
        )
        console.log(res)
        if (!res) {
          return null
        }
        return {
          id: res.id,
          name: res.name,
          email: res.email,
          role: res.role,
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || 'github_demo_id',
      clientSecret: process.env.GITHUB_SECRET || 'github_demo_secret',
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.name || profile.login,
          email: profile.email,
          role: 'user' as Role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role || 'user'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
}
