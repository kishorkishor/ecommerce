# ChinaWholesale Frontend Development Guide

## Project Structure

```
chinawholesale-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth routes (sign-in, sign-up)
│   │   ├── (shop)/             # Main shop routes
│   │   ├── (dashboard)/        # User dashboard (protected)
│   │   ├── (admin)/            # Admin panel (protected)
│   │   ├── api/                # Next.js API routes
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn components
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── products/           # Product components
│   │   ├── cart/               # Cart components
│   │   ├── auth/               # Auth components
│   │   └── admin/              # Admin components
│   ├── lib/
│   │   ├── api-client.ts       # Axios setup
│   │   ├── utils.ts            # Utility functions
│   │   └── constants.ts        # App constants
│   ├── hooks/                  # Custom React hooks
│   ├── stores/                 # Zustand stores
│   ├── types/                  # TypeScript types
│   └── i18n/                   # Internationalization
├── public/                     # Static assets
├── .env.local                  # Environment variables
└── package.json
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CURRENCY_SYMBOL=৳
```

## Testing Each Phase

### Phase 1: Project Setup ✅
- [x] Next.js project created
- [x] Dependencies installed
- [x] Orange theme configured
- [x] Core files created

**Test:** Run `npm run dev` and verify homepage loads with orange theme

### Phase 2: Layout & Navigation
**Test:** Check header, footer, category navigation, language switcher

### Phase 3: Homepage & Product Cards
**Test:** View products, product cards, banners, featured sections

### Phase 4: Product Pages & Search
**Test:** Product details, search functionality, filters

### Phase 5: Shopping Cart & Wishlist
**Test:** Add to cart, cart drawer, wishlist functionality

### Phase 6: Authentication
**Test:** Sign in/up, protected routes, user menu

### Phase 7: Checkout & Orders
**Test:** Complete checkout flow, order creation

### Phase 8: User Dashboard
**Test:** Order history, profile management, addresses

### Phase 9: Admin Panel
**Test:** Admin dashboard, product management, order management

### Phase 10: Polish & Optimization
**Test:** Loading states, error handling, SEO, performance

## API Endpoints

The frontend connects to Laravel backend at `http://localhost:8000/api`

### Products
- `GET /products` - List products
- `GET /products/{id}` - Get product details
- `GET /products?featured=1` - Featured products
- `GET /products?sort=popular` - Popular products

### Categories
- `GET /categories` - List categories
- `GET /categories/{slug}/products` - Category products

### Cart
- `GET /cart` - Get cart
- `POST /cart/add` - Add to cart
- `PUT /cart/update` - Update cart item
- `DELETE /cart/remove` - Remove from cart

### Auth
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /user` - Get current user

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   npm run dev -- -p 3001
   ```

2. **API connection failed**
   - Check if Laravel backend is running on port 8000
   - Verify API_BASE_URL in .env.local

3. **Build errors**
   ```bash
   npm run build
   ```

4. **TypeScript errors**
   ```bash
   npx tsc --noEmit
   ```

### Development Tips

1. Use browser dev tools to inspect components
2. Check Network tab for API calls
3. Use React DevTools extension
4. Check console for errors
5. Test on different screen sizes

## Next Steps

After each phase, run the development server and test the functionality:

```bash
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000) to see the changes.

