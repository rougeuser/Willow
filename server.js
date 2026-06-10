/**
 * KingsWillow Craft Co. — Backend Server
 * Express.js server serving static pages and REST API endpoints
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── In-memory data store (replace with DB in production) ───────────────────
let contactMessages = [];
let orders = [];
let inquiries = [];

// ── Product data ───────────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: "The Monarch",
    grade: "Grade 1 English Willow",
    weight: "1180–1210g",
    profile: "Full profile",
    handle: "Oval — Sarawak cane",
    price: 249.99,
    category: "professional",
    description: "Hand-crafted from the finest Grade 1 English willow clefts, the Monarch is our flagship bat. Trusted by county cricketers across England.",
    features: ["6 grains minimum", "Full hand-pressed", "Double-linseed oiled", "Toe guard fitted"],
    inStock: true,
    image: "monarch"
  },
  {
    id: 2,
    name: "The Regent",
    grade: "Grade 2 English Willow",
    weight: "1190–1220g",
    profile: "Slightly concave",
    handle: "Round — Premium cane",
    price: 179.99,
    category: "club",
    description: "The perfect bat for serious club cricketers. Balanced pick-up with a pronounced sweet spot positioned for aggressive stroke play.",
    features: ["5–6 grains", "Machine & hand pressed", "Linseed treated", "Sticker ready"],
    inStock: true,
    image: "regent"
  },
  {
    id: 3,
    name: "The Artisan",
    grade: "Grade 3 English Willow",
    weight: "1170–1200g",
    profile: "Mid profile",
    handle: "Round — Standard cane",
    price: 129.99,
    category: "club",
    description: "Exceptional value without compromising on craft. Ideal for league cricketers who demand performance at an accessible price point.",
    features: ["4–5 grains", "Machine pressed", "Linseed treated", "Ready to play"],
    inStock: true,
    image: "artisan"
  },
  {
    id: 4,
    name: "The Pioneer",
    grade: "Kashmir Willow",
    weight: "1160–1190g",
    profile: "Flat profile",
    handle: "Oval — Fibre composite",
    price: 69.99,
    category: "training",
    description: "Built for nets and practice. Robust Kashmir willow construction that can take a pounding session after session.",
    features: ["Practice grade", "Durable finish", "Anti-scuff sheet", "Great for nets"],
    inStock: true,
    image: "pioneer"
  },
  {
    id: 5,
    name: "The Sovereign",
    grade: "Grade 1+ Reserve Willow",
    weight: "1165–1195g",
    profile: "Traditional full",
    handle: "Oval — Premium Sarawak",
    price: 349.99,
    category: "professional",
    description: "Our limited bespoke range. Each bat is personally selected, knocked-in, and signed by our master craftsman. Only 50 made per season.",
    features: ["7+ grains preferred", "Full hand-pressed 6hrs", "Triple oiled", "Personalised engraving"],
    inStock: false,
    image: "sovereign"
  },
  {
    id: 6,
    name: "The Colt",
    grade: "Grade 3 English Willow",
    weight: "1020–1100g",
    profile: "Harrow/Youth",
    handle: "Short — Junior cane",
    price: 89.99,
    category: "junior",
    description: "Designed for the next generation of cricketers. Lightweight, balanced, and available in Harrow, size 6, 5, and 4.",
    features: ["Youth sizing", "Lighter weight", "Linseed treated", "Good grain count"],
    inStock: true,
    image: "colt"
  }
];

// ── Manufacturing process steps ────────────────────────────────────────────
const processSteps = [
  {
    step: 1,
    title: "Cleft Selection",
    duration: "Day 1",
    description: "Master craftsmen hand-select English willow clefts from our partner growers in Essex and Hertfordshire. Each cleft is assessed for grain straightness, density, and moisture content.",
    details: ["Minimum 5 grains for club bats", "7+ grains for professional range", "16–17% optimal moisture", "Visual grain assessment"]
  },
  {
    step: 2,
    title: "Seasoning & Drying",
    duration: "Weeks 1–6",
    description: "Selected clefts are dried in our climate-controlled chambers at 15–18°C, reducing moisture content from 25% to the optimal 16%. This is the most patient part of our craft.",
    details: ["Slow air drying preferred", "Temperature controlled", "Humidity monitored daily", "No forced heat drying"]
  },
  {
    step: 3,
    title: "Shaping & Profiling",
    duration: "Day 42–44",
    description: "Craftsmen use draw knives and spokeshaves to rough-profile the blade, establishing the spine height, edge thickness, and toe shape before final machine work.",
    details: ["Hand-drawn profiles", "CNC assisted roughing", "Multiple thickness gauges", "Profile templates used"]
  },
  {
    step: 4,
    title: "Pressing",
    duration: "Day 44–45",
    description: "The blade faces are compressed under 500kg of rolling pressure to harden the fibres. Professional grade bats receive up to 6 hours of hand pressing. This is the heart of our process.",
    details: ["500kg roller pressure", "Up to 6 hours hand pressing", "Face and back pressed", "Increases durability 3x"]
  },
  {
    step: 5,
    title: "Handle Fitting",
    duration: "Day 45–46",
    description: "Hand-split Sarawak cane handles are assembled in 12-piece spirals for premium bats. The splice joint is cut at precise angles and bonded with specialist cricket bat adhesive.",
    details: ["12-piece cane construction", "Splice angle: 18–22°", "Specialist adhesive", "Oval or round handle options"]
  },
  {
    step: 6,
    title: "Sanding & Finishing",
    duration: "Day 46–47",
    description: "Progressive sanding from 80 to 400 grit achieves the smooth face required for playing. The bat is then cleaned and prepared for oiling.",
    details: ["4 grit stages", "Hand-sanded edges", "Surface scratch test", "Face inspected under light"]
  },
  {
    step: 7,
    title: "Oiling",
    duration: "Day 47–50",
    description: "Raw linseed oil is applied in multiple coats to protect the willow from moisture and cracking. Each coat must fully penetrate before the next is applied.",
    details: ["Raw linseed only", "2–3 coats minimum", "24hrs between coats", "Face, back, edges & toe"]
  },
  {
    step: 8,
    title: "Quality & Dispatch",
    duration: "Day 50–52",
    description: "Every bat is weighed, measured, and checked against our quality standards before receiving our stamp of approval and being dispatched to its new owner.",
    details: ["Weight certified", "Balance point measured", "Visual quality pass", "Individually wrapped"]
  }
];

// ── Routes ─────────────────────────────────────────────────────────────────

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/products', (req, res) => res.sendFile(path.join(__dirname, 'public', 'products.html')));
app.get('/process', (req, res) => res.sendFile(path.join(__dirname, 'public', 'process.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/gallery', (req, res) => res.sendFile(path.join(__dirname, 'public', 'gallery.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));
app.get('/custom', (req, res) => res.sendFile(path.join(__dirname, 'public', 'custom.html')));

// ── API: Products ──────────────────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  const { category, inStock, sort } = req.query;
  let result = [...products];

  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }
  if (inStock === 'true') {
    result = result.filter(p => p.inStock);
  }
  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);

  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
});

// ── API: Manufacturing Process ─────────────────────────────────────────────
app.get('/api/process', (req, res) => {
  res.json({ success: true, count: processSteps.length, data: processSteps });
});

// ── API: Contact form ──────────────────────────────────────────────────────
app.post('/api/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().isLength({ min: 20 }).withMessage('Message must be at least 20 characters')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const message = {
      id: contactMessages.length + 1,
      ...req.body,
      timestamp: new Date().toISOString(),
      status: 'unread'
    };
    contactMessages.push(message);

    console.log(`📬 New contact from: ${message.name} <${message.email}>`);
    res.json({ success: true, message: 'Your message has been received. We\'ll be in touch within 2 business days.' });
  }
);

// ── API: Custom bat inquiry ────────────────────────────────────────────────
app.post('/api/custom-order',
  [
    body('name').trim().notEmpty(),
    body('email').isEmail(),
    body('grade').notEmpty(),
    body('weight').notEmpty(),
    body('profile').notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const order = {
      id: `KW-${Date.now()}`,
      ...req.body,
      timestamp: new Date().toISOString(),
      status: 'pending_review'
    };
    orders.push(order);

    console.log(`🏏 New custom order #${order.id} from: ${order.name}`);
    res.json({
      success: true,
      orderId: order.id,
      message: `Custom bat inquiry received! Your reference is ${order.id}. Our craftsman will contact you within 48 hours.`
    });
  }
);

// ── API: Newsletter signup ─────────────────────────────────────────────────
const subscribers = [];
app.post('/api/newsletter',
  [body('email').isEmail().withMessage('Valid email required')],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email } = req.body;
    if (subscribers.includes(email)) {
      return res.json({ success: true, message: 'You\'re already subscribed!' });
    }
    subscribers.push(email);
    res.json({ success: true, message: 'Welcome to the KingsWillow family!' });
  }
);

// ── API: Stats (for homepage) ──────────────────────────────────────────────
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      batsProduced: 12480,
      yearsOfCraft: 47,
      countriesServed: 23,
      masterCraftsmen: 8,
      satisfactionRate: 98
    }
  });
});

// ── 404 handler ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// ── Start server ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🏏 KingsWillow Craft Co. server running at http://localhost:${PORT}`);
  console.log(`   Products API:  http://localhost:${PORT}/api/products`);
  console.log(`   Process API:   http://localhost:${PORT}/api/process`);
  console.log(`   Stats API:     http://localhost:${PORT}/api/stats\n`);
});
