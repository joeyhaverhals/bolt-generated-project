import { create } from 'zustand'
import { supabase } from '../supabase/client'
import type { Database } from '../supabase/types'

type Service = Database['public']['Tables']['services']['Row']

interface ServicesState {
  services: Service[]
  isLoading: boolean
  error: string | null
  fetchServices: () => Promise<void>
  createService: (service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => Promise<Service>
  updateService: (id: string, service: Partial<Service>) => Promise<void>
  deleteService: (id: string) => Promise<void>
}

export const useServicesStore = create<ServicesState>((set, get) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchServices: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      set({ services: data || [] })
    } catch (error) {
      set({ error: 'Error fetching services' })
    } finally {
      set({ isLoading: false })
    }
  },

  createService: async (service) => {
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single()

    if (error) throw error
    set(state => ({ services: [data, ...state.services] }))
    return data
  },

  updateService: async (id, service) => {
    const { error } = await supabase
      .from('services')
      .update(service)
      .eq('id', id)

    if (error) throw error
    set(state => ({
      services: state.services.map(s => (s.id === id ? { ...s, ...service } : s))
    }))
  },

  deleteService: async (id) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) throw error
    set(state => ({
      services: state.services.filter(s => s.id !== id)
    }))
  }
}))
