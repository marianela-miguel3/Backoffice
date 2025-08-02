"use client"

import { useState } from "react"
import axios from "axios"
import { Header } from "../components/header"
import { FilterSection } from "../components/filter-section"
import { CotizacionesTable } from "../components/cotizaciones-table"
import { ApiHealthStatus } from "@/components/ApiHealthStatus"
import { useQuotes, type Quote } from "../hooks/use-quotes"
import type { Filters } from "../types/cotizacion"

export default function App() {
  const { quotes, isLoading, error, updateQuoteContacted } = useQuotes();
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

  const handleContactadoChange = (id: number, contactado: boolean) => {
    updateQuoteContacted(id, contactado);
  }


  const filteredQuotes: Quote[] = quotes.filter((quote) => {
    const tipoMatch = filters.tipo === "TODOS" || 
      (filters.tipo === "CATALOGO" && quote.type === "CATALOG") ||
      (filters.tipo === "CUSTOM" && quote.type === "CUSTOM")

    // Lógica de filtro de forma de pago simplificada
    let paymentMatch = true
    if (filters.paymentMethod !== "TODOS") {
      if (filters.paymentMethod === "LOCAL") {
        // LOCAL incluye: LOCAL_CASH, WIRE, LETTER_OFF_CREDIT
        paymentMatch =
          quote.paymentMethod === "LOCAL_CASH" ||
          quote.paymentMethod === "WIRE" ||
          quote.paymentMethod === "LETTER_OFF_CREDIT"
      } else if (filters.paymentMethod === "OFFSHORE") {
        // OFFSHORE incluye solo: OFFSHORE_CASH
        paymentMatch = quote.paymentMethod === "OFFSHORE_CASH"
      }
    }

    // Para productType, mapeamos CATALOG/CUSTOM a LOCAL/OFFSHORE
    let productTypeMatch = true;
    if (filters.productType !== "TODOS") {
      if (filters.productType === "LOCAL") {
        productTypeMatch = quote.type === "CATALOG";
      } else if (filters.productType === "OFFSHORE") {
        productTypeMatch = quote.type === "CUSTOM";
      }
    }
    const contactadoMatch =
      filters.contactado === "TODOS" ||
      (filters.contactado === "CONTACTADO" && quote.contactado) ||
      (filters.contactado === "NO_CONTACTADO" && !quote.contactado)

    return tipoMatch && paymentMatch && productTypeMatch && contactadoMatch
  })

  const getActiveFiltersText = () => {
    const activeFilters = []
    if (filters.tipo !== "TODOS") {
      const tipoLabel = filters.tipo === "CATALOGO" ? "Catálogo" : "Custom"
      activeFilters.push(`Tipo: ${tipoLabel}`)
    }
    if (filters.paymentMethod !== "TODOS") {
      const paymentLabel = filters.paymentMethod === "LOCAL" ? "Local" : "Offshore"
      activeFilters.push(`Moneda: ${paymentLabel}`)
    }
    if (filters.productType !== "TODOS") {
      const productLabel = filters.productType === "LOCAL" ? "Catálogo" : "Custom"
      activeFilters.push(`Producto: ${productLabel}`)
    }
    if (filters.contactado !== "TODOS") {
      const contactadoLabel = filters.contactado === "CONTACTADO" ? "Contactados" : "No contactados"
      activeFilters.push(`Estado: ${contactadoLabel}`)
    }

    return activeFilters.length > 0 ? ` (${activeFilters.join(", ")})` : ""
  }

  const contactadosCount = quotes.filter((q) => q.contactado).length
  const noContactadosCount = quotes.filter((q) => !q.contactado).length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />

      <main className="container mx-auto px-6 py-8">
        {/* Estado de la API */}
        <div className="mb-6 flex justify-end">
          <ApiHealthStatus />
        </div>
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

        {isLoading && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Cargando cotizaciones...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700 font-medium">Error al cargar las cotizaciones:</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Cotizaciones
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredQuotes.length} resultados{getActiveFiltersText()})
              </span>
            </h2>
          </div>

          <CotizacionesTable cotizaciones={filteredQuotes} onContactadoChange={handleContactadoChange} />
        </div>
        )}
      </main>
    </div>
  )
}
