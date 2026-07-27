import { useState, useEffect, useRef } from "react"
import type { Property, PropertyInput, PropertyStatus } from "@/types"
import { STATUS_OPTIONS } from "@/types"
import { X, Loader2 } from "lucide-react"

interface PropertyFormProps {
  property?: Property | null
  onSave: (data: PropertyInput) => Promise<void>
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
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      await onSave(form)
    } catch (err) {
      setError("No se pudo guardar. Intentá de nuevo.")
    } finally {
      setSaving(false)
    }
  }

  const update = (field: keyof PropertyInput, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const inputClass =
    "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none focus-visible:border-zinc-600 transition-colors duration-150"

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={property ? "Editar propiedad" : "Agregar propiedad"}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-lg max-h-[90dvh] overflow-y-auto overscroll-behavior-contain">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-100 text-balance">
            {property ? "Editar propiedad" : "Agregar propiedad"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar formulario"
            className="text-zinc-400 hover:text-zinc-200 transition-colors duration-150 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4" noValidate>
          <div className="space-y-1">
            <label htmlFor="prop-title" className="text-sm text-zinc-400">
              Título <span aria-hidden="true">*</span>
            </label>
            <input
              ref={titleRef}
              id="prop-title"
              type="text"
              name="title"
              required
              autoComplete="off"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Ej: Departamento Palermo"
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="prop-address" className="text-sm text-zinc-400">
              Dirección
            </label>
            <input
              id="prop-address"
              type="text"
              name="address"
              autoComplete="off"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Ej: Av. Santa Fe 1234"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="prop-price" className="text-sm text-zinc-400">
                Precio (ARS) <span aria-hidden="true">*</span>
              </label>
              <input
                id="prop-price"
                type="number"
                name="price"
                required
                min={0}
                inputMode="numeric"
                value={form.price || ""}
                onChange={(e) => update("price", Number(e.target.value))}
                placeholder="0"
                className={`${inputClass} tabular-nums`}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="prop-expenses" className="text-sm text-zinc-400">
                Expensas (ARS)
              </label>
              <input
                id="prop-expenses"
                type="number"
                name="expenses"
                min={0}
                inputMode="numeric"
                value={form.expenses || ""}
                onChange={(e) => update("expenses", Number(e.target.value))}
                placeholder="0"
                className={`${inputClass} tabular-nums`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label htmlFor="prop-rooms" className="text-sm text-zinc-400">
                Ambientes
              </label>
              <input
                id="prop-rooms"
                type="number"
                name="rooms"
                min={1}
                inputMode="numeric"
                value={form.rooms}
                onChange={(e) => update("rooms", Number(e.target.value))}
                className={`${inputClass} tabular-nums`}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="prop-bedrooms" className="text-sm text-zinc-400">
                Dormitorios
              </label>
              <input
                id="prop-bedrooms"
                type="number"
                name="bedrooms"
                min={0}
                inputMode="numeric"
                value={form.bedrooms}
                onChange={(e) => update("bedrooms", Number(e.target.value))}
                className={`${inputClass} tabular-nums`}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="prop-bathrooms" className="text-sm text-zinc-400">
                Baños
              </label>
              <input
                id="prop-bathrooms"
                type="number"
                name="bathrooms"
                min={1}
                inputMode="numeric"
                value={form.bathrooms}
                onChange={(e) => update("bathrooms", Number(e.target.value))}
                className={`${inputClass} tabular-nums`}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="prop-area" className="text-sm text-zinc-400">
                m²
              </label>
              <input
                id="prop-area"
                type="number"
                name="area"
                min={0}
                inputMode="numeric"
                value={form.area || ""}
                onChange={(e) => update("area", Number(e.target.value))}
                placeholder="0"
                className={`${inputClass} tabular-nums`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-sm text-zinc-400" id="prop-status-label">Estado</span>
            <div className="flex gap-2 flex-wrap" role="radiogroup" aria-labelledby="prop-status-label">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  role="radio"
                  aria-checked={form.status === s.value}
                  onClick={() => update("status", s.value as PropertyStatus)}
                  className={`text-xs font-medium px-3 py-2 min-h-[36px] rounded-full border transition-colors duration-150 touch-manipulation ${
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
            <label htmlFor="prop-url" className="text-sm text-zinc-400">
              Link de publicación
            </label>
            <input
              id="prop-url"
              type="url"
              name="url"
              autoComplete="off"
              value={form.url}
              onChange={(e) => update("url", e.target.value)}
              placeholder="https://…"
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="prop-notes" className="text-sm text-zinc-400">
              Notas
            </label>
            <textarea
              id="prop-notes"
              name="notes"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Qué te gustó, qué no, detalles del barrio…"
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {error && (
            <div role="alert" className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 px-4 py-2.5 min-h-[44px] text-sm text-zinc-400 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 transition-colors duration-150 disabled:opacity-50 touch-manipulation"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 min-h-[44px] text-sm font-medium text-zinc-900 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors duration-150 disabled:opacity-50 flex items-center justify-center gap-2 touch-manipulation"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  Guardando…
                </>
              ) : property ? (
                "Guardar cambios"
              ) : (
                "Agregar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
