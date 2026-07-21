import type { Database } from './database.types'

export type UserRow = Database['public']['Tables']['users']['Row']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export interface CreatorProfile extends UserRow {
  total_components: number
  total_likes: number
  total_bookmarks: number
}
