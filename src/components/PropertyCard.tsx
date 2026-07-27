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
    <article className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-3 hover:border-zinc-700 transition-colors duration-200">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-zinc-100 truncate text-balance">{property.title}</h3>
          <p className="text-sm text-zinc-400 truncate">{property.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor={`status-${property.id}`} className="sr-only">
            Estado de {property.title}
          </label>
          <select
            id={`status-${property.id}`}
            name={`status-${property.id}`}
            value={property.status}
            onChange={(e) => onStatusChange(property.id, e.target.value as PropertyStatus)}
            aria-label={`Estado de ${property.title}`}
            className={cn(
              "text-xs font-medium px-2.5 py-1.5 min-h-[36px] rounded-full border-0 text-white cursor-pointer bg-zinc-800",
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
      </div>

      <div className="flex items-center gap-4 text-sm text-zinc-300">
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-zinc-500" aria-hidden="true" />
          <span className="font-semibold tabular-nums">{formatCurrency(property.price)}</span>
          {property.expenses > 0 && (
            <span className="text-zinc-500 text-xs tabular-nums">+&nbsp;{formatCurrency(property.expenses)}&nbsp;exp.</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-zinc-400">
        <div className="flex items-center gap-1">
          <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="tabular-nums">{property.area}&nbsp;m²</span>
        </div>
        <div className="flex items-center gap-1">
          <BedDouble className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="tabular-nums">{property.rooms}&nbsp;amb.</span>
        </div>
        <div className="flex items-center gap-1">
          <Bath className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="tabular-nums">{property.bathrooms}&nbsp;baños</span>
        </div>
      </div>

      {property.notes && (
        <p className="text-xs text-zinc-500 line-clamp-2 border-t border-zinc-800 pt-2 break-words">{property.notes}</p>
      )}

      <div className="flex items-center gap-1 pt-1 border-t border-zinc-800">
        <button
          onClick={() => onEdit(property)}
          aria-label={`Editar ${property.title}`}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors duration-150 px-3 py-2 min-h-[36px] rounded hover:bg-zinc-800 touch-manipulation"
        >
          <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
          Editar
        </button>
        <button
          onClick={() => onDelete(property.id)}
          aria-label={`Eliminar ${property.title}`}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-400 transition-colors duration-150 px-3 py-2 min-h-[36px] rounded hover:bg-zinc-800 touch-manipulation"
        >
          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
          Eliminar
        </button>
        {property.url && (
          <a
            href={property.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir publicación de ${property.title}`}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-blue-400 transition-colors duration-150 px-3 py-2 min-h-[36px] rounded hover:bg-zinc-800 ml-auto touch-manipulation"
          >
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            Publicación
          </a>
        )}
      </div>
    </article>
  )
}
