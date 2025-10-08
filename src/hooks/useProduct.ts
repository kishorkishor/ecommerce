"use client"

import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import { API_ROUTES } from '@/lib/constants'
import type { Product } from '@/types'
import { MOCK_PRODUCTS } from '@/lib/mock-data'

async function fetchProduct(id: string): Promise<Product> {
  try {
    const response = await apiClient.get<Product>(API_ROUTES.PRODUCT(id))
    return response.data as unknown as Product
  } catch {
    const found = MOCK_PRODUCTS.find((p) => p.id === id)
    if (!found) throw new Error('Product not found')
    return found
  }
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}



