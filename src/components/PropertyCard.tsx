import type { Property, PropertyStatus } from "@/types"
import { STATUS_OPTIONS } from "@/types"
import { Pencil, Trash2, ExternalLink, BedDouble, Bath, Maximize2, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  property: Property
  onEdit: (property: Property) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: PropertyStatus) => void
}

export function PropertyCard({ property, onEdit, onDelete, onStatusChange }: PropertyCardProps) {
  const status = STATUS_OPTIONS.find((s) => s.value === property.status)

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(amount)

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-3 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-zinc-100 truncate">{property.title}</h3>
          <p className="text-sm text-zinc-400 truncate">{property.address}</p>
        </div>
        <select
          value={property.status}
          onChange={(e) => onStatusChange(property.id, e.target.value as PropertyStatus)}
          className={cn(
            "text-xs font-medium px-2 py-1 rounded-full border-0 text-white cursor-pointer",
            status?.color
          )}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4 text-sm text-zinc-300">
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-zinc-500" />
          <span className="font-semibold">{formatCurrency(property.price)}</span>
          {property.expenses > 0 && (
            <span className="text-zinc-500 text-xs">+ {formatCurrency(property.expenses)} exp.</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-zinc-400">
        <div className="flex items-center gap-1">
          <Maximize2 className="w-3.5 h-3.5" />
          <span>{property.area} m²</span>
        </div>
        <div className="flex items-center gap-1">
          <BedDouble className="w-3.5 h-3.5" />
          <span>{property.rooms} amb.</span>
        </div>
        <div className="flex items-center gap-1">
          <Bath className="w-3.5 h-3.5" />
          <span>{property.bathrooms} baños</span>
        </div>
      </div>

      {property.notes && (
        <p className="text-xs text-zinc-500 line-clamp-2 border-t border-zinc-800 pt-2">{property.notes}</p>
      )}

      <div className="flex items-center gap-2 pt-1 border-t border-zinc-800">
        <button
          onClick={() => onEdit(property)}
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors px-2 py-1 rounded hover:bg-zinc-800"
        >
          <Pencil className="w-3 h-3" />
          Editar
        </button>
        <button
          onClick={() => onDelete(property.id)}
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-zinc-800"
        >
          <Trash2 className="w-3 h-3" />
          Eliminar
        </button>
        {property.url && (
          <a
            href={property.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-zinc-800 ml-auto"
          >
            <ExternalLink className="w-3 h-3" />
            Publicación
          </a>
        )}
      </div>
    </div>
  )
}
