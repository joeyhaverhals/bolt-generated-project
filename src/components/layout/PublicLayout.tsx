import { Outlet } from 'react-router-dom'
import FloatingMenu from '../FloatingMenu'
import Footer from '../sections/Footer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-black">
      <FloatingMenu />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
