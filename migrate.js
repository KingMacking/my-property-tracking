// =====================================================
// MIGRATION SCRIPT — localStorage → Supabase
// Copiar y pegar en la consola del browser (F12)
// =====================================================
// 1. Abrir la app vieja (con localStorage) en una pestaña
// 2. Abrir la consola (F12 → Console)
// 3. Pegar este script y Enter
// =====================================================

const SUPABASE_URL = "https://iiwerjzprkjvlankzbhk.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpd2Vyanpwcmtqdmxhbmt6YmhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1OTE1NTMsImV4cCI6MjA5ODE2NzU1M30.HESsl6AnlsQYLqfiE6f_e61EN_KB3Pckle3aNuyjX3g"

const rawData = localStorage.getItem("property-tracker")
if (!rawData) {
  console.log("❌ No se encontraron datos en localStorage con key 'property-tracker'")
} else {
  const properties = JSON.parse(rawData)
  console.log(`📋 Encontradas ${properties.length} propiedades. Migrando...`)

  const payload = properties.map((p) => ({
    title: p.title || "",
    address: p.address || "",
    price: p.price || 0,
    expenses: p.expenses || 0,
    rooms: p.rooms || 1,
    bedrooms: p.bedrooms || 1,
    bathrooms: p.bathrooms || 1,
    area: p.area || 0,
    status: p.status || "pendiente",
    notes: p.notes || "",
    url: p.url || "",
    created_at: p.createdAt || new Date().toISOString(),
    updated_at: p.updatedAt || new Date().toISOString(),
  }))

  fetch(`${SUPABASE_URL}/rest/v1/properties`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (res.ok) {
        console.log(`✅ ${properties.length} propiedades migradas a Supabase!`)
        console.log("Podés verificar en: https://supabase.com/dashboard/project/iiwerjzprkjvlankzbhk/editor")
      } else {
        res.text().then((t) => console.error("❌ Error:", t))
      }
    })
    .catch((err) => console.error("❌ Error de red:", err))
}
