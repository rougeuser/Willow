# 🏏 KingsWillow Craft Co.
### Premium Cricket Bat Manufacturer — Full-Stack Website

A fully hand-coded, multi-page website prototype for a fictional English cricket bat manufacturer. Features a complete Express.js backend API, 7 HTML pages with shared design system, live product filtering, a multi-step custom order form, and animated interactions throughout.

---

## 📁 Project Structure

```
kingswillow/
├── server.js                   # Express backend (API + static serving)
├── package.json
├── .env                        # PORT config (optional)
│
└── public/
    ├── index.html              # Homepage (hero, featured products, testimonials)
    ├── products.html           # Full product listing with live filter/sort
    ├── process.html            # 8-step manufacturing process (scroll-progress sidebar)
    ├── about.html              # Company story, team, history timeline
    ├── gallery.html            # Filterable photo gallery with lightbox
    ├── contact.html            # Contact form (validated, API-connected)
    ├── custom.html             # Multi-step custom bat commission form
    ├── 404.html                # Custom 404 page
    │
    ├── css/
    │   └── style.css           # Full design system (tokens, components, responsive)
    │
    └── js/
        └── main.js             # Shared JS (nav, animations, API helpers, bat SVG)
```

---

## 🚀 Setup & Running

### 1. Install dependencies
```bash
cd kingswillow
npm install
```

### 2. Start the server
```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

---

## 🔌 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | All products (optional `?category=professional&sort=price-asc`) |
| GET | `/api/products/:id` | Single product by ID |

**Categories:** `professional`, `club`, `junior`, `training`  
**Sort options:** `price-asc`, `price-desc`

### Manufacturing Process
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/process` | All 8 process steps with details |

### Forms
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Contact form submission |
| POST | `/api/custom-order` | Custom bat commission request |
| POST | `/api/newsletter` | Email newsletter signup |

### Stats
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Factory stats (bats produced, years, countries, etc.) |

---

## 📦 Products in the Database

| Name | Grade | Category | Price |
|------|-------|----------|-------|
| The Sovereign | Grade 1+ Reserve | Professional | £349.99 |
| The Monarch | Grade 1 English Willow | Professional | £249.99 |
| The Regent | Grade 2 English Willow | Club | £179.99 |
| The Artisan | Grade 3 English Willow | Club | £129.99 |
| The Colt | Grade 3 English Willow | Junior | £89.99 |
| The Pioneer | Kashmir Willow | Training | £69.99 |

---

## 🎨 Design System

**Brand:** KingsWillow Craft Co. — a premium, craft-forward cricket bat manufacturer  
**Aesthetic:** Heritage workshop meets editorial precision

### Colour Palette
| Token | Hex | Use |
|-------|-----|-----|
| `--forest-deep` | `#0F2318` | Dark backgrounds, nav |
| `--forest` | `#1B3A2D` | Sections, cards |
| `--forest-mid` | `#2A5040` | Accents, tags |
| `--copper` | `#B87333` | Primary accent, CTAs |
| `--copper-light` | `#D4924A` | Hover states, highlights |
| `--cream` | `#FAF7F0` | Main background |
| `--cream-warm` | `#F0E8D0` | Card backgrounds |

### Typography
- **Display:** Playfair Display (headings, numbers, brand)
- **Body:** Inter (UI, forms, navigation)
- **Accent:** Crimson Text italic (pullquotes)

### Signature Element
Woodgrain SVG texture — repeating wave pattern in copper tones rendered via inline SVG and CSS backgrounds, simulating willow grain across section dividers and hero backgrounds.

---

## ✨ Features by Page

### Homepage (`/`)
- Full-viewport hero with animated woodgrain background
- Animated counter stats (bats produced, years, countries)
- Featured products loaded from API
- Process teaser section with inline bat SVG
- Testimonials grid
- Values/principles cards

### Products (`/products`)
- All 6 bats loaded from `/api/products`
- Client-side category filter (All, Professional, Club, Junior, Training)
- Price sort (ascending/descending)
- URL param support (`?cat=professional`)
- Willow grade comparison table

### Craft Process (`/process`)
- All 8 steps loaded from `/api/process`
- Scroll-progress sidebar with step navigator
- Animated progress bar tracking current step
- FAQ accordion

### About (`/about`)
- Company founding story
- Team cards with avatars
- Values grid
- Company history timeline (1977–2024)

### Gallery (`/gallery`)
- 12 gallery items with category filters
- Masonry-style CSS grid (large/tall items)
- Lightbox modal on click
- Keyboard accessible

### Contact (`/contact`)
- Validated contact form (client + server validation)
- Subject dropdown (product, order, repair, trade, etc.)
- Live API submission with success/error feedback
- Google Maps placeholder

### Custom Bat (`/custom`)
- 5-step wizard form
- Live spec preview sidebar with bat SVG
- Real-time price estimator
- Add-on toggles (knocking-in, engraving, toe guard, bat bag)
- Commission reference number on submission

---

## 🔧 Extending to Production

### Database
Replace in-memory arrays in `server.js` with a real database:
```bash
npm install mongoose        # MongoDB
# OR
npm install better-sqlite3  # SQLite (simple, no server)
# OR
npm install pg              # PostgreSQL
```

### Email
Nodemailer is already installed. Add to `.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-app-password
```

### Payments
For a real e-commerce flow, integrate Stripe:
```bash
npm install stripe
```

### Image hosting
Replace the SVG bat illustrations and emoji gallery placeholders with real photography via Cloudinary or AWS S3.

### Deployment
```bash
# Railway / Render / Fly.io — just push the repo
# Set PORT environment variable
# npm start is the start command
```

---

## 🐛 Known Limitations (Prototype)
- Data is in-memory only — resets on server restart
- No authentication / admin panel
- No real payment integration
- Gallery uses CSS gradients instead of photography
- No email sending (nodemailer is installed but not wired to SMTP)

---

## 📄 Licence
Prototype — KingsWillow Craft Co. is a fictional brand created for demonstration purposes.
