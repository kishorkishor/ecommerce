"use client"

import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import { API_ROUTES } from '@/lib/constants'
import type { PaginatedResponse, Product } from '@/types'
import { MOCK_PRODUCTS, sortProducts, categoryIdForSlug } from '@/lib/mock-data'

async function fetchCategoryProducts(slug: string, page = 1, perPage = 24, sort?: string): Promise<PaginatedResponse<Product>> {
  try {
    const response = await apiClient.get<PaginatedResponse<Product>>(API_ROUTES.CATEGORY_PRODUCTS(slug), {
      params: { page, per_page: perPage, sort },
    })
    return response.data
  } catch {
    const cid = categoryIdForSlug(slug)
    const filtered = MOCK_PRODUCTS.filter((p) => (cid ? p.category_id === cid : true))
    const sorted = sortProducts(filtered, sort as any)
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

export function useCategoryProducts(slug: string, page = 1, perPage = 24, sort?: string) {
  return useQuery({
    queryKey: ['category-products', slug, page, perPage, sort],
    queryFn: () => fetchCategoryProducts(slug, page, perPage, sort),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}


