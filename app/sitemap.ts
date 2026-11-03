import { MetadataRoute } from 'next'
import { getData } from '../lib/db'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || ['http:', '', 'localhost:3000'].join('/')
  const data = getData()

  const subUrls = data.subjects.map((s) => ({
    url: baseUrl + '/subjects/' + s.slug,
    lastModified: new Date(),
  }))

  const dlUrls = data.deadlines.map((d) => ({
    url: baseUrl + '/deadlines/' + d.id,
    lastModified: new Date(),
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: baseUrl + '/deadlines',
      lastModified: new Date(),
    },
    ...subUrls,
    ...dlUrls,
  ]
}

