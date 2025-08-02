import { useState, useEffect } from 'react';

export interface Quote {
  id: number;
  type: 'CATALOG' | 'CUSTOM';
  fullName: string;
  companyName: string;
  cuilCuit: string;
  address: string;
  addressLat: number;
  addressLong: number;
  hasReferencePrice: boolean;
  referencePriceDescription?: string;
  referencePriceFileURL?: string;
  paymentMethod: 'WIRE' | 'LOCAL_CASH' | 'OFFSHORE_CASH' | 'LETTER_OFF_CREDIT';
  contactEmail: string;
  contactPhone: string;
  comments?: string;
  createdAt: string;
  updatedAt: string;
  customProductName?: string;
  customProductDescription?: string;
  customProductUrl?: string;
  customProductSerialNumber?: string;
  productInCatalogId?: number;
  contactado?: boolean; // Campo adicional para el estado local
}

interface QuotesResponse {
  success: boolean;
  data: {
    quotes: Quote[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
  message: string;
}

export const useQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/quotes');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      
      const data: QuotesResponse = await response.json();
      
      // Agregar el campo contactado a cada quote (inicialmente false)
      const quotesWithContacted = data.data.quotes.map(quote => ({
        ...quote,
        contactado: false
      }));
      
      setQuotes(quotesWithContacted);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setError(error instanceof Error ? error.message : 'Error al cargar las cotizaciones');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuoteContacted = (id: number, contactado: boolean) => {
    setQuotes(prevQuotes => 
      prevQuotes.map(quote => 
        quote.id === id ? { ...quote, contactado } : quote
      )
    );
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return {
    quotes,
    isLoading,
    error,
    fetchQuotes,
    updateQuoteContacted,
  };
}; 