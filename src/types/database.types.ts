export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      document_attributes: {
        Row: {
          code_name: string
          created_at: string
          id: number
          name: string
          required: boolean | null
          template_id: number
          type: string
        }
        Insert: {
          code_name: string
          created_at?: string
          id?: number
          name: string
          required?: boolean | null
          template_id: number
          type: string
        }
        Update: {
          code_name?: string
          created_at?: string
          id?: number
          name?: string
          required?: boolean | null
          template_id?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: 'document_attributes_template_id_fkey'
            columns: ['template_id']
            isOneToOne: false
            referencedRelation: 'document_templates'
            referencedColumns: ['id']
          },
        ]
      }
      document_status: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      document_templates: {
        Row: {
          content: Json | null
          created_at: string
          description: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          description: string
          id?: number
          name: string
          user_id?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          description?: string
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'document_templates_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: number
          payment_date: string
          payment_method: string
          payment_status: string
          subscription_id: number
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: number
          payment_date?: string
          payment_method: string
          payment_status: string
          subscription_id: number
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: number
          payment_date?: string
          payment_method?: string
          payment_status?: string
          subscription_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'payments_subscription_id_fkey'
            columns: ['subscription_id']
            isOneToOne: false
            referencedRelation: 'subscriptions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'payments_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      subscription_history: {
        Row: {
          created_at: string
          end_date: string
          id: number
          plan_id: number
          start_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: number
          plan_id: number
          start_date: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: number
          plan_id?: number
          start_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'subscription_history_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'subscription_plans'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'subscription_history_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string
          description: string | null
          duration: number
          id: number
          name: string
          price: number
          trial_duration_days: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration: number
          id?: number
          name: string
          price: number
          trial_duration_days?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          duration?: number
          id?: number
          name?: string
          price?: number
          trial_duration_days?: number | null
        }
        Relationships: []
      }
      subscription_status: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: number
          is_trial: boolean
          plan_id: number
          start_date: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: number
          is_trial?: boolean
          plan_id: number
          start_date: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: number
          is_trial?: boolean
          plan_id?: number
          start_date?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'subscriptions_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'subscription_plans'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'subscriptions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      user_documents: {
        Row: {
          attributes: Json
          created_at: string
          generated_at: string | null
          id: number
          name: string
          path: string | null
          status_id: number | null
          template_id: number
          user_id: string
        }
        Insert: {
          attributes: Json
          created_at?: string
          generated_at?: string | null
          id?: number
          name: string
          path?: string | null
          status_id?: number | null
          template_id: number
          user_id?: string
        }
        Update: {
          attributes?: Json
          created_at?: string
          generated_at?: string | null
          id?: number
          name?: string
          path?: string | null
          status_id?: number | null
          template_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_documents_status_id_fkey'
            columns: ['status_id']
            isOneToOne: false
            referencedRelation: 'document_status'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_documents_template_id_fkey'
            columns: ['template_id']
            isOneToOne: false
            referencedRelation: 'document_templates'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_documents_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
  Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
  PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
    PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends | keyof PublicSchema['Enums']
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
