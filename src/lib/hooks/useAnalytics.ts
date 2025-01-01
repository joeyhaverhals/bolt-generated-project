import { create } from 'zustand'
import { supabase } from '../supabase/client'

interface AnalyticsState {
  pageViews: Record<string, number>
  totalViews: number
  mostViewedPosts: Array<{ id: string; title: string; views: number }>
  isLoading: boolean
  error: string | null
  incrementPageView: (pageId: string) => Promise<void>
  fetchAnalytics: () => Promise<void>
}

export const useAnalytics = create<AnalyticsState>((set, get) => ({
  pageViews: {},
  totalViews: 0,
  mostViewedPosts: [],
  isLoading: false,
  error: null,

  incrementPageView: async (pageId: string) => {
    try {
      const { data: post } = await supabase
        .from('posts')
        .select('views')
        .eq('id', pageId)
        .single()

      if (post) {
        const newViews = (post.views || 0) + 1
        await supabase
          .from('posts')
          .update({ views: newViews })
          .eq('id', pageId)

        set(state => ({
          pageViews: {
            ...state.pageViews,
            [pageId]: newViews
          }
        }))
      }
    } catch (error) {
      console.error('Error incrementing page view:', error)
    }
  },

  fetchAnalytics: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data: posts } = await supabase
        .from('posts')
        .select('id, title, views')
        .order('views', { ascending: false })
        .limit(10)

      const totalViews = posts?.reduce((sum, post) => sum + (post.views || 0), 0) || 0
      const pageViews = posts?.reduce((acc, post) => ({
        ...acc,
        [post.id]: post.views || 0
      }), {})

      set({
        mostViewedPosts: posts || [],
        totalViews,
        pageViews
      })
    } catch (error) {
      set({ error: 'Error fetching analytics' })
    } finally {
      set({ isLoading: false })
    }
  }
}))
