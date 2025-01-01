import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '../../lib/supabase/client'
import MediaPicker from '../media/MediaPicker'

const siteSettingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteDescription: z.string().min(1, 'Site description is required'),
  contactEmail: z.string().email('Invalid email address'),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }),
  analytics: z.object({
    googleAnalyticsId: z.string().optional(),
  }),
})

type SiteSettingsData = z.infer<typeof siteSettingsSchema>

export default function SiteSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SiteSettingsData>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .single()
      
      return data || {
        siteName: '',
        siteDescription: '',
        contactEmail: '',
        socialLinks: {},
        analytics: {},
      }
    },
  })

  async function onSubmit(data: SiteSettingsData) {
    try {
      setIsLoading(true)
      setError('')

      const { error } = await supabase
        .from('site_settings')
        .upsert(data)

      if (error) throw error
    } catch (error) {
      setError('Error saving settings')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">General Settings</h3>
          <p className="mt-1 text-sm text-gray-500">
            Basic information about your website
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Site Name</label>
            <input
              {...register('siteName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.siteName && (
              <p className="mt-1 text-sm text-red-600">{errors.siteName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              {...register('contactEmail')}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.contactEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Site Description</label>
          <textarea
            {...register('siteDescription')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.siteDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.siteDescription.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo</label>
            <MediaPicker
              onSelect={(url) => setValue('logo', url)}
              preview={watch('logo')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Favicon</label>
            <MediaPicker
              onSelect={(url) => setValue('favicon', url)}
              preview={watch('favicon')}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Social Links</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your social media presence
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Facebook</label>
            <input
              {...register('socialLinks.facebook')}
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Twitter</label>
            <input
              {...register('socialLinks.twitter')}
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram</label>
            <input
              {...register('socialLinks.instagram')}
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
            <input
              {...register('socialLinks.linkedin')}
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Analytics</h3>
          <p className="mt-1 text-sm text-gray-500">
            Tracking and analytics settings
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Google Analytics ID</label>
          <input
            {...register('analytics.googleAnalyticsId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  )
}
