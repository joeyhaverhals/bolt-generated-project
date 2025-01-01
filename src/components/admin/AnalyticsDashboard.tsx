import { useEffect } from 'react'
import { useAnalytics } from '../../lib/hooks/useAnalytics'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function AnalyticsDashboard() {
  const { mostViewedPosts, totalViews, fetchAnalytics, isLoading } = useAnalytics()

  useEffect(() => {
    fetchAnalytics()
  }, [])

  if (isLoading) {
    return <div>Loading analytics...</div>
  }

  const chartData = {
    labels: mostViewedPosts.map(post => post.title),
    datasets: [
      {
        label: 'Page Views',
        data: mostViewedPosts.map(post => post.views),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Views</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">{totalViews}</p>
        </div>
        {/* Add more summary cards here */}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Most Viewed Posts</h3>
        <div className="h-64">
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Add more charts and analytics here */}
    </div>
  )
}
