export interface Product {
  id: string
  name: string
  name_bn?: string
  description?: string
  description_bn?: string
  price: number
  original_price?: number
  discount_percentage?: number
  image: string
  images?: string[]
  category_id: number
  category?: Category
  stock_quantity: number
  sold_count: number
  status: 'active' | 'inactive'
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  name_bn?: string
  slug: string
  icon?: string
  description?: string
  image?: string
  sort_order: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  price: number
  total: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  item_count: number
}

export interface WishlistItem {
  id: string
  product: Product
  added_at: string
}

export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  role: 'customer' | 'admin'
  email_verified_at?: string
  created_at: string
  updated_at: string
}

export interface Address {
  id: string
  user_id: string
  type: 'home' | 'office' | 'other'
  label?: string
  first_name: string
  last_name: string
  phone: string
  address_line_1: string
  address_line_2?: string
  city: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  order_number: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  shipping_address: Address
  billing_address?: Address
  payment_method: 'cod' | 'sslcommerz' | 'bkash'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  subtotal: number
  shipping_charge: number
  discount: number
  total: number
  notes?: string
  tracking_number?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product: Product
  quantity: number
  price: number
  total: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number
  to: number
}

export interface SearchParams {
  q?: string
  category?: string
  min_price?: number
  max_price?: number
  sort?: 'popular' | 'new' | 'price_low' | 'price_high' | 'name'
  page?: number
  per_page?: number
}

