export interface Database {
  public: {
    Tables: {
      users: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      categories: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      components: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      tags: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      component_tags: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      likes: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      bookmarks: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
    }
    Views: {
      trending_components: { Row: Record<string, unknown> }
    }
    Enums: {
      component_tech: 'html_css' | 'tailwind' | 'react_jsx' | 'vue'
      component_status: 'draft' | 'pending_review' | 'published' | 'rejected'
    }
  }
}
