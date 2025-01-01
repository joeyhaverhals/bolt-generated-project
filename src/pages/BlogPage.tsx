import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContentStore } from '../lib/hooks/useContentStore'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const { posts, fetchPosts } = useContentStore()

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert advice and insights to help you grow
          </p>
        </div>

        <div className="grid gap-8">
          {posts
            .filter(post => post.status === 'published')
            .map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="h-48 w-full object-cover md:h-full md:w-48"
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-brand-orange font-semibold">
                      {post.categories?.[0]?.name}
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="block mt-1 text-2xl font-semibold text-gray-900 hover:text-brand-orange transition-colors"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-2 text-gray-600">{post.excerpt}</p>
                    <div className="mt-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={post.author?.avatar_url}
                            alt={post.author?.full_name}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {post.author?.full_name}
                          </p>
                          <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime={post.published_at}>
                              {format(new Date(post.published_at), 'MMM d, yyyy')}
                            </time>
                            <span aria-hidden="true">&middot;</span>
                            <span>{post.views} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-brand-orange hover:text-brand-orange/90"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
        </div>
      </div>
    </div>
  )
}
