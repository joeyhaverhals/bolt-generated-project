import { create } from 'zustand'
import { supabase } from '../supabase/client'
import type { Database } from '../supabase/types'

type MediaItem = Database['public']['Tables']['media']['Row']

interface MediaState {
  items: MediaItem[]
  isLoading: boolean
  error: string | null
  fetchMedia: () => Promise<void>
  uploadMedia: (file: File) => Promise<MediaItem>
  deleteMedia: (id: string, url: string) => Promise<void>
  searchMedia: (query: string) => void
}

export const useMediaStore = create<MediaState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchMedia: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      set({ items: data || [] })
    } catch (error) {
      set({ error: 'Error fetching media' })
    } finally {
      set({ isLoading: false })
    }
  },

  uploadMedia: async (file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `uploads/${fileName}`

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath)

    // Create media record
    const { data, error } = await supabase
      .from('media')
      .insert({
        filename: fileName,
        url: publicUrl,
        mime_type: file.type,
        size: file.size,
      })
      .select()
      .single()

    if (error) throw error

    set(state => ({ items: [data, ...state.items] }))
    return data
  },

  deleteMedia: async (id: string, url: string) => {
    // Delete from storage
    const filePath = url.split('/').pop()
    if (filePath) {
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([`uploads/${filePath}`])

      if (storageError) throw storageError
    }

    // Delete from database
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id)

    if (error) throw error

    set(state => ({
      items: state.items.filter(item => item.id !== id)
    }))
  },

  searchMedia: (query: string) => {
    set(state => ({
      items: state.items.filter(item =>
        item.filename.toLowerCase().includes(query.toLowerCase())
      )
    }))
  },
}))
