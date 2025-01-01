import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase/client'
import { Line } from 'react-chartjs-2'

export default function EngagementMetrics() {
  const [metrics, setMetrics] = useState({
    commentsByDay: {},
    reactionsByDay: {},
    topCommenters: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const [{ data: comments }, { data: reactions }, { data: commenters }] = await Promise.all([
          supabase
            .from('comments')
            .select('created_at')
            .gte('created_at', thirtyDaysAgo.toISOString()),
          supabase
            .from('reactions')
            .select('created_at')
            .gte('created_at', thirtyDaysAgo.toISOString()),
          supabase
            .from('comments')
            .select(`
              author:profiles(id, full_name, avatar_url),
              count
            `)
            .group('author')
            .order('count', { ascending: false })
            .limit(5)
        ])

        // Process comments by day
        const commentsByDay = comments?.reduce((acc: Record<string, number>, comment) => {
          const date = new Date(comment.created_at).toLocaleDateString()
          acc[date] = (acc[date] || 0) + 1
          return acc
        }, {})

        // Process reactions by day
        const reactionsByDay = reactions?.reduce((acc: Record<string, number>, reaction) => {
          const date = new Date(reaction.created_at).toLocaleDateString()
          acc[date] = (acc[date] || 0) + 1
          return acc
        }, {})

        setMetrics({
          commentsByDay: commentsByDay || {},
          reactionsByDay: reactionsByDay || {},
          topCommenters: commenters || []
        })
      } catch (error) {
        console.error('Error fetching engagement metrics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (isLoading) {
    return <div>Loading engagement metrics...</div>
  }

  const engagementData = {
    labels: Object.keys(metrics.commentsByDay),
    datasets: [
      {
        label: 'Comments',
        data: Object.values(metrics.commentsByDay),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Reactions',
        data: Object.values(metrics.reactionsByDay),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Over Time</h3>
        <div className="h-64">
          <Line 
            data={engagementData} 
            options={{ 
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }} 
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Commenters</h3>
        <div className="space-y-4">
          {metrics.topCommenters.map((commenter: any) => (
            <div key={commenter.author.id} className="flex items-center justify-between">
              <div className="flex items-center">
                {commenter.author.avatar_url && (
                  <img
                    src={commenter.author.avatar_url}
                    alt=""
                    className="h-10 w-10 rounded-full mr-3"
                  />
                )}
                <span className="font-medium text-gray-900">
                  {commenter.author.full_name}
                </span>
              </div>
              <span className="text-gray-500">
                {commenter.count} comments
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
