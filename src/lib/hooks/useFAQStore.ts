import { create } from 'zustand'
import { supabase } from '../supabase/client'
import type { Database } from '../supabase/types'

type FAQ = Database['public']['Tables']['faq']['Row']

interface FAQState {
  faqs: FAQ[]
  isLoading: boolean
  error: string | null
  fetchFAQs: () => Promise<void>
  createFAQ: (faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>) => Promise<FAQ>
  updateFAQ: (id: string, faq: Partial<FAQ>) => Promise<void>
  deleteFAQ: (id: string) => Promise<void>
}

export const useFAQStore = create<FAQState>((set, get) => ({
  faqs: [],
  isLoading: false,
  error: null,

  fetchFAQs: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('faq')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      set({ faqs: data || [] })
    } catch (error) {
      set({ error: 'Error fetching FAQs' })
    } finally {
      set({ isLoading: false })
    }
  },

  createFAQ: async (faq) => {
    const { data, error } = await supabase
      .from('faq')
      .insert(faq)
      .select()
      .single()

    if (error) throw error
    set(state => ({ faqs: [data, ...state.faqs] }))
    return data
  },

  updateFAQ: async (id, faq) => {
    const { error } = await supabase
      .from('faq')
      .update(faq)
      .eq('id', id)

    if (error) throw error
    set(state => ({
      faqs: state.faqs.map(f => (f.id === id ? { ...f, ...faq } : f))
    }))
  },

  deleteFAQ: async (id) => {
    const { error } = await supabase
      .from('faq')
      .delete()
      .eq('id', id)

    if (error) throw error
    set(state => ({
      faqs: state.faqs.filter(f => f.id !== id)
    }))
  }
}))
