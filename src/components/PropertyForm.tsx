import { useState, useEffect } from "react"
import type { Property, PropertyInput, PropertyStatus } from "@/types"
import { STATUS_OPTIONS } from "@/types"
import { X } from "lucide-react"

interface PropertyFormProps {
  property?: Property | null
  onSave: (data: PropertyInput) => void
  onClose: () => void
}

const emptyForm: PropertyInput = {
  title: "",
  address: "",
  price: 0,
  expenses: 0,
  rooms: 1,
  bedrooms: 1,
  bathrooms: 1,
  area: 0,
  status: "pendiente",
  notes: "",
  url: "",
}

export function PropertyForm({ property, onSave, onClose }: PropertyFormProps) {
  const [form, setForm] = useState<PropertyInput>(emptyForm)

  useEffect(() => {
    if (property) {
      setForm({
        title: property.title,
        address: property.address,
        price: property.price,
        expenses: property.expenses,
        rooms: property.rooms,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        status: property.status,
        notes: property.notes,
        url: property.url,
      })
    }
  }, [property])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  const update = (field: keyof PropertyInput, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-100">
            {property ? "Editar propiedad" : "Agregar propiedad"}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-zinc-400">Título *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Ej: Departamento Palermo"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-zinc-400">Dirección</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Ej: Av. Santa Fe 1234"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm text-zinc-400">Precio (ARS) *</label>
              <input
                type="number"
                required
                min={0}
                value={form.price || ""}
                onChange={(e) => update("price", Number(e.target.value))}
                placeholder="0"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-zinc-400">Expensas (ARS)</label>
              <input
                type="number"
                min={0}
                value={form.expenses || ""}
                onChange={(e) => update("expenses", Number(e.target.value))}
                placeholder="0"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-sm text-zinc-400">Ambientes</label>
              <input
                type="number"
                min={1}
                value={form.rooms}
                onChange={(e) => update("rooms", Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-zinc-400">Dormitorios</label>
              <input
                type="number"
                min={0}
                value={form.bedrooms}
                onChange={(e) => update("bedrooms", Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-zinc-400">Baños</label>
              <input
                type="number"
                min={1}
                value={form.bathrooms}
                onChange={(e) => update("bathrooms", Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-zinc-400">m²</label>
              <input
                type="number"
                min={0}
                value={form.area || ""}
                onChange={(e) => update("area", Number(e.target.value))}
                placeholder="0"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-zinc-400">Estado</label>
            <div className="flex gap-2 flex-wrap">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => update("status", s.value as PropertyStatus)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    form.status === s.value
                      ? `${s.color} text-white border-transparent`
                      : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-zinc-400">Link de publicación</label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => update("url", e.target.value)}
              placeholder="https://..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-zinc-400">Notas</label>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Qué te gustó, qué no, detalles del barrio..."
              rows={3}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm text-zinc-400 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-zinc-900 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors"
            >
              {property ? "Guardar cambios" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
