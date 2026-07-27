export type PropertyStatus = "pendiente" | "contactado" | "visitado" | "interesado" | "descartado"

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
  createdAt: string
  updatedAt: string
}

export type PropertyInput = Omit<Property, "id" | "createdAt" | "updatedAt">

export const STATUS_OPTIONS: { value: PropertyStatus; label: string; color: string }[] = [
  { value: "pendiente", label: "Pendiente", color: "bg-slate-500" },
  { value: "contactado", label: "Contactado", color: "bg-blue-500" },
  { value: "visitado", label: "Visitado", color: "bg-amber-500" },
  { value: "interesado", label: "Interesado", color: "bg-emerald-500" },
  { value: "descartado", label: "Descartado", color: "bg-red-500" },
]
