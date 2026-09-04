/**
 * ==============================================================================
 * PROJECT ARCHITECTURE & MODAL DATA REPOSITORY
 * ==============================================================================
 * Comprehensive architectural specifications, technical highlights, end-to-end
 * system pipelines, ASCII system diagrams, and engineering decision rationale.
 */

const PROJECT_MODAL_DATA = {
    insightpdf: {
        title: "InsightPDF",
        badge: "AI & Document Q&A",
        tags: ["FastAPI", "Next.js 16", "React 19", "Python", "FAISS", "Google Gemini API"],
        summary: "InsightPDF is an AI document assistant that lets users upload PDF documents and ask questions in natural language. The system searches the document for exact matching passages using semantic search and generates accurate answers citing page numbers.",
        highlights: [
            {
                title: "FAISS Dense Vector Search",
                desc: "Extracts document text into overlapping chunks and performs fast local similarity search without external database latency."
            },
            {
                title: "Backend Response Verification",
                desc: "A custom post-generation check cross-references AI answers against retrieved source paragraphs, ensuring answers are 100% grounded."
            },
            {
                title: "Sub-1.5s Cited Generations",
                desc: "Connects with Google Gemini API to return cited answers with exact page references in under 1.5 seconds."
            }
        ],
        flowSteps: [
            {
                title: "1. Upload & Text Extraction",
                desc: "When a user uploads a PDF, the backend extracts raw text and divides it into small, manageable chunks to preserve sentence context."
            },
            {
                title: "2. Vector Indexing with FAISS",
                desc: "Each chunk is transformed into a numerical vector embedding and stored locally in a high-speed FAISS vector index."
            },
            {
                title: "3. Semantic Context Search",
                desc: "When a question is asked, FAISS searches through all document chunks to retrieve only the most relevant passages."
            },
            {
                title: "4. Grounded AI Response",
                desc: "Google Gemini receives the retrieved text passages and generates an accurate response with exact page citations and verification checks."
            }
        ],
        diagram: {
            filename: "insightpdf-architecture.spec",
            code: `                     ┌───────────────────────────────────────────────┐
                     │          Client Web Application (UI)          │
                     │     Next.js 16 · React 19 · Cited Q&A View    │
                     └───────────────────────┬───────────────────────┘
                                             │
                                 POST /upload │ POST /query
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │            FastAPI Backend Gateway            │
                     │    Asynchronous Handlers · Pydantic Validation│
                     └───────────────┬───────────────┬───────────────┘
                                     │               │
                 [ 1. Document Upload ]             [ 2. Natural Language Query ]
                                     │               │
                                     ▼               ▼
        ┌────────────────────────────────────┐ ┌────────────────────────────────────┐
        │       PyMuPDF Text Extractor       │ │    Sentence-Transformer Embedder   │
        │ • 500-Token Overlapping Chunks     │ │ • Dense Semantic Numerical Vectors │
        │ • Natural Sentence Boundary Split  │ │ • Real-Time Query Vector Encoding  │
        └─────────────────┬──────────────────┘ └─────────────────┬──────────────────┘
                          │ Chunks & Embeddings                  │ Query Embedding
                          └───────────────────┬──────────────────┘
                                              ▼
                     ┌───────────────────────────────────────────────┐
                     │           FAISS Dense Vector Index            │
                     │     Fast Local L2 / Cosine Similarity (CPU)   │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             │ Top-K Relevant Document Passages
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │         Context Grounding & Assembly          │
                     │   Structured Prompt Engineering + Citations   │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             │ Context Passages + User Question
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │          Google Gemini 1.5 Flash API          │
                     │      Contextual Answer & Page Citations       │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             │ Generated Answer with Page References
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │      verification.py (Integrity Module)       │
                     │  Cross-checks answer passages against source  │
                     │   to eliminate hallucinations (100% Grounded) │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             │ Sub-1.5s Grounded Output
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │      Verified Cited Answer to User Client     │
                     └───────────────────────────────────────────────┘`
        },
        decisions: [
            {
                title: "Why local FAISS vector search?",
                desc: "Runs directly on CPU with near-zero latency and requires no expensive monthly cloud database hosting fees."
            },
            {
                title: "Why FastAPI backend?",
                desc: "FastAPI provides asynchronous request handling and automatic Pydantic data validation for fast AI streaming."
            },
            {
                title: "Why citation verification?",
                desc: "A custom post-generation check cross-references answers against original source text to prevent hallucinated answers."
            },
            {
                title: "Why Next.js & React frontend?",
                desc: "Delivers smooth document viewing, responsive question input, and instant answer rendering."
            }
        ],
        links: [
            { label: "Live Space ↗", url: "https://huggingface.co/spaces/Spidey173/insightpdf", isPrimary: true },
            { label: "GitHub Repository", url: "https://github.com/Spidey173/InsightPDF", isPrimary: false }
        ]
    },
    zyra: {
        title: "Zyra – Social & Real-Time Messaging",
        badge: "Real-Time Social & WebSockets",
        tags: ["Django 5", "Django Channels", "WebSockets", "PostgreSQL", "Cloudinary", "Gunicorn"],
        summary: "Zyra is a full-featured social platform where users can share media, browse interactive activity feeds, and chat in real time with live typing indicators and online presence tracking.",
        highlights: [
            {
                title: "Real-Time WebSocket Messaging",
                desc: "Direct 1-on-1 and group chats with live typing indicators, instant delivery, and online presence tracking via Django Channels."
            },
            {
                title: "Zero Duplicate DB Lookups",
                desc: "Optimized complex feed queries with Django ORM (select_related & prefetch_related), eliminating redundant queries."
            },
            {
                title: "Cloudinary CDN Pipeline",
                desc: "Integrated CDN media offloading for fast, responsive image and video reels rendering across device screens."
            }
        ],
        flowSteps: [
            {
                title: "1. Persistent WebSocket Connection",
                desc: "When opening the chat, the browser establishes a continuous two-way WebSocket connection managed by Django Channels."
            },
            {
                title: "2. Instant Message Routing",
                desc: "New messages are sent through channel layers and broadcast directly to the recipient's active socket group in milliseconds."
            },
            {
                title: "3. Database Storage & CDN Uploads",
                desc: "Chat history and posts are stored in PostgreSQL, while images and video stories are securely uploaded to Cloudinary CDN."
            },
            {
                title: "4. Optimized Feed Loading",
                desc: "Home and user activity feeds use Django ORM joins to fetch posts, user profiles, likes, and comments efficiently in a single query."
            }
        ],
        diagram: {
            filename: "zyra-architecture.spec",
            code: `                     ┌───────────────────────────────────────────────┐
                     │              Client Browser / UI              │
                     │   Direct & Group Chat · Live Typing Indicators│
                     │   Media Feed & Stories · Online Presence Hub  │
                     └───────┬───────────────────────────────┬───────┘
                             │ Persistent WebSocket (ws://)  │ HTTPS Media Upload
                             ▼                               ▼
        ┌────────────────────────────────────┐ ┌────────────────────────────────────┐
        │      Django Channels ASGI Hub      │ │       Cloudinary CDN Pipeline      │
        │ • Asynchronous Event Consumers     │ │ • High-Speed Image/Video Storage   │
        │ • Channel Layer Group Broadcasting │ │ • Dynamic Image Transformations    │
        └─────────────────┬──────────────────┘ └─────────────────┬──────────────────┘
                          │ Real-time Events                     │ Asset URLs
                          └───────────────────┬──────────────────┘
                                              ▼
                     ┌───────────────────────────────────────────────┐
                     │          PostgreSQL Relational DB             │
                     │  (Optimized with select_related joins)        │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             │ Broadcast to Channel Group
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │       Sub-30ms Real-Time Chat Delivery        │
                     └───────────────────────────────────────────────┘`
        },
        decisions: [
            {
                title: "Why WebSockets over HTTP polling?",
                desc: "WebSockets eliminate repetitive request overhead, enabling instant message delivery without constant browser refreshing."
            },
            {
                title: "Why Django Channels?",
                desc: "Combines Django's robust ORM and authentication system with asynchronous event-driven socket handling."
            },
            {
                title: "Why Cloudinary for media?",
                desc: "Offloads heavy video/image hosting to a dedicated CDN, keeping server response times fast."
            },
            {
                title: "Why ORM join optimizations?",
                desc: "Using select_related and prefetch_related eliminated duplicate database lookups across large activity feeds."
            }
        ],
        links: [
            { label: "Live Demo ↗", url: "https://zyra-fa4v.onrender.com/", isPrimary: true },
            { label: "GitHub Repository", url: "https://github.com/Spidey173/Zyra", isPrimary: false }
        ]
    },
    courtbook: {
        title: "CourtBook-Pro",
        badge: "Booking System & Concurrency",
        tags: ["Flask 3", "SQLAlchemy", "PostgreSQL", "Pydantic", "Alembic", "Pytest"],
        summary: "CourtBook-Pro is a sports court reservation engine designed for sports centers. It allows players to book court slots by time while ensuring no two users can book the same slot simultaneously.",
        highlights: [
            {
                title: "Concurrency-Safe Slot Locking",
                desc: "Database unique constraints prevent race conditions and double-booking errors during high-concurrency requests."
            },
            {
                title: "Server-Side Dynamic Pricing",
                desc: "Authoritative pricing calculations automatically apply peak-hour multipliers, weekend rates, and equipment add-ons."
            },
            {
                title: "37+ Automated Test Suites",
                desc: "Thoroughly tested with Pytest covering slot overlaps, pricing formulas, and authentication with 100% pass rate."
            }
        ],
        flowSteps: [
            {
                title: "1. Slot & Equipment Selection",
                desc: "Users select their preferred sport, court number, time slot, and optional gear rentals through an interactive schedule."
            },
            {
                title: "2. Schema & Constraint Validation",
                desc: "Pydantic models validate input types and business rules (e.g., booking duration, operating hours, and valid time formats)."
            },
            {
                title: "3. Concurrency-Safe Booking Lock",
                desc: "SQLAlchemy executes the reservation with database unique constraints to guarantee that simultaneous booking attempts fail safely."
            },
            {
                title: "4. Server-Side Pricing & Confirmation",
                desc: "The backend calculates total fees with peak-hour rates, confirms the slot, and returns a verified booking confirmation."
            }
        ],
        diagram: {
            filename: "courtbook-architecture.spec",
            code: `                     ┌───────────────────────────────────────────────┐
                     │             Interactive Client UI             │
                     │   Facility Schedule · Slot Matrix · Add-ons   │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             │ POST /api/v1/bookings (JSON)
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │          Flask 3 Application Factory          │
                     │    Blueprint Routing · CSRF · Rate Limiting   │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │           Pydantic Validation Layer           │
                     │   Type Safety · Operating Hours · Duration    │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             │ Validated Reservation Payload
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │      Server-Side Dynamic Pricing Engine       │
                     │   Base Rate + Peak Hour Multiplier + Gear     │
                     │   (Prevents Client-Side Price Tampering)      │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             │ Authoritative Calculated Total Fee
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │         Concurrency-Safe Booking Lock         │
                     │  SQLAlchemy Atomic Transaction: \`BEGIN LOCK\`  │
                     │  Unique Constraint: (court_id, date, slot)    │
                     └───────────────────────┬───────────────────────┘
                                             │
                         ┌───────────────────┴───────────────────┐
                         │                                       │
                         ▼ [ Slot Collision / Race ]             ▼ [ Slot Available ]
        ┌────────────────────────────────────┐ ┌────────────────────────────────────┐
        │        409 Conflict Rollback       │ │         Commit Transaction         │
        │ • Transaction safely aborted       │ │ • Write reservation record to DB   │
        │ • Double-booking physically barred │ │ • Generate official digital ticket │
        └────────────────────────────────────┘ └─────────────────┬──────────────────┘
                                                                 │
                                                                 ▼
                                                ┌───────────────────────────────────┐
                                                │      PostgreSQL (Neon Cloud)      │
                                                │  Status: Confirmed · Invoice Sent │
                                                └───────────────────────────────────┘`
        },
        decisions: [
            {
                title: "Why database unique constraints?",
                desc: "Database constraints physically guarantee that overlapping bookings are impossible even during heavy traffic."
            },
            {
                title: "Why server-side pricing engine?",
                desc: "Calculating all prices on the backend prevents tampering with slot rates or equipment rental costs."
            },
            {
                title: "Why layered architecture?",
                desc: "Separating Blueprints, Pydantic Schemas, and Service logic keeps the codebase modular and straightforward to debug."
            },
            {
                title: "Why 37+ automated Pytest suites?",
                desc: "Automated test suites guarantee that slot validations, pricing formulas, and user roles work without regressions."
            }
        ],
        links: [
            { label: "Live Demo ↗", url: "https://courtbook-pro-4c7j.onrender.com/", isPrimary: true },
            { label: "GitHub Repository", url: "https://github.com/Spidey173/CourtBook-Pro", isPrimary: false }
        ]
    },
    dailydrop: {
        title: "DailyDrop E-Commerce",
        badge: "E-Commerce Platform",
        tags: ["Flask 3", "Python", "Neon PostgreSQL", "Pytest", "GitHub Actions CI"],
        summary: "DailyDrop is an online grocery and retail store where customers can browse categorized products, manage wishlists, and place orders through a secure checkout flow. It includes an admin dashboard with sales analytics, and every code change is verified by an automated CI/CD pipeline.",
        highlights: [
            {
                title: "Neon PostgreSQL with Connection Pooling",
                desc: "Migrated from SQLite to cloud-hosted Neon PostgreSQL with a ThreadedConnectionPool for handling concurrent database requests efficiently."
            },
            {
                title: "Admin Dashboard & Sales Analytics",
                desc: "Built an admin portal with order management, low-stock alerts, category revenue breakdowns, and fast cached analytics responses."
            },
            {
                title: "25 Automated Tests + CI/CD Pipeline",
                desc: "Pytest suite covering auth, cart, orders, wishlist, and admin flows — auto-run on every push via GitHub Actions with Flake8 lint checks."
            }
        ],
        flowSteps: [
            {
                title: "1. Browse & Wishlist",
                desc: "Shoppers filter products by category, view real-time stock and pricing, and save items to a personal wishlist for later."
            },
            {
                title: "2. Cart & Session Handling",
                desc: "Cart contents are tracked per session and preserved across login, with CSRF protection on all form submissions via Flask-WTF."
            },
            {
                title: "3. Order Placement",
                desc: "Checkout validates stock levels, decrements inventory atomically, and creates the order inside a safe database transaction."
            },
            {
                title: "4. Admin & CI/CD",
                desc: "Admin dashboard tracks orders, revenue, and low-stock items. Every code change runs through GitHub Actions with Pytest and Flake8 checks."
            }
        ],
        diagram: {
            filename: "dailydrop-architecture.spec",
            code: `                     ┌───────────────────────────────────────────────┐
                     │             Client E-Commerce Web             │
                     │  Catalog · Wishlist · Cart · Admin Dashboard  │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             │ HTTPS Requests (CSRF Protected)
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │        Flask 3 Application (Blueprints)       │
                     │   auth · products · cart · admin · wishlist   │
                     │   CSRF Protection · Rate Limiting (50/hr)     │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │              Services Layer                   │
                     │  OrderService · ProductService · AuthService  │
                     │  WishlistService · ContactService             │
                     └───────────────────────┬───────────────────────┘
                                             │
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │     Neon PostgreSQL (Cloud-Hosted)            │
                     │  ThreadedConnectionPool (3–15 connections)    │
                     │  Users · Products · Carts · Orders · Wishlist │
                     └───────────────────────┬───────────────────────┘
                                             │
                         ┌───────────────────┴───────────────────┐
                         │                                       │
                         ▼ [ Customer Flow ]                     ▼ [ Admin Flow ]
        ┌────────────────────────────────────┐ ┌────────────────────────────────────┐
        │     Cart → Checkout → Order        │ │    Dashboard · Order Management    │
        │ • Atomic stock decrement           │ │ • Sales analytics (cached)         │
        │ • Transaction COMMIT / ROLLBACK    │ │ • Low-stock alerts                 │
        └────────────────────────────────────┘ │ • Category revenue breakdown       │
                                               └────────────────────────────────────┘

                     ┌───────────────────────────────────────────────┐
                     │         GitHub Actions CI/CD Pipeline         │
                     │  Python 3.10–3.12 · 25 Pytest Suites · Flake8│
                     │  Auto-triggered on push to main/master       │
                     └───────────────────────────────────────────────┘`
        },
        decisions: [
            {
                title: "Why Neon PostgreSQL over SQLite?",
                desc: "Cloud-hosted PostgreSQL with connection pooling handles concurrent users properly, unlike file-based SQLite which locks on writes."
            },
            {
                title: "Why a services layer?",
                desc: "Separating business logic from route handlers keeps blueprints thin and makes each piece independently testable."
            },
            {
                title: "Why GitHub Actions CI/CD?",
                desc: "Automated testing on every push catches bugs early and keeps the codebase reliable as it grows."
            },
            {
                title: "Why CSRF protection & rate limiting?",
                desc: "Flask-WTF and Flask-Limiter prevent common web attacks like cross-site request forgery and brute-force attempts without adding complexity."
            }
        ],
        links: [
            { label: "Frontend Live ↗", url: "https://dailydrop-alpha.vercel.app/", isPrimary: true },
            { label: "Full Stack (Render) ↗", url: "https://daily-drop-c96q-f5su.onrender.com/", isPrimary: false },
            { label: "GitHub Repository", url: "https://github.com/Spidey173/Daily-Drop", isPrimary: false }
        ]
    }
};

// Support both standard browser script tag & ES Module imports
if (typeof window !== "undefined") {
    window.PROJECT_MODAL_DATA = PROJECT_MODAL_DATA;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = { PROJECT_MODAL_DATA };
}
