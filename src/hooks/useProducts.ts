"use client"

import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import { API_ROUTES } from '@/lib/constants'
import type { PaginatedResponse, Product, SearchParams } from '@/types'
import { MOCK_PRODUCTS, sortProducts } from '@/lib/mock-data'

export interface UseProductsOptions extends SearchParams {
  enabled?: boolean
}

async function fetchProducts(params?: SearchParams): Promise<PaginatedResponse<Product>> {
  try {
    const response = await apiClient.get<PaginatedResponse<Product>>(API_ROUTES.PRODUCTS, {
      params: {
        q: params?.q,
        category: params?.category,
        min_price: params?.min_price,
        max_price: params?.max_price,
        sort: params?.sort,
        page: params?.page ?? 1,
        per_page: params?.per_page ?? 20,
      },
    })
    return response.data
  } catch {
    // Fallback to mock data when backend is unavailable
    const page = params?.page ?? 1
    const perPage = params?.per_page ?? 20
    const sorted = sortProducts(MOCK_PRODUCTS, params?.sort as any)
    const start = (page - 1) * perPage
    const paged = sorted.slice(start, start + perPage)
    const lastPage = Math.ceil(sorted.length / perPage)
    return {
      data: paged,
      current_page: page,
      last_page: lastPage,
      per_page: perPage,
      total: sorted.length,
      from: start + 1,
      to: Math.min(sorted.length, start + perPage),
    }
  }
}

export function useProducts(options?: UseProductsOptions) {
  const { enabled = true, ...params } = options ?? {}
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    enabled,
    staleTime: 5 * 60 * 1000,
  })
}

export async function fetchFeaturedProducts(): Promise<PaginatedResponse<Product>> {
  const response = await apiClient.get<PaginatedResponse<Product>>(API_ROUTES.FEATURED_PRODUCTS)
  return response.data
}


