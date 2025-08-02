import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, XCircle, FileText, Mail, Phone } from 'lucide-react'
import type { Quote } from "../hooks/use-quotes"

interface CotizacionesTableProps {
  cotizaciones: Quote[]
  onContactadoChange: (id: number, contactado: boolean) => void
}

const paymentMethodLabels: Record<string, string> = {
  LOCAL_CASH: "Efectivo",
  OFFSHORE_CASH: "Efectivo OFF",
  WIRE: "Transfer.",
  LETTER_OFF_CREDIT: "L. Crédito",
}

export function CotizacionesTable({ cotizaciones, onContactadoChange }: CotizacionesTableProps) {
  const getContactInfo = (email: string, phone: string) => {
    return (
      <div className="flex flex-col gap-1">
        {email && (
          <div className="flex items-center gap-1 text-xs">
            <Mail className="h-3 w-3 text-gray-400" />
            <span className="truncate max-w-[120px]" title={email}>
              {email}
            </span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-1 text-xs">
            <Phone className="h-3 w-3 text-gray-400" />
            <span>{phone}</span>
          </div>
        )}
        {!email && !phone && "-"}
      </div>
    )
  }

  const getProductName = (quote: Quote) => {
    if (quote.type === "CATALOG") {
      return `Producto ID: ${quote.productInCatalogId}` || "-"
    } else {
      return quote.customProductName || "-"
    }
  }

  const getProductDescription = (quote: Quote) => {
    if (quote.type === "CATALOG") {
      return "Producto del catálogo"
    } else {
      return quote.customProductDescription || "-"
    }
  }

  return (
    <div className="w-full rounded-md border">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="text-xs">
            <TableHead className="text-center">Contactado</TableHead>
            <TableHead className="w-16">Tipo</TableHead>
            <TableHead className="w-32">Producto</TableHead>
            <TableHead className="w-40">Descripción</TableHead>
            <TableHead className="w-16 text-center">Cant.</TableHead>
            <TableHead className="w-28">Cliente</TableHead>
            <TableHead className="w-28">Empresa</TableHead>
            <TableHead className="w-24">CUIT</TableHead>
            <TableHead className="w-32">Dirección</TableHead>
            <TableHead className="w-20">Pago</TableHead>
            <TableHead className="w-16">Prod.</TableHead>
            <TableHead className="w-20">P.Ref.</TableHead>
            <TableHead className="w-32">Contacto</TableHead>
            <TableHead className="w-32">Comentarios</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cotizaciones.length === 0 ? (
            <TableRow>
              <TableCell colSpan={14} className="text-center py-8 text-gray-500">
                No hay cotizaciones para mostrar
              </TableCell>
            </TableRow>
          ) : (
            cotizaciones.map((quote) => (
              <TableRow key={quote.id} className="text-xs">
                <TableCell className="p-2 text-center">
                  <Checkbox
                    checked={quote.contactado || false}
                    onCheckedChange={(checked) => onContactadoChange(quote.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="p-2">
                  <Badge 
                    variant={quote.type === "CATALOG" ? "default" : "secondary"}
                    className="text-xs px-1 py-0"
                  >
                    {quote.type === "CATALOG" ? "CAT" : "CUS"}
                  </Badge>
                </TableCell>
                <TableCell className="p-2">
                  <div className="font-medium text-xs truncate" title={getProductName(quote)}>
                    {getProductName(quote)}
                  </div>
                  {quote.type === "CUSTOM" && quote.customProductSerialNumber && (
                    <div className="text-xs text-gray-500 mt-1 truncate">
                      {quote.customProductSerialNumber}
                    </div>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  <div className="text-xs truncate" title={getProductDescription(quote)}>
                    {getProductDescription(quote)}
                  </div>
                </TableCell>
                <TableCell className="p-2 text-center">
                  <div className="font-medium text-xs">1</div>
                </TableCell>
                <TableCell className="p-2">
                  <div className="truncate text-xs" title={quote.fullName || "-"}>
                    {quote.fullName || "-"}
                  </div>
                </TableCell>
                <TableCell className="p-2">
                  <div className="truncate text-xs" title={quote.companyName || "-"}>
                    {quote.companyName || "-"}
                  </div>
                </TableCell>
                <TableCell className="p-2">
                  <div className="text-xs">{quote.cuilCuit || "-"}</div>
                </TableCell>
                <TableCell className="p-2">
                  <div className="text-xs">
                    <div className="truncate" title={quote.address || "-"}>
                      {quote.address || "-"}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {quote.addressLat?.toFixed(2)}, {quote.addressLong?.toFixed(2)}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-2">
                  <div className="text-xs">
                    {quote.paymentMethod ? paymentMethodLabels[quote.paymentMethod] : "-"}
                  </div>
                </TableCell>
                <TableCell className="p-2">
                  <Badge 
                    variant={quote.paymentMethod === "LOCAL_CASH" || quote.paymentMethod === "WIRE" || quote.paymentMethod === "LETTER_OFF_CREDIT" ? "outline" : "destructive"}
                    className="text-xs px-1 py-0"
                  >
                    {quote.paymentMethod === "LOCAL_CASH" || quote.paymentMethod === "WIRE" || quote.paymentMethod === "LETTER_OFF_CREDIT" ? "LOC" : "OFF"}
                  </Badge>
                </TableCell>
                <TableCell className="p-2">
                  <div className="flex items-center gap-1">
                    {quote.hasReferencePrice ? (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    ) : (
                      <XCircle className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                  {quote.hasReferencePrice && quote.referencePriceFileURL && (
                    <a
                      href={quote.referencePriceFileURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
                    >
                      <FileText className="h-3 w-3" />
                    </a>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  {getContactInfo(quote.contactEmail, quote.contactPhone)}
                </TableCell>
                <TableCell className="p-2">
                  <div className="text-xs truncate" title={quote.comments || "-"}>
                    {quote.comments || "-"}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
