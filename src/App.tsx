import { useState, useMemo, useEffect } from "react"
import type { Property, PropertyInput, PropertyStatus } from "@/types"
import { supabase } from "@/lib/supabase"
import { PropertyCard } from "@/components/PropertyCard"
import { PropertyForm } from "@/components/PropertyForm"
import { PropertyFilters } from "@/components/PropertyFilters"
import { Plus, Home, Loader2 } from "lucide-react"

export default function App() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Property | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | "todos">("todos")

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setProperties(data as Property[])
    }
    setLoading(false)
  }

  const handleSave = async (data: PropertyInput) => {
    const now = new Date().toISOString()
    if (editing) {
      const { error } = await supabase
        .from("properties")
        .update({ ...data, updated_at: now })
        .eq("id", editing.id)

      if (!error) {
        setProperties((prev) =>
          prev.map((p) => (p.id === editing.id ? { ...p, ...data, updated_at: now } : p))
        )
      }
    } else {
      const { data: inserted, error } = await supabase
        .from("properties")
        .insert({ ...data, created_at: now, updated_at: now })
        .select()
        .single()

      if (!error && inserted) {
        setProperties((prev) => [inserted as Property, ...prev])
      }
    }
    setShowForm(false)
    setEditing(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta propiedad?")) return
    const { error } = await supabase.from("properties").delete().eq("id", id)
    if (!error) {
      setProperties((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const handleStatusChange = async (id: string, status: PropertyStatus) => {
    const now = new Date().toISOString()
    const { error } = await supabase
      .from("properties")
      .update({ status, updated_at: now })
      .eq("id", id)

    if (!error) {
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status, updated_at: now } : p))
      )
    }
  }

  const handleEdit = (property: Property) => {
    setEditing(property)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditing(null)
  }

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.address.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "todos" || p.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [properties, search, statusFilter])

  const stats = useMemo(() => {
    const total = properties.length
    const interested = properties.filter((p) => p.status === "interesado").length
    const visited = properties.filter((p) => p.status === "visitado").length
    return { total, interested, visited }
  }, [properties])

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <Home className="w-6 h-6" />
              Property Tracker
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              {stats.total} propiedades
              {stats.interested > 0 && ` · ${stats.interested} interesantes`}
              {stats.visited > 0 && ` · ${stats.visited} visitadas`}
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-zinc-100 text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="mb-6">
          <PropertyFilters
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Home className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 text-sm">
              {properties.length === 0
                ? "No tenés propiedades guardadas. ¡Agregá una!"
                : "No se encontraron propiedades con esos filtros."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && <PropertyForm property={editing} onSave={handleSave} onClose={handleCloseForm} />}
    </div>
  )
}
