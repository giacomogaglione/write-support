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
      recipes: {
        Row: {
          content: string | null
          cooking_time: string | null
          created_at: string | null
          difficulty: string | null
          id: string
          ingredients: string | null
          low_calori: boolean | null
          paleo: boolean | null
          people: string | null
          user_id: string | null
          vegan: boolean | null
        }
        Insert: {
          content?: string | null
          cooking_time?: string | null
          created_at?: string | null
          difficulty?: string | null
          id?: string
          ingredients?: string | null
          low_calori?: boolean | null
          paleo?: boolean | null
          people?: string | null
          user_id?: string | null
          vegan?: boolean | null
        }
        Update: {
          content?: string | null
          cooking_time?: string | null
          created_at?: string | null
          difficulty?: string | null
          id?: string
          ingredients?: string | null
          low_calori?: boolean | null
          paleo?: boolean | null
          people?: string | null
          user_id?: string | null
          vegan?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
