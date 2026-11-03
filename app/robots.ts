import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || ['http:', '', 'localhost:3000'].join('/')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/admin', '/login'],
    },
    sitemap: baseUrl + '/sitemap.xml',
  }
}

