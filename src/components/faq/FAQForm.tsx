import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useFAQStore } from '../../lib/hooks/useFAQStore'
import { useContentStore } from '../../lib/hooks/useContentStore'
import type { Database } from '../../lib/supabase/types'

type FAQ = Database['public']['Tables']['faq']['Row']

const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  category_id: z.string().min(1, 'Category is required'),
})

type FAQFormData = z.infer<typeof faqSchema>

interface Props {
  faq?: FAQ
  onSuccess: () => void
}

export default function FAQForm({ faq, onSuccess }: Props) {
  const { categories } = useContentStore()
  const { createFAQ, updateFAQ } = useFAQStore()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FAQFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: faq ? {
      question: faq.question,
      answer: faq.answer,
      category_id: faq.category_id,
    } : undefined,
  })

  async function onSubmit(data: FAQFormData) {
    try {
      setIsLoading(true)
      setError('')

      if (faq) {
        await updateFAQ(faq.id, data)
      } else {
        await createFAQ(data)
      }
      
      onSuccess()
    } catch (error) {
      setError('Error saving FAQ')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Question</label>
        <input
          {...register('question')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.question && (
          <p className="mt-1 text-sm text-red-600">{errors.question.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Answer</label>
        <textarea
          {...register('answer')}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.answer && (
          <p className="mt-1 text-sm text-red-600">{errors.answer.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          {...register('category_id')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="mt-1 text-sm text-red-600">{errors.category_id.message}</p>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : faq ? 'Update FAQ' : 'Create FAQ'}
      </button>
    </form>
  )
}
