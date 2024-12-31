import { create } from 'zustand'
import { supabase } from '../supabase/client'
import type { Database } from '../supabase/types'

type Testimonial = Database['public']['Tables']['testimonials']['Row']

interface TestimonialsState {
  testimonials: Testimonial[]
  isLoading: boolean
  error: string | null
  fetchTestimonials: () => Promise<void>
  createTestimonial: (testimonial: Omit<Testimonial, 'id' | 'created_at'>) => Promise<Testimonial>
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => Promise<void>
  deleteTestimonial: (id: string) => Promise<void>
  approveTestimonial: (id: string) => Promise<void>
}

export const useTestimonialsStore = create<TestimonialsState>((set, get) => ({
  testimonials: [],
  isLoading: false,
  error: null,

  fetchTestimonials: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      set({ testimonials: data || [] })
    } catch (error) {
      set({ error: 'Error fetching testimonials' })
    } finally {
      set({ isLoading: false })
    }
  },

  createTestimonial: async (testimonial) => {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonial)
      .select()
      .single()

    if (error) throw error
    set(state => ({ testimonials: [data, ...state.testimonials] }))
    return data
  },

  updateTestimonial: async (id, testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .update(testimonial)
      .eq('id', id)

    if (error) throw error
    set(state => ({
      testimonials: state.testimonials.map(t => (t.id === id ? { ...t, ...testimonial } : t))
    }))
  },

  deleteTestimonial: async (id) => {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)

    if (error) throw error
    set(state => ({
      testimonials: state.testimonials.filter(t => t.id !== id)
    }))
  },

  approveTestimonial: async (id) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ status: 'approved' })
      .eq('id', id)

    if (error) throw error
    set(state => ({
      testimonials: state.testimonials.map(t => 
        t.id === id ? { ...t, status: 'approved' } : t
      )
    }))
  }
}))
