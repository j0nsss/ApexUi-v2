export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          display_name: string
          bio: string | null
          avatar_url: string | null
          website_url: string | null
          github_url: string | null
          twitter_url: string | null
          role_tag: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name: string
          bio?: string | null
          avatar_url?: string | null
          website_url?: string | null
          github_url?: string | null
          twitter_url?: string | null
          role_tag?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string
          bio?: string | null
          avatar_url?: string | null
          website_url?: string | null
          github_url?: string | null
          twitter_url?: string | null
          role_tag?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          icon: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          icon?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          icon?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      components: {
        Row: {
          id: string
          slug: string
          creator_id: string | null
          category_id: number
          name: string
          description_short: string
          description_long: string | null
          tech: Database['public']['Enums']['component_tech']
          status: Database['public']['Enums']['component_status']
          code_html: string | null
          code_tailwind: string | null
          code_react: string | null
          code_vue: string | null
          preview_html: string
          thumbnail_url: string | null
          like_count: number
          bookmark_count: number
          view_count: number
          rejection_reason: string | null
          reviewed_by: string | null
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          creator_id?: string | null
          category_id: number
          name: string
          description_short: string
          description_long?: string | null
          tech: Database['public']['Enums']['component_tech']
          status?: Database['public']['Enums']['component_status']
          code_html?: string | null
          code_tailwind?: string | null
          code_react?: string | null
          code_vue?: string | null
          preview_html: string
          thumbnail_url?: string | null
          like_count?: number
          bookmark_count?: number
          view_count?: number
          rejection_reason?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          creator_id?: string | null
          category_id?: number
          name?: string
          description_short?: string
          description_long?: string | null
          tech?: Database['public']['Enums']['component_tech']
          status?: Database['public']['Enums']['component_status']
          code_html?: string | null
          code_tailwind?: string | null
          code_react?: string | null
          code_vue?: string | null
          preview_html?: string
          thumbnail_url?: string | null
          like_count?: number
          bookmark_count?: number
          view_count?: number
          rejection_reason?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: { id: number; name: string; created_at: string }
        Insert: { id?: number; name: string; created_at?: string }
        Update: { id?: number; name?: string; created_at?: string }
      }
      component_tags: {
        Row: { component_id: string; tag_id: number }
        Insert: { component_id: string; tag_id: number }
        Update: { component_id?: string; tag_id?: number }
      }
      likes: {
        Row: { id: string; user_id: string; component_id: string; created_at: string }
        Insert: { id?: string; user_id: string; component_id: string; created_at?: string }
        Update: { id?: string; user_id?: string; component_id?: string; created_at?: string }
      }
      bookmarks: {
        Row: { id: string; user_id: string; component_id: string; created_at: string }
        Insert: { id?: string; user_id: string; component_id: string; created_at?: string }
        Update: { id?: string; user_id?: string; component_id?: string; created_at?: string }
      }
    }
    Views: {
      trending_components: {
        Row: Database['public']['Tables']['components']['Row'] & { trending_score: number }
      }
    }
    Enums: {
      component_tech: 'html_css' | 'tailwind' | 'react_jsx' | 'vue'
      component_status: 'draft' | 'pending_review' | 'published' | 'rejected'
    }
  }
}
