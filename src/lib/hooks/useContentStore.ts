import { create } from 'zustand'
import { supabase } from '../supabase/client'
import type { Database } from '../supabase/types'

type Post = Database['public']['Tables']['posts']['Row']
type Category = Database['public']['Tables']['categories']['Row']

interface ContentState {
  posts: Post[]
  categories: Category[]
  isLoading: boolean
  error: string | null
  fetchPosts: () => Promise<void>
  fetchCategories: () => Promise<void>
  createPost: (post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => Promise<Post>
  updatePost: (id: string, post: Partial<Post>) => Promise<void>
  deletePost: (id: string) => Promise<void>
}

export const useContentStore = create<ContentState>((set, get) => ({
  posts: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles(full_name, avatar_url),
          categories:post_categories(category:categories(*))
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      set({ posts: data || [] })
    } catch (error) {
      set({ error: 'Error fetching posts' })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchCategories: async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      set({ categories: data || [] })
    } catch (error) {
      set({ error: 'Error fetching categories' })
    }
  },

  createPost: async (post) => {
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single()

    if (error) throw error
    set(state => ({ posts: [data, ...state.posts] }))
    return data
  },

  updatePost: async (id, post) => {
    const { error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)

    if (error) throw error
    set(state => ({
      posts: state.posts.map(p => (p.id === id ? { ...p, ...post } : p))
    }))
  },

  deletePost: async (id) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) throw error
    set(state => ({
      posts: state.posts.filter(p => p.id !== id)
    }))
  }
}))
