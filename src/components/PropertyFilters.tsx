import type { PropertyStatus } from "@/types"
import { STATUS_OPTIONS } from "@/types"
import { Search, X } from "lucide-react"

interface PropertyFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: PropertyStatus | "todos"
  onStatusFilterChange: (value: PropertyStatus | "todos") => void
}

export function PropertyFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: PropertyFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por dirección o título..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-8 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onStatusFilterChange("todos")}
          className={`text-xs font-medium px-3 py-2 rounded-lg border transition-colors whitespace-nowrap ${
            statusFilter === "todos"
              ? "bg-zinc-100 text-zinc-900 border-transparent"
              : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          Todos
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s.value}
            onClick={() => onStatusFilterChange(s.value)}
            className={`text-xs font-medium px-3 py-2 rounded-lg border transition-colors whitespace-nowrap ${
              statusFilter === s.value
                ? `${s.color} text-white border-transparent`
                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
