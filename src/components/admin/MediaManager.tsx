import MediaLibrary from '../media/MediaLibrary'

export default function MediaManager() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Media Manager</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage all your media files in one place.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <MediaLibrary />
      </div>
    </div>
  )
}
