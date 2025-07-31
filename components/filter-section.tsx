"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Filters } from "../types/cotizacion"

interface FilterSectionProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export function FilterSection({ filters, onFiltersChange }: FilterSectionProps) {
  const handleFilterChange = (key: keyof Filters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de cotización</label>
          <Select value={filters.tipo} onValueChange={(value) => handleFilterChange("tipo", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos</SelectItem>
              <SelectItem value="CATALOGO">Catálogo</SelectItem>
              <SelectItem value="CUSTOM">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
          <Select value={filters.paymentMethod} onValueChange={(value) => handleFilterChange("paymentMethod", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar moneda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos</SelectItem>
              <SelectItem value="LOCAL">Local</SelectItem>
              <SelectItem value="OFFSHORE">Offshore</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de producto</label>
          <Select value={filters.productType} onValueChange={(value) => handleFilterChange("productType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos</SelectItem>
              <SelectItem value="LOCAL">Local</SelectItem>
              <SelectItem value="OFFSHORE">Offshore</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Estado de contacto</label>
          <Select value={filters.contactado} onValueChange={(value) => handleFilterChange("contactado", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos</SelectItem>
              <SelectItem value="CONTACTADO">Contactados</SelectItem>
              <SelectItem value="NO_CONTACTADO">No contactados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
