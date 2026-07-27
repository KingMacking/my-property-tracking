export type PropertyStatus = "pendiente" | "contactado" | "visitado" | "interesado" | "descartado"

export type InteractionType = "llamada" | "whatsapp" | "email" | "visita" | "otro"

export interface Interaction {
  id: string
  type: InteractionType
  notes: string
  date: string
}

export interface Property {
  id: string
  title: string
  address: string
  price: number
  expenses: number
  rooms: number
  bedrooms: number
  bathrooms: number
  area: number
  status: PropertyStatus
  notes: string
  url: string
  interactions: Interaction[]
  created_at: string
  updated_at: string
}

export type PropertyInput = Omit<Property, "id" | "created_at" | "updated_at">

export const STATUS_OPTIONS: { value: PropertyStatus; label: string; color: string }[] = [
  { value: "pendiente", label: "Pendiente", color: "bg-slate-500" },
  { value: "contactado", label: "Contactado", color: "bg-blue-500" },
  { value: "visitado", label: "Visitado", color: "bg-amber-500" },
  { value: "interesado", label: "Interesado", color: "bg-emerald-500" },
  { value: "descartado", label: "Descartado", color: "bg-red-500" },
]

export const INTERACTION_TYPE_OPTIONS: { value: InteractionType; label: string; icon: string }[] = [
  { value: "llamada", label: "Llamada", icon: "📞" },
  { value: "whatsapp", label: "WhatsApp", icon: "💬" },
  { value: "email", label: "Email", icon: "✉️" },
  { value: "visita", label: "Visita", icon: "🏠" },
  { value: "otro", label: "Otro", icon: "📝" },
]
