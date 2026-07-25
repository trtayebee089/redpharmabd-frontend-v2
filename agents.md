# AGENTS.md — Pharmacy Ecommerce Frontend

## Project Goal

Build a modern, professional, fast, mobile-first pharmacy ecommerce website frontend using Vue.js 3.

The backend API already exists. The task is to build only the frontend and connect it properly with the existing API.

The final website should feel premium, trustworthy, clean, and easy to use. It must not look like a generic boxed dashboard. It should create a strong first impression like a modern healthcare ecommerce brand.

---

## Tech Stack

Use:

- Vue.js 3
- Vite
- Vue Router
- Pinia
- Axios
- Tailwind CSS
- Composition API
- Reusable Vue components
- Mobile-first responsive design

Do not use:

- jQuery
- Bootstrap
- Heavy UI libraries unless already installed
- Unnecessary animation libraries
- Hardcoded fake data where API data exists

---

## Design Direction

The website should look like a premium pharmacy ecommerce platform.

Style keywords:

- Modern pharmacy ecommerce
- Clean healthcare UI
- Trustworthy medical brand
- Premium ecommerce feel
- Soft gradients
- White space
- Smooth rounded cards
- Sticky helpful navigation
- Beautiful product grid
- Fast purchase flow
- Mobile-first shopping experience

Avoid:

- Boxy old UI
- Too many borders
- Dashboard-like layout
- Horizontal scrolling
- Infinite vertical scrolling issues
- Fixed sidebar category layout if it hurts UX
- Cluttered sections
- Tiny unreadable text
- Generic template look

Preferred colors:

- Medical green
- Deep teal
- Soft blue
- White
- Light gray
- Accent red/orange only for offers, alerts, discount badges

---

## Main Frontend Pages

Build or redesign these pages:

### Public Shopping Pages

- Home
- Category Grid
- Category Product Listing
- Product Detail
- Cart
- Checkout
- Order Confirmation
- Order Tracking
- Request Order
- Delivery Coverage

### Auth Pages

- Login
- Register
- Forgot Password

### Account Pages

- Profile
- Orders
- Order Detail
- Membership
- Settings

### Informational Pages

- About
- Contact
- Help Center
- Privacy Policy
- Refund & Return Policy
- Terms & Conditions
- Remove Account
- 404 Not Found

---

## Layout Components

Create a clean shared layout system.

Required components:

- AppHeader
- MobileHeader
- Footer
- MobileBottomNav
- ProductCard
- ProductGrid
- CategoryCard
- CategoryMenu
- CartDrawer
- LiveSearch
- Breadcrumb
- FilterPanel
- SortDropdown
- QuantitySelector
- LoadingSkeleton
- EmptyState
- ErrorState
- OfferBadge
- MedicineInfoBlock
- PrescriptionNotice
- TrustBadgeSection

---

## Home Page Requirements

The home page is very important.

It should show as many products as possible without feeling messy.

Recommended structure:

1. Top announcement bar
2. Header with logo, search, account, cart
3. Mobile optimized search bar
4. Hero section with pharmacy value proposition
5. Quick category pills/cards
6. Trust badges:
   - Genuine medicines
   - Fast delivery
   - Secure payment
   - Licensed pharmacy
7. Featured categories
8. Popular products grid
9. Best selling products
10. New arrivals
11. Health essentials
12. Prescription upload / request order CTA
13. Delivery coverage CTA
14. App/support/customer care CTA
15. Footer

Important:

- Do not use a fixed left category sidebar on home if it causes scrolling or layout issues.
- Prefer horizontal category pills, mega menu, or responsive category sections.
- Product grids should be dense but clean.
- On desktop: 5 to 6 products per row where possible.
- On tablet: 3 to 4 products per row.
- On mobile: 2 products per row.
- Prevent horizontal scrolling completely.

---

## Product Card Requirements

Each product card should show:

- Product image
- Product name
- Generic/company name if available
- Strength/size/unit if available
- Price
- Discount price if available
- Stock status
- Add to cart button
- Quantity controls after adding
- Prescription required badge if applicable
- Discount badge if applicable

Design:

- Clean ecommerce product card
- Slight hover lift on desktop
- No excessive border
- Soft shadow
- Rounded corners
- Product image area consistent height
- Text should truncate cleanly
- Add to cart button must be highly visible

---

## Product Detail Page Requirements

Product detail should include:

- Product image gallery
- Product title
- Brand/manufacturer
- Generic name
- Strength/size
- Price
- Discount
- Stock status
- Quantity selector
- Add to cart
- Buy now
- Prescription required notice
- Delivery info
- Product description
- Usage info
- Warning/disclaimer
- Related products
- Similar products

Medical disclaimer must be shown:

“Always follow your physician’s advice before using any medicine. Product information is for reference only.”

---

## Category Page Requirements

Category page should include:

- Breadcrumb
- Category title
- Product count
- Filter button on mobile
- Filter sidebar/drawer
- Sort dropdown
- Product grid
- Pagination or load more button

Filters may include:

- Category
- Brand/manufacturer
- Price range
- Availability
- Prescription required
- Discounted products

Important:

- Do not create infinite scrolling unless API already supports it properly.
- Prefer pagination or “Load More”.
- No horizontal scroll.
- Mobile filter should be drawer based.

---

## Cart Requirements

Cart should support:

- Add product
- Remove product
- Update quantity
- Show subtotal
- Delivery charge
- Discount
- Grand total
- Proceed to checkout
- Empty cart state
- Stock validation
- Prescription required warning if any item requires it

Cart drawer should be available from header.

---

## Checkout Requirements

Checkout should include:

- Customer information
- Delivery address
- Phone number
- Payment method
- Order notes
- Prescription upload if required
- Order summary
- Place order button

Validation:

- Required fields must be clearly marked
- Errors should be user-friendly
- Disable place order while submitting
- Show loading state

---

## API Integration Rules

The backend API already exists.

Do not invent API endpoints if existing ones are available.

First inspect the existing codebase for:

- `.env`
- `src/services`
- `src/api`
- `axios`
- `router`
- `stores`
- existing endpoint usage
- old components
- API response structure

Create or improve:

- `src/services/api.js`
- `src/services/productService.js`
- `src/services/categoryService.js`
- `src/services/cartService.js`
- `src/services/authService.js`
- `src/services/orderService.js`

Use Axios interceptors for:

- Base URL
- Auth token
- JSON headers
- Error handling
- 401 logout handling

---

## State Management

Use Pinia stores:

- `authStore`
- `cartStore`
- `productStore`
- `categoryStore`
- `orderStore`
- `uiStore`

Cart must persist in localStorage if backend cart is not available for guest users.

Auth token should be stored safely according to current project pattern.

---

## Routing Rules

Use Vue Router.

Public routes:

- `/`
- `/categories`
- `/category/:slug`
- `/product/:slug`
- `/cart`
- `/checkout`
- `/order-confirmation/:id`
- `/track-order`
- `/request-order`
- `/delivery-coverage`
- `/about`
- `/contact`
- `/help-center`
- `/privacy-policy`
- `/refund-return`
- `/terms-conditions`
- `/remove-account`

Auth routes:

- `/login`
- `/register`
- `/forgot-password`

Protected routes:

- `/account/profile`
- `/account/orders`
- `/account/orders/:id`
- `/account/membership`
- `/account/settings`

---

## Responsive Rules

Must support:

- Mobile
- Tablet
- Desktop
- Large desktop

Important:

- No horizontal scroll anywhere.
- Use `overflow-x-hidden` only as safety, not as the main fix.
- Fix actual width issues.
- Do not use fixed width components that break mobile.
- Use CSS grid/flex properly.
- Header must be usable on mobile.
- Mobile bottom navigation should include:
  - Home
  - Categories
  - Search
  - Cart
  - Account

---

## Performance Rules

Implement:

- Lazy route loading
- Skeleton loaders
- Image lazy loading
- Optimized product grid
- Debounced live search
- Minimal duplicate API calls
- Clean component structure

Do not:

- Load all products at once if API supports pagination
- Create infinite loops in watchers
- Trigger repeated requests unnecessarily
- Use huge animations that slow mobile

---

## UX Rules

All user actions should have clear feedback.

Use:

- Toast messages
- Loading states
- Disabled states
- Empty states
- Error states
- Confirmation where needed

Important UX flows:

- Add to cart should feel instant
- Search should be fast
- Checkout should be simple
- Product browsing should be dense but clean
- Prescription-required products should be clearly marked

---

## Accessibility

Use:

- Semantic HTML
- Proper buttons
- Alt text for images
- Keyboard accessible controls
- Focus states
- Sufficient contrast
- Clear form labels

---

## Code Quality Rules

Use:

- Clean folder structure
- Reusable components
- Composition API
- Clear naming
- Small components
- Centralized API logic
- Tailwind utility classes with sensible component structure

Avoid:

- Huge single-file components
- Repeated API logic
- Inline hardcoded styles everywhere
- Dead code
- Console logs in production
- Breaking existing working functionality

---

## Folder Structure Recommendation

```txt
src/
  assets/
  components/
    layout/
    product/
    category/
    cart/
    checkout/
    common/
    account/
  composables/
    useApi.js
    useDebounce.js
    useCart.js
  router/
    index.js
  services/
    api.js
    productService.js
    categoryService.js
    cartService.js
    authService.js
    orderService.js
  stores/
    authStore.js
    cartStore.js
    productStore.js
    categoryStore.js
    orderStore.js
    uiStore.js
  views/
    Home.vue
    CategoryGrid.vue
    Category.vue
    ProductDetail.vue
    Cart.vue
    Checkout.vue
    OrderConfirmation.vue
    LoginPage.vue
    RegisterPage.vue
    ForgotPassword.vue
    account/
    info/
  App.vue
  main.js

  Api Base Url: "https://redapi-staging.techrajshahi.com/api/";