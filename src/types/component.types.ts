import type { Database } from './database.types'

export type ComponentRow = Database['public']['Tables']['components']['Row']
export type ComponentInsert = Database['public']['Tables']['components']['Insert']
export type ComponentUpdate = Database['public']['Tables']['components']['Update']
export type ComponentTech = Database['public']['Enums']['component_tech']
export type ComponentStatus = Database['public']['Enums']['component_status']

export interface ComponentWithMeta extends ComponentRow {
  creator: {
    username: string
    display_name: string
    avatar_url: string | null
  } | null
  category: {
    name: string
    slug: string
    icon: string | null
  }
  tags: string[]
  is_liked?: boolean
  is_bookmarked?: boolean
}
