export type PaymentMethod = "LOCAL_CASH" | "OFFSHORE_CASH" | "WIRE" | "LETTER_OFF_CREDIT"
export type ProductType = "LOCAL" | "OFFSHORE"

export interface Address {
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface ContactInfo {
  email?: string
  phoneNumber?: string
}

export interface CotizacionCatalogo {
  tipo: "CATALOGO"
  catalogId: number
  productName?: string
  productDescription?: string
  quantity: number
  fullName?: string
  companyName?: string
  cuilCuit?: string
  address?: Address
  hasReferencePrice: boolean
  referencePriceDescription?: string
  referencePriceFileURL?: string
  paymentMethod?: PaymentMethod
  productType: ProductType
  contactInfo: ContactInfo
  comments: string
  contactado: boolean
}

export interface CotizacionCustom {
  tipo: "CUSTOM"
  productDetails: {
    name?: string
    url?: string
    description?: string
    serialNumber?: string
  }
  quantity: number
  fullName?: string
  companyName?: string
  cuilCuit?: string
  address?: Address
  hasReferencePrice: boolean
  referencePriceDescription?: string
  referencePriceFileURL?: string
  paymentMethod?: PaymentMethod
  productType: ProductType
  contactInfo: ContactInfo
  comments?: string
  contactado: boolean
}

export type Cotizacion = CotizacionCatalogo | CotizacionCustom

export type FilterType = "TODOS" | "CATALOGO" | "CUSTOM"
export type PaymentMethodFilter = "TODOS" | "LOCAL" | "OFFSHORE"
export type ProductTypeFilter = "TODOS" | ProductType
export type ContactadoFilter = "TODOS" | "CONTACTADO" | "NO_CONTACTADO"

export interface Filters {
  tipo: FilterType
  paymentMethod: PaymentMethodFilter
  productType: ProductTypeFilter
  contactado: ContactadoFilter
}
