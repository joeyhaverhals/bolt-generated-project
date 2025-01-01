import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase/client'

export default function ContentMetrics() {
  const [metrics, setMetrics] = useState({
    totalPosts: 0,
    totalComments: 0,
    totalReactions: 0,
    recentActivity: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const [
          { count: postsCount },
          { count: commentsCount },
          { count: reactionsCount },
          { data: activity }
        ] = await Promise.all([
          supabase.from('posts').select('*', { count: 'exact' }),
          supabase.from('comments').select('*', { count: 'exact' }),
          supabase.from('reactions').select('*', { count: 'exact' }),
          supabase
            .from('posts')
            .select('title, created_at, author:profiles(full_name)')
            .order('created_at', { ascending: false })
            .limit(5)
        ])

        setMetrics({
          totalPosts: postsCount || 0,
          totalComments: commentsCount || 0,
          totalReactions: reactionsCount || 0,
          recentActivity: activity || []
        })
      } catch (error) {
        console.error('Error fetching metrics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (isLoading) {
    return <div>Loading metrics...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Posts</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {metrics.totalPosts}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Comments</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {metrics.totalComments}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Reactions</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {metrics.totalReactions}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {metrics.recentActivity.map((activity: any) => (
            <div key={activity.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">
                  by {activity.author.full_name}
                </p>
              </div>
              <time className="text-sm text-gray-500">
                {new Date(activity.created_at).toLocaleDateString()}
              </time>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
