import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTestimonialsStore } from '../../lib/hooks/useTestimonialsStore'
import ImageUpload from '../shared/ImageUpload'
import type { Database } from '../../lib/supabase/types'

type Testimonial = Database['public']['Tables']['testimonials']['Row']

const testimonialSchema = z.object({
  author_name: z.string().min(1, 'Author name is required'),
  content: z.string().min(1, 'Content is required'),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  avatar: z.string().optional(),
  status: z.enum(['pending', 'approved']).default('pending'),
})

type TestimonialFormData = z.infer<typeof testimonialSchema>

interface Props {
  testimonial?: Testimonial
  onSuccess: () => void
}

export default function TestimonialForm({ testimonial, onSuccess }: Props) {
  const { createTestimonial, updateTestimonial } = useTestimonialsStore()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: testimonial ? {
      author_name: testimonial.author_name,
      content: testimonial.content,
      rating: testimonial.rating,
      avatar: testimonial.avatar || '',
      status: testimonial.status as 'pending' | 'approved',
    } : {
      status: 'pending',
      rating: 5,
    },
  })

  async function onSubmit(data: TestimonialFormData) {
    try {
      setIsLoading(true)
      setError('')

      if (testimonial) {
        await updateTestimonial(testimonial.id, data)
      } else {
        await createTestimonial(data)
      }
      
      onSuccess()
    } catch (error) {
      setError('Error saving testimonial')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Author Name</label>
        <input
          {...register('author_name')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.author_name && (
          <p className="mt-1 text-sm text-red-600">{errors.author_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          {...register('content')}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <select
          {...register('rating', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          {[1, 2, 3, 4, 5].map(rating => (
            <option key={rating} value={rating}>
              {rating} Star{rating !== 1 ? 's' : ''}
            </option>
          ))}
        </select>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Avatar</label>
        <div className="mt-1 flex items-center space-x-4">
          <input
            {...register('avatar')}
            type="hidden"
          />
          <ImageUpload
            onUpload={(url) => setValue('avatar', url)}
            onError={setError}
          />
          {watch('avatar') && (
            <img
              src={watch('avatar')}
              alt="Avatar"
              className="h-20 w-20 object-cover rounded-full"
            />
          )}
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : testimonial ? 'Update Testimonial' : 'Create Testimonial'}
      </button>
    </form>
  )
}
