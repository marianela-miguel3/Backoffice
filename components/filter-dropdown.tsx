"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FilterType } from "../types/cotizacion"

interface FilterDropdownProps {
  selectedFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export function FilterDropdown({ selectedFilter, onFilterChange }: FilterDropdownProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por tipo de cotización</label>
      <Select value={selectedFilter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Seleccionar tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="TODOS">Todos</SelectItem>
          <SelectItem value="CATALOGO">Catálogo</SelectItem>
          <SelectItem value="CUSTOM">Custom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
