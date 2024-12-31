import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useContentStore } from '../../lib/hooks/useContentStore'
import RichTextEditor from '../shared/RichTextEditor'
import ImageUpload from '../shared/ImageUpload'
import type { Database } from '../../lib/supabase/types'

type Post = Database['public']['Tables']['posts']['Row']

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  featured_image: z.string().optional(),
  status: z.enum(['draft', 'published']),
  category_ids: z.array(z.string()).min(1, 'Select at least one category'),
})

type PostFormData = z.infer<typeof postSchema>

interface Props {
  post?: Post
  onSuccess: () => void
}

export default function PostForm({ post, onSuccess }: Props) {
  const { categories, createPost, updatePost } = useContentStore()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: post ? {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      featured_image: post.featured_image || '',
      status: post.status as 'draft' | 'published',
      category_ids: [], // You'll need to fetch and set the actual categories
    } : {
      status: 'draft',
      category_ids: [],
    },
  })

  const content = watch('content')

  async function onSubmit(data: PostFormData) {
    try {
      setIsLoading(true)
      setError('')

      if (post) {
        await updatePost(post.id, data)
      } else {
        await createPost(data)
      }
      
      onSuccess()
    } catch (error) {
      setError('Error saving post')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          {...register('title')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          {...register('slug')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.slug && (
          <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Featured Image</label>
        <div className="mt-1 flex items-center space-x-4">
          <input
            {...register('featured_image')}
            type="hidden"
          />
          <ImageUpload
            onUpload={(url) => setValue('featured_image', url)}
            onError={setError}
          />
          {watch('featured_image') && (
            <img
              src={watch('featured_image')}
              alt="Featured"
              className="h-20 w-20 object-cover rounded"
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categories</label>
        <div className="mt-1 grid grid-cols-2 gap-4">
          {categories.map(category => (
            <label key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={category.id}
                {...register('category_ids')}
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
        {errors.category_ids && (
          <p className="mt-1 text-sm text-red-600">{errors.category_ids.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <RichTextEditor
          content={content}
          onChange={(newContent) => setValue('content', newContent)}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          {...register('status')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  )
}
