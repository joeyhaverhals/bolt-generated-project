import { useEffect, useState, useCallback } from 'react'
import { useMediaStore } from '../../lib/hooks/useMediaStore'
import { useDropzone } from 'react-dropzone'
import { Search, Upload, Trash2, Image, FileText, Film } from 'lucide-react'
import { format } from 'date-fns'

interface Props {
  onSelect?: (url: string) => void
  selectable?: boolean
}

export default function MediaLibrary({ onSelect, selectable = false }: Props) {
  const { items, isLoading, error, fetchMedia, uploadMedia, deleteMedia } = useMediaStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    fetchMedia()
  }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      for (const file of acceptedFiles) {
        setUploadProgress(0)
        const reader = new FileReader()
        
        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            setUploadProgress(Math.round((event.loaded / event.total) * 100))
          }
        }

        reader.onloadend = async () => {
          await uploadMedia(file)
          setUploadProgress(0)
        }

        reader.readAsArrayBuffer(file)
      }
    } catch (error) {
      console.error('Upload error:', error)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.webm'],
      'application/pdf': ['.pdf'],
    }
  })

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return Image
    if (mimeType.startsWith('video/')) return Film
    return FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop files here, or click to select files
        </p>
        {uploadProgress > 0 && (
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-indigo-600 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items
          .filter(item => item.filename.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((item) => {
            const FileIcon = getFileIcon(item.mime_type)
            const isImage = item.mime_type.startsWith('image/')

            return (
              <div
                key={item.id}
                className={`group relative aspect-square rounded-lg border border-gray-200 bg-white p-2
                  ${selectable ? 'cursor-pointer hover:border-indigo-500' : ''}`}
                onClick={() => selectable && onSelect?.(item.url)}
              >
                {isImage ? (
                  <img
                    src={item.url}
                    alt={item.filename}
                    className="h-full w-full object-cover rounded"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <FileIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-lg">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {!selectable && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteMedia(item.id, item.url)
                        }}
                        className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2 text-xs">
                  <p className="truncate font-medium">{item.filename}</p>
                  <p className="text-gray-500">
                    {formatFileSize(item.size)} • {format(new Date(item.created_at), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
