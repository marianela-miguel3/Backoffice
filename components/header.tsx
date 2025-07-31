"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onLogout: () => void
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <header className="bg-gray-600 shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
         <img src="/logo.png" alt="Yellow Bear Logo" className="h-16 mr-2" />
          <span className="text-2xl font-bold text-amber-300">Yellow Bear</span>
        </div>
 <Button onClick={onLogout} variant="outline" className="flex items-center gap-2 bg-gray-200 text-black">
          <LogOut className="h-4 w-4" />
       
          Cerrar sesión
        </Button>
      </div>
    </header>
  )
}
