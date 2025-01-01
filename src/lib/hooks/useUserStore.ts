// First, let's add a user management store
import { create } from 'zustand'
import { supabase } from '../supabase/client'
import type { Database } from '../supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface UserState {
  users: Profile[]
  isLoading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
  updateUserRole: (userId: string, role: string) => Promise<void>
  deleteUser: (userId: string) => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      set({ users: data || [] })
    } catch (error) {
      set({ error: 'Error fetching users' })
    } finally {
      set({ isLoading: false })
    }
  },

  updateUserRole: async (userId: string, role: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId)

      if (error) throw error
      
      set(state => ({
        users: state.users.map(user => 
          user.id === userId ? { ...user, role } : user
        )
      }))
    } catch (error) {
      console.error('Error updating user role:', error)
      throw error
    }
  },

  deleteUser: async (userId: string) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId)
      if (error) throw error
      
      set(state => ({
        users: state.users.filter(user => user.id !== userId)
      }))
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }
}))
