import type { Product } from '@/types'

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 40 }).map((_, i) => {
  const id = (i + 1).toString()
  const base = 199 + (i % 10) * 50
  const discounted = i % 3 === 0 ? base - 30 : base
  return {
    id,
    name: `Demo Product ${i + 1}`,
    name_bn: `ডেমো পণ্য ${i + 1}`,
    description: 'High quality demo product for testing cart and listing.',
    price: discounted,
    original_price: discounted !== base ? base : undefined,
    discount_percentage: discounted !== base ? Math.round(((base - discounted) / base) * 100) : undefined,
    image: `https://picsum.photos/seed/cw-${i}/400/300`,
    images: [],
    category_id: (i % 4) + 1,
    stock_quantity: 100 - i,
    sold_count: 10 + i * 2,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
})

export type SortKey = 'popular' | 'new' | 'price_low' | 'price_high' | 'name'

export function sortProducts(list: Product[], sort?: SortKey) {
  if (!sort) return list
  const arr = [...list]
  switch (sort) {
    case 'popular':
      return arr.sort((a, b) => b.sold_count - a.sold_count)
    case 'new':
      return arr.reverse()
    case 'price_low':
      return arr.sort((a, b) => a.price - b.price)
    case 'price_high':
      return arr.sort((a, b) => b.price - a.price)
    case 'name':
      return arr.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return arr
  }
}

export function categoryIdForSlug(slug?: string | null): number | undefined {
  if (!slug) return undefined
  // Stable pseudo-mapping: hash the slug and bucket into 1..4
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  return (hash % 4) + 1
}


