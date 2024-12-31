export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          featured_image: string | null
          excerpt: string | null
          author_id: string
          status: string
          published_at: string | null
          created_at: string
          updated_at: string
          views: number
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string | null
          featured_image?: string | null
          excerpt?: string | null
          author_id: string
          status?: string
          published_at?: string | null
          created_at?: string
          updated_at?: string
          views?: number
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string | null
          featured_image?: string | null
          excerpt?: string | null
          author_id?: string
          status?: string
          published_at?: string | null
          created_at?: string
          updated_at?: string
          views?: number
        }
      }
      // ... Additional table types
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
