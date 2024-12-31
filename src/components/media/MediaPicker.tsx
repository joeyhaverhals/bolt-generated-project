import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Image } from 'lucide-react'
import MediaLibrary from './MediaLibrary'

interface Props {
  onSelect: (url: string) => void
  preview?: string
}

export default function MediaPicker({ onSelect, preview }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (url: string) => {
    onSelect(url)
    setIsOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="mx-auto h-32 w-32 object-cover rounded"
          />
        ) : (
          <>
            <Image className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Select media
            </span>
          </>
        )}
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-6xl w-full rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Select Media
            </Dialog.Title>

            <MediaLibrary onSelect={handleSelect} selectable />

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
