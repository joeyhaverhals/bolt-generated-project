import { useEffect } from 'react'
import { useContentStore } from '../../lib/hooks/useContentStore'
import { useServicesStore } from '../../lib/hooks/useServicesStore'
import { useTestimonialsStore } from '../../lib/hooks/useTestimonialsStore'
import { useFAQStore } from '../../lib/hooks/useFAQStore'
import {
  FileText,
  HelpCircle,
  Briefcase,
  MessageSquare,
  Eye,
  MessageCircle,
  ThumbsUp
} from 'lucide-react'

export default function Dashboard() {
  const { posts, fetchPosts } = useContentStore()
  const { services, fetchServices } = useServicesStore()
  const { testimonials, fetchTestimonials } = useTestimonialsStore()
  const { faqs, fetchFAQs } = useFAQStore()

  useEffect(() => {
    fetchPosts()
    fetchServices()
    fetchTestimonials()
    fetchFAQs()
  }, [])

  const stats = [
    {
      name: 'Total Posts',
      value: posts.length,
      icon: FileText,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Total Services',
      value: services.length,
      icon: Briefcase,
      change: '+54.02%',
      changeType: 'positive',
    },
    {
      name: 'Total Testimonials',
      value: testimonials.length,
      icon: MessageSquare,
      change: '+12.05%',
      changeType: 'positive',
    },
    {
      name: 'Total FAQs',
      value: faqs.length,
      icon: HelpCircle,
      change: '+3.45%',
      changeType: 'positive',
    },
  ]

  const recentActivity = [
    ...posts.slice(0, 3).map(post => ({
      type: 'post',
      title: post.title,
      date: new Date(post.created_at),
      icon: FileText,
    })),
    ...testimonials.slice(0, 3).map(testimonial => ({
      type: 'testimonial',
      title: `New testimonial from ${testimonial.author_name}`,
      date: new Date(testimonial.created_at),
      icon: MessageSquare,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="mt-2 text-sm text-gray-700">
          A quick overview of your content management system.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
          <div className="mt-5 flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activityIdx}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                          <activity.icon className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">{activity.title}</p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Views</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {posts.reduce((acc, post) => acc + (post.views || 0), 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageCircle className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Testimonials
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {testimonials.filter(t => t.status === 'pending').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ThumbsUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Average Rating
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length || 0).toFixed(1)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
