import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import AdminLayout from './components/layout/AdminLayout'
import RequireAuth from './components/auth/RequireAuth'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ContactPage from './pages/ContactPage'
import Dashboard from './components/admin/Dashboard'
import PostsList from './components/admin/PostsList'
import ServicesList from './components/admin/ServicesList'
import FAQList from './components/admin/FAQList'
import TestimonialsList from './components/admin/TestimonialsList'
import MediaManager from './components/admin/MediaManager'
import Settings from './components/admin/Settings'

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<RequireAuth allowedRoles={['admin']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/posts" element={<PostsList />} />
          <Route path="/admin/services" element={<ServicesList />} />
          <Route path="/admin/faq" element={<FAQList />} />
          <Route path="/admin/testimonials" element={<TestimonialsList />} />
          <Route path="/admin/media" element={<MediaManager />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  )
}
