"use client"

import { useState } from "react"
import { Header } from "../components/header"
import { FilterSection } from "../components/filter-section"
import { CotizacionesTable } from "../components/cotizaciones-table"
import { sampleCotizaciones } from "../data/sample-data"
import type { Filters, Cotizacion } from "../types/cotizacion"

export default function App() {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>(sampleCotizaciones)
  const [filters, setFilters] = useState<Filters>({
    tipo: "TODOS",
    paymentMethod: "TODOS",
    productType: "TODOS",
    contactado: "TODOS",
  })

  const handleLogout = () => {
    alert("Has cerrado sesión")
  }

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters)
  }

  const handleContactadoChange = (index: number, contactado: boolean) => {
    const updatedCotizaciones = [...cotizaciones]
    updatedCotizaciones[index] = { ...updatedCotizaciones[index], contactado }
    setCotizaciones(updatedCotizaciones)
  }


  const filteredCotizaciones: Cotizacion[] = cotizaciones.filter((cotizacion) => {
    const tipoMatch = filters.tipo === "TODOS" || cotizacion.tipo === filters.tipo

    // Lógica de filtro de forma de pago simplificada
    let paymentMatch = true
    if (filters.paymentMethod !== "TODOS") {
      if (filters.paymentMethod === "LOCAL") {
        // LOCAL incluye: LOCAL_CASH, WIRE, LETTER_OFF_CREDIT
        paymentMatch =
          cotizacion.paymentMethod === "LOCAL_CASH" ||
          cotizacion.paymentMethod === "WIRE" ||
          cotizacion.paymentMethod === "LETTER_OFF_CREDIT"
      } else if (filters.paymentMethod === "OFFSHORE") {
        // OFFSHORE incluye solo: OFFSHORE_CASH
        paymentMatch = cotizacion.paymentMethod === "OFFSHORE_CASH"
      }
    }

    const productTypeMatch = filters.productType === "TODOS" || cotizacion.productType === filters.productType
    const contactadoMatch =
      filters.contactado === "TODOS" ||
      (filters.contactado === "CONTACTADO" && cotizacion.contactado) ||
      (filters.contactado === "NO_CONTACTADO" && !cotizacion.contactado)

    return tipoMatch && paymentMatch && productTypeMatch && contactadoMatch
  })

  const getActiveFiltersText = () => {
    const activeFilters = []
    if (filters.tipo !== "TODOS") activeFilters.push(`Tipo: ${filters.tipo}`)
    if (filters.paymentMethod !== "TODOS") {
      const paymentLabel = filters.paymentMethod === "LOCAL" ? "Local" : "Offshore"
      activeFilters.push(`Moneda: ${paymentLabel}`)
    }
    if (filters.productType !== "TODOS") activeFilters.push(`Producto: ${filters.productType}`)
    if (filters.contactado !== "TODOS") {
      const contactadoLabel = filters.contactado === "CONTACTADO" ? "Contactados" : "No contactados"
      activeFilters.push(`Estado: ${contactadoLabel}`)
    }

    return activeFilters.length > 0 ? ` (${activeFilters.join(", ")})` : ""
  }

  const contactadosCount = cotizaciones.filter((c) => c.contactado).length
  const noContactadosCount = cotizaciones.filter((c) => !c.contactado).length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Cotizaciones</h1>
          <p className="text-gray-600">Admin Yellow Bear S.A
              <span className="ml-4 text-sm">
              <span className="text-green-600 font-medium">Contactados: {contactadosCount}</span>
              <span className="mx-2">•</span>
              <span className="text-orange-600 font-medium">Pendientes: {noContactadosCount}</span>
            </span>
          </p>
        </div>

        <FilterSection filters={filters} onFiltersChange={handleFiltersChange} />

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Cotizaciones
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredCotizaciones.length} resultados{getActiveFiltersText()})
              </span>
            </h2>
          </div>

          <CotizacionesTable cotizaciones={filteredCotizaciones} onContactadoChange={handleContactadoChange} />
        </div>
      </main>
    </div>
  )
}
