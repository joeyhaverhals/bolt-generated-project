import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useContentStore } from '../lib/hooks/useContentStore'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

export default function BlogPostPage() {
  const { slug } = useParams()
  const { posts, fetchPosts } = useContentStore()
  const post = posts.find(p => p.slug === slug)

  useEffect(() => {
    if (!posts.length) {
      fetchPosts()
    }
  }, [])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <header className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <img
                className="h-12 w-12 rounded-full"
                src={post.author?.avatar_url}
                alt={post.author?.full_name}
              />
              <div className="text-left">
                <p className="text-lg font-medium text-gray-900">
                  {post.author?.full_name}
                </p>
                <time className="text-gray-500" dateTime={post.published_at}>
                  {format(new Date(post.published_at), 'MMMM d, yyyy')}
                </time>
              </div>
            </div>
          </header>

          {post.featured_image && (
            <div className="mb-16">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>
      </article>
    </div>
  )
}
