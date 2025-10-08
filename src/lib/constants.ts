export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
export const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '৳'

export const CATEGORIES = [
  { id: 1, name: 'Fashion Accessories', slug: 'fashion-accessories', icon: 'Sparkles' },
  { id: 2, name: 'Footwear', slug: 'footwear', icon: 'Shoe' },
  { id: 3, name: 'Anti-lost Supplies', slug: 'anti-lost-supplies', icon: 'Shield' },
  { id: 4, name: 'Toddler Belt', slug: 'toddler-belt', icon: 'Baby' },
  { id: 5, name: 'Children\'s Balance Bike', slug: 'childrens-balance-bike', icon: 'Bike' },
  { id: 6, name: 'Scooters', slug: 'scooters', icon: 'Zap' },
  { id: 7, name: 'Electric Cars', slug: 'electric-cars', icon: 'Car' },
  { id: 8, name: 'Tricycles', slug: 'tricycles', icon: 'Tricycle' },
  { id: 9, name: 'Strollers', slug: 'strollers', icon: 'BabyCarriage' },
  { id: 10, name: 'Accessories for Wheelchairs and Seats', slug: 'wheelchair-accessories', icon: 'Wheelchair' },
  { id: 11, name: 'Backpacks and Slings for Kids', slug: 'kids-backpacks', icon: 'Backpack' },
  { id: 12, name: 'Bicycles', slug: 'bicycles', icon: 'Bike' },
  { id: 13, name: 'Walkers', slug: 'walkers', icon: 'Walking' },
  { id: 14, name: 'Wheeled Machines', slug: 'wheeled-machines', icon: 'Cog' },
  { id: 15, name: 'Children\'s Wheelbarrow', slug: 'childrens-wheelbarrow', icon: 'Wheelbarrow' },
  { id: 16, name: 'Single Pole Portable Trolley', slug: 'portable-trolley', icon: 'ShoppingCart' },
  { id: 17, name: 'Product for Mother and Child', slug: 'mother-child', icon: 'Heart' },
  { id: 18, name: 'Bags & Parcel', slug: 'bags-parcel', icon: 'ShoppingBag' },
  { id: 19, name: 'Repair and Interior', slug: 'repair-interior', icon: 'Wrench' },
  { id: 20, name: 'Sports & Tourism', slug: 'sports-tourism', icon: 'Trophy' },
]

export const API_ROUTES = {
  // Products
  PRODUCTS: '/products',
  PRODUCT: (id: string) => `/products/${id}`,
  FEATURED_PRODUCTS: '/products?featured=1',
  POPULAR_PRODUCTS: '/products?sort=popular',
  NEW_PRODUCTS: '/products?sort=new',
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY_PRODUCTS: (slug: string) => `/categories/${slug}/products`,
  
  // Cart
  CART: '/cart',
  ADD_TO_CART: '/cart/add',
  UPDATE_CART: '/cart/update',
  REMOVE_FROM_CART: '/cart/remove',
  
  // Wishlist
  WISHLIST: '/wishlist',
  ADD_TO_WISHLIST: '/wishlist/add',
  REMOVE_FROM_WISHLIST: '/wishlist/remove',
  
  // Auth
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  USER: '/user',
  FORGOT_PASSWORD: '/auth/forgot-password',
  
  // Orders
  ORDERS: '/orders',
  ORDER: (id: string) => `/orders/${id}`,
  CREATE_ORDER: '/orders',
  
  // Checkout
  SHIPPING_CHARGE: '/shipping-charge',
  PROMO_CODE: '/promo-code/validate',
  
  // Admin
  ADMIN_STATS: '/admin/stats',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',
  ADMIN_CATEGORIES: '/admin/categories',
} as const

