# ApexUI — Product Requirement Document (PRD)

> **Document Version:** 1.0.0
> **Status:** Draft — Ready for Engineering & Design Review
> **Last Updated:** July 2026
> **Owner:** Product Team
> **Stakeholders:** Engineering Lead, UI/UX Design Lead, Community Manager, Open Source Maintainers

---

## Table of Contents

1. [Executive Summary & Vision](#1-executive-summary--vision)
2. [User Personas & User Journeys](#2-user-personas--user-journeys)
3. [Tech Stack & Architecture Recommendations](#3-tech-stack--architecture-recommendations)
4. [Functional Requirements & Feature Specifications](#4-functional-requirements--feature-specifications)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Design System & UI/UX Guidelines — Jet Black Theme](#6-design-system--uiux-guidelines--jet-black-theme)
7. [Database Schema Design](#7-database-schema-design)
8. [Product Roadmap & Phased Rollout](#8-product-roadmap--phased-rollout)
9. [Appendix & Glossary](#9-appendix--glossary)

---

## 1. Executive Summary & Vision

### 1.1 Product Vision

> **"ApexUI is the definitive open-source hub where frontend developers and designers discover, share, and instantly ship beautiful, production-ready UI components — for free, forever."**

ApexUI is a community-driven UI component library platform — an open-source equivalent to platforms like uiverse.io and shadcn/ui — where any developer or designer can browse, preview, copy, and contribute ready-to-use interface elements. These elements span the full vocabulary of modern UI: Buttons, Cards, Loaders, Forms, Backgrounds, Decorative Patterns, Navigation components, and more. All components are freely available for use in personal and commercial projects, with zero lock-in and zero cost.

The platform is built on the principle that great design should be democratized. Whether a solo indie hacker shipping their next SaaS product, a junior developer learning component architecture, or a senior designer looking to prototype rapidly — ApexUI gives them instant access to a curated, searchable, community-vetted library of UI elements that are genuinely plug-and-play.

---

### 1.2 Problem Statement

The modern frontend ecosystem has a fragmented and time-consuming UI discovery problem:

| Pain Point | Current Reality |
|---|---|
| **Discovery Friction** | Developers waste hours searching GitHub, CodePen, Dribbble, and various blog posts for a single well-crafted button or loader animation. |
| **No Unified Sandbox** | Most component sources provide raw code snippets without a live preview. Developers must paste code into their editor to evaluate it. |
| **Framework Lock-In** | Available collections are either framework-agnostic HTML/CSS or heavily tied to one ecosystem (React-only, Bootstrap-only), forcing developers to manually rewrite for their stack. |
| **Lack of Community Contribution Layer** | Curated component libraries (e.g., Flowbite, DaisyUI) are maintained by small teams, limiting creative diversity and update velocity. |
| **Aesthetic Staleness** | Most free component libraries produce a generic, dated aesthetic. Developers craving modern glassmorphism, gradient borders, and premium dark-mode components have few trustworthy sources. |

ApexUI solves all five pain points by providing a single, beautifully designed platform where:
- Components are **instantly previewable** in a sandboxed environment
- Code is available in **multiple frameworks** (HTML/CSS, Tailwind, React/JSX, Vue)
- **Anyone can contribute** through a structured submission workflow
- The design aesthetic is consistently **modern, premium, and dark-mode-first**

---

### 1.3 Value Proposition

**For Developers (Consumers):**
- Zero-friction, copy-paste ready UI components with live previews
- Multi-format code output (HTML, Tailwind, JSX, Vue) in one click
- Keyboard-first browsing experience (Ctrl+K global search)
- Curated quality through community upvoting and moderation

**For Designers & Creators (Contributors):**
- A showcase platform with real community reach and engagement
- Profile pages that serve as a living portfolio of UI work
- Upvote, like, and bookmark metrics to validate creative output
- A structured submission workflow that makes contribution easy

**For the Open-Source Ecosystem:**
- Fully open-source codebase (MIT licensed) that any team can fork and self-host
- Supabase-backed infrastructure that scales without vendor lock-in
- A model for sustainable community-driven design platforms

---

### 1.4 Core Business & Community Goals

| Goal | Metric | Target (12 months post-launch) |
|---|---|---|
| Build a critical mass of components | Total components indexed | 500+ community-submitted components |
| Grow an active contributor base | Registered creators | 1,000+ creator accounts |
| Drive developer adoption | Monthly Active Users (MAU) | 25,000+ MAU |
| Establish community trust | Average component rating | 4.2+ stars / like-to-view ratio ≥ 15% |
| Enable sustainable growth | GitHub stars (OSS repo) | 3,000+ stars |
| Prepare monetization runway | Newsletter subscribers | 5,000+ subscribers by Phase 3 |

---

## 2. User Personas & User Journeys

### 2.1 Persona 1 — "The UI Creator" (Component Contributor)

| Attribute | Detail |
|---|---|
| **Name** | Sofia Reyes |
| **Age** | 27 |
| **Role** | Frontend Engineer & Freelance Designer |
| **Tech Comfort** | Advanced — React, Tailwind CSS, Framer Motion, Figma |
| **Goals** | Build a public portfolio of UI work; gain community recognition; showcase creative components to attract clients |
| **Pain Points** | No single platform exists to showcase interactive CSS/React components; CodePen feels dated and lacks discoverability; GitHub READMEs don't render live previews |
| **Motivations** | Recognition (likes/upvotes), portfolio visibility, contributing to an open-source ecosystem she believes in |
| **Device** | MacBook Pro, Chrome/Firefox desktop, occasionally mobile to check her profile |

#### Sofia's Core User Flow (Contributor Journey)

```
[Discovery]
Sofia hears about ApexUI via a tweet from a developer she follows.
She visits the landing page and immediately sees a live, interactive
preview gallery of premium UI components.
        │
        ▼
[Sign Up / OAuth]
She clicks "Share a Component" → prompted to authenticate.
She chooses "Continue with GitHub" (OAuth flow via Supabase Auth).
Her profile is auto-populated with her GitHub avatar and username.
        │
        ▼
[Profile Completion]
She is taken to her Creator Profile page.
She adds a bio, links her personal site and Twitter/X handle,
and selects "Frontend Engineer" as her role tag.
        │
        ▼
[Component Submission]
She navigates to "Submit a Component."
She fills out the structured submission form:
  - Component name: "Neon Pulse Button"
  - Category: Buttons
  - Tech stack: Tailwind CSS + CSS Animations
  - Tags: #neon, #glow, #dark-mode, #animated
  - Description (Markdown-supported)
  - Pastes her HTML/Tailwind code into the live editor
  - Sees a real-time preview of her component render correctly
  - Submits for review
        │
        ▼
[Moderation Queue]
Her component enters the community moderation queue.
She receives an email notification when it is approved and published.
        │
        ▼
[Engagement & Recognition]
Her component appears in the "Latest" feed.
Within 48 hours it receives 87 likes and is promoted to "Trending."
She views her Profile Dashboard to see view counts, likes, and bookmarks.
She shares her component's direct URL on her portfolio.
```

---

### 2.2 Persona 2 — "The Developer Consumer" (Component Discoverer)

| Attribute | Detail |
|---|---|
| **Name** | Marcus Tan |
| **Age** | 31 |
| **Role** | Full-Stack Developer / Indie Hacker building SaaS products |
| **Tech Comfort** | Intermediate-Advanced — Next.js, Tailwind CSS, some vanilla CSS |
| **Goals** | Ship fast; avoid spending hours on UI from scratch; find polished, production-quality components he can drop into his projects immediately |
| **Pain Points** | He doesn't have a design background; component libraries like MUI/Chakra feel over-engineered for small projects; CodePen requires too much hunting through low-quality results |
| **Motivations** | Speed to ship, cost savings (free tools), finding genuinely well-designed components that make his product look professional |
| **Device** | 13" MacBook Air, VS Code, Chrome DevTools; occasionally on an iPad |

#### Marcus's Core User Flow (Consumer Journey)

```
[Entry Point]
Marcus is building a landing page for his new SaaS tool.
He Googles "free dark mode glassmorphism card components."
ApexUI appears at the top. He clicks through.
        │
        ▼
[Landing Page & Discovery]
He lands on the ApexUI homepage and is immediately presented with
a live, interactive component gallery rendered against the Jet Black
dark theme. He can see buttons glowing, cards hovering, loaders
spinning — all without clicking anywhere.
        │
        ▼
[Search & Filter]
He presses Ctrl+K. The global search modal opens.
He types "glassmorphism card." Results appear instantly (debounced).
He also uses the category filter chips to narrow to "Cards."
He selects the sort option: "Most Liked."
        │
        ▼
[Component Inspection]
He finds a component — "Frosted Glass Info Card."
He clicks it. The component detail view opens:
  - Full-size sandboxed preview (iframe, isolated)
  - Code tabs: HTML | Tailwind | React/JSX
  - He toggles to the "Tailwind" tab since that's his stack.
  - He reads the code, sees it uses standard Tailwind utilities.
        │
        ▼
[One-Click Copy]
He clicks "Copy Code." 
A toast notification confirms: "✓ Tailwind code copied to clipboard!"
He pastes directly into his Next.js project. It works.
        │
        ▼
[Account Creation & Bookmarking — Optional]
Impressed, he decides to bookmark several more components.
He's prompted to create a free account.
He authenticates with Google (one click).
He can now bookmark components and access them from his profile.
        │
        ▼
[Return Visits]
Marcus returns to ApexUI for his next project.
His bookmarks are saved to his account.
He discovers new components via the "Trending This Week" section.
He occasionally upvotes components he's found valuable.
```

---

## 3. Tech Stack & Architecture Recommendations

### 3.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                               │
│              Next.js 14 (App Router) + React + Tailwind CSS         │
│                    Hosted on Vercel (Edge Network)                  │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ HTTPS / REST / Realtime WS
┌──────────────────────────▼──────────────────────────────────────────┐
│                         API LAYER                                   │
│          Next.js API Routes (Edge Functions on Vercel)              │
│         Supabase Client SDK (server-side + client-side)             │
└──────────────┬────────────────────────┬────────────────────────────-┘
               │                        │
┌──────────────▼──────────┐  ┌──────────▼────────────────────────────┐
│    SUPABASE BACKEND     │  │        SANDBOX / PREVIEW LAYER         │
│                         │  │                                        │
│  ├── PostgreSQL DB      │  │  Isolated <iframe> per component card  │
│  ├── Auth (OAuth)       │  │  Sandboxed with srcdoc attribute       │
│  ├── Storage (Buckets)  │  │  CSP headers to prevent XSS            │
│  ├── Row-Level Security │  │  DOMPurify on all user HTML before     │
│  └── Realtime           │  │  injection into preview                │
└─────────────────────────┘  └────────────────────────────────────────┘
```

---

### 3.2 Frontend

| Technology | Version | Rationale |
|---|---|---|
| **Next.js** | 14.x (App Router) | Full-stack React framework; server components for SEO-critical pages; edge functions for low-latency API routes; ISR for component pages |
| **React** | 18.x | Component rendering model; concurrent features for smooth UI |
| **Tailwind CSS** | 3.x | Utility-first CSS; enables the Jet Black theme via custom config; no runtime style overhead |
| **shadcn/ui** | Latest | Headless accessible components (dialogs, dropdowns, tooltips) built on Radix UI; composable with our custom design tokens |
| **Framer Motion** | 10.x | Hover animations, modal transitions, page transitions — all GPU-accelerated |
| **CodeMirror 6** | Latest | In-browser code editor for the submission form's live preview editor; supports HTML, CSS, JSX syntax highlighting |
| **react-hot-toast** | Latest | Non-blocking, accessible toast notifications for copy feedback |
| **Zustand** | 4.x | Lightweight client-side state management for UI state (search modal, active filters, theme preferences) |

---

### 3.3 Backend, Database & Auth

| Technology | Role | Details |
|---|---|---|
| **Supabase** | Backend-as-a-Service | Manages PostgreSQL, Auth, Storage, and Realtime in a unified, open-source platform |
| **PostgreSQL (via Supabase)** | Primary database | Stores users, components, categories, likes, bookmarks, tags |
| **Supabase Auth** | Authentication | OAuth 2.0 via GitHub and Google providers; JWT session management; Row Level Security (RLS) policies |
| **Supabase Storage** | File storage | Stores component preview thumbnail screenshots (auto-generated via headless browser or Playwright on submission); creator avatar overrides |
| **Supabase Realtime** | Live updates | Optional: real-time like count updates on component detail pages |
| **Supabase Edge Functions** | Serverless compute | Rate limiting logic, submission moderation triggers, webhook handlers |

---

### 3.4 Component Sandbox / Preview Isolation

The component preview system is the most technically sensitive part of the platform. All user-submitted code must be rendered safely without posing an XSS risk to other users.

**Chosen Approach: Sandboxed `<iframe>` with `srcdoc`**

```html
<!--
  Each component preview is rendered inside an isolated iframe.
  The sandbox attribute prevents JavaScript execution from
  accessing the parent document. srcdoc injects sanitized HTML.
-->
<iframe
  srcdoc="{sanitized_component_html}"
  sandbox="allow-scripts allow-same-origin"
  csp="default-src 'self'; style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com"
  loading="lazy"
  title="Component Preview"
></iframe>
```

**Sanitization Pipeline (Server-Side):**
1. User submits HTML/CSS/JSX code via the submission form
2. Server-side: DOMPurify (via `isomorphic-dompurify`) strips all malicious attributes and tags
3. Tailwind CDN is injected into the iframe `<head>` for Tailwind-based components
4. React/Babel standalone CDN is injected for JSX-based component previews
5. The sanitized `srcdoc` string is stored in the database's `preview_html` column
6. On page render, this column value is used to populate the iframe

**For React/JSX Components:**
- Babel standalone (`@babel/standalone`) transpiles JSX inside the sandboxed iframe
- React and ReactDOM are loaded via CDN within the iframe only
- Transpilation errors are caught and displayed as a friendly error state in the preview pane

---

### 3.5 Hosting & Infrastructure

| Service | Provider | Configuration |
|---|---|---|
| **Primary Hosting** | Vercel | Production and Preview deployments; Automatic CI/CD via GitHub integration |
| **Edge Network** | Vercel Edge Network | Global CDN for static assets and Edge Functions; target TTFB < 100ms globally |
| **Domain & DNS** | Vercel / Cloudflare | `apexui.dev` (or equivalent); Cloudflare for DNS, DDoS protection, and analytics |
| **Database** | Supabase (managed PostgreSQL) | Supabase Pro plan; daily backups; connection pooling via PgBouncer |
| **Storage** | Supabase Storage | S3-compatible object storage for thumbnails and media assets |
| **Error Tracking** | Sentry | Frontend and API route error tracking; performance monitoring |
| **Analytics** | Plausible Analytics | Privacy-first, GDPR-compliant page analytics; no cookie banner required |
| **CI/CD** | GitHub Actions + Vercel | Run linting, type-checking, and tests on every PR; auto-deploy on merge to `main` |

---

## 4. Functional Requirements & Feature Specifications

---

### 4.1 Hero & Landing Page

#### 4.1.1 Scope

The landing page is the primary discovery and conversion surface. It must immediately communicate the platform's value, aesthetic quality, and volume of available components — within the first 3 seconds of load.

#### 4.1.2 Feature Description

**Hero Section:**
- Full-viewport hero banner with the ApexUI wordmark, tagline, and two primary CTAs: `Browse Components` and `Submit a Component`
- Animated background: a subtle CSS-only animated gradient mesh or particle grid using the Electric Violet and Emerald accent palette against the `#09090B` base — conveying the "premium dark" brand identity without requiring JavaScript for initial paint
- Component count badge: a live-updating counter badge ("500+ Free Components") rendered via a Supabase count query on the server component — updated via ISR every 24 hours
- Social proof strip: GitHub stars badge, contributor count

**Dynamic Search Bar (Ctrl+K Command Palette):**
- Persistent search bar visible in the hero section and in the sticky navigation header
- Activates a full Command Palette modal overlay on `Ctrl+K` (Windows/Linux) or `Cmd+K` (macOS)
- The command palette provides:
  - Instant fuzzy-search results across component names, tags, and descriptions (Postgres full-text search via `pg_trgm` extension)
  - Results grouped by category with icon indicators
  - Keyboard navigation: `↑` `↓` to navigate results, `Enter` to select, `Esc` to dismiss
  - Recent searches persisted to `localStorage`
  - "No results" state with suggested popular categories

**Category Filter Strip:**
- Horizontally scrollable row of filter chips below the hero banner
- Categories include: `All`, `Buttons`, `Cards`, `Loaders`, `Forms`, `Inputs`, `Backgrounds`, `Patterns`, `Navbars`, `Modals`, `Badges`, `Tooltips`, `Animations`
- Active category chip is highlighted with an Electric Violet `box-shadow` glow
- Category selection updates the component grid without a full page reload (URL query param: `?category=buttons`)

**Component Grid (Homepage):**
- Responsive Masonry or CSS Grid layout of component preview cards
- Initially displays the top 24 "Trending" components
- Infinite scroll via Intersection Observer API (loads next 24 on scroll)
- Sort control: `Trending` | `Latest` | `Most Liked` | `Most Bookmarked`

#### 4.1.3 User Stories

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-LP-01 | Visitor | See an immediately impressive component gallery on page load | I understand what ApexUI offers without reading any text |
| US-LP-02 | Developer | Press Ctrl+K and search for "animated loader" | I find relevant components instantly without scrolling |
| US-LP-03 | Developer | Click the "Buttons" category chip | The grid updates to show only button components |
| US-LP-04 | Visitor | See a count of total available components | I trust the platform has sufficient variety |

#### 4.1.4 Acceptance Criteria

- [ ] Hero banner renders fully above the fold on 1280px desktop and 375px mobile viewports
- [ ] Ctrl+K / Cmd+K keystroke listener is attached globally; command palette opens within 50ms of keypress
- [ ] Search results return within 300ms of the user stopping typing (300ms debounce applied)
- [ ] Category filter chips scroll horizontally on mobile without visible scrollbar
- [ ] Component grid is rendered via server-side rendering (SSR) on first load for SEO; subsequent filter changes are client-side
- [ ] Component count displayed in the hero is accurate within 24 hours (ISR revalidation)
- [ ] Infinite scroll loads additional components within 500ms of the user reaching the scroll trigger

---

### 4.2 Component Preview System (Sandbox)

#### 4.2.1 Scope

The component preview system provides every visitor with an instant, interactive, live rendering of each UI component — without requiring them to copy, paste, or install anything. This is the core value delivery mechanism of the platform.

#### 4.2.2 Feature Description

**Component Card (Grid View):**
- Each component card on the grid displays:
  - A `150px` to `220px` height live iframe preview of the component, centered within the card
  - Component name (e.g., "Neon Pulse Button")
  - Creator avatar + username (linked to creator profile)
  - Like count with a heart icon
  - A "Copy Code" button surfaced on hover
  - A category badge chip (e.g., `Buttons`)
- Cards have a smooth `transform: translateY(-4px)` hover lift with an `box-shadow` glow in the component's dominant accent color (Electric Violet default)

**Component Detail Page (`/components/[slug]`):**
- Full-page detail view for a single component
- Left/Main panel: Large sandboxed iframe preview (min-height `400px`); responsive preview controls (Mobile / Tablet / Desktop width toggles)
- Right/Secondary panel: Code viewer with tab navigation
  - Tab 1: `HTML` — pure HTML + CSS inline
  - Tab 2: `Tailwind` — HTML using Tailwind utility classes
  - Tab 3: `React / JSX` — React functional component code
  - Tab 4: `Vue` *(Phase 3)* — Vue 3 SFC code
- Code panel uses a syntax-highlighted, read-only CodeMirror view with the Jet Black theme applied
- Creator credit block: Avatar, name, bio snippet, link to full profile, social links
- Related components section (same category, sorted by likes)
- Metadata: publish date, view count, like count, bookmark count, tags

**Preview Rendering Rules:**
- If a component is `type: html_css` → inject sanitized HTML + `<style>` block into iframe `srcdoc`
- If a component is `type: tailwind` → inject sanitized HTML + Tailwind CDN script into iframe `srcdoc`
- If a component is `type: react` → inject a minimal React + ReactDOM + Babel standalone environment with the JSX code transpiled and executed within the iframe

**Error States:**
- If the component code throws a render error, the iframe displays a centered error indicator: `⚠ Preview unavailable` with a CTA to "View Code" directly
- Error is silently logged to Sentry with the component ID for moderation review

#### 4.2.3 User Stories

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-PV-01 | Developer | See a live, interactive preview of a component on the card | I can evaluate it without copying any code |
| US-PV-02 | Developer | View the component in a large preview on the detail page | I can inspect it in detail before using it |
| US-PV-03 | Developer | Switch between HTML, Tailwind, and React tabs | I can get the code in the format my project uses |
| US-PV-04 | Developer | Resize the preview to simulate mobile width | I can verify the component is responsive |
| US-PV-05 | Developer | See related components below the detail view | I can discover more components in the same category |

#### 4.2.4 Acceptance Criteria

- [ ] All iframe previews render with `sandbox="allow-scripts"` attribute applied
- [ ] All user-submitted HTML is passed through DOMPurify before storage and again before render
- [ ] Iframe previews load lazily (using `loading="lazy"` or Intersection Observer) for performance
- [ ] Preview width controls (Mobile/Tablet/Desktop) on the detail page resize the iframe: 375px / 768px / 100%
- [ ] Code tabs switch instantly (< 50ms) without network request (all code stored in component record)
- [ ] Syntax highlighting is applied to all code panels
- [ ] Render errors in iframes do not propagate to the parent page (caught via `postMessage` error boundary)

---

### 4.3 One-Click Code Copy

#### 4.3.1 Scope

Code copying is the highest-frequency action on the platform. It must be instantaneous, visually confirmed, and work reliably across all modern browsers and devices.

#### 4.3.2 Feature Description

**Copy Button Placement:**
- Surfaced on hover over a component card: a `Copy` button appears in the top-right corner of the card
- Prominent `Copy Code` button on the component detail page, adjacent to each code tab
- A secondary icon-only copy button inside the code panel toolbar (clipboard icon)

**Code Format Selection:**
- Before copying from a card hover state, if multiple formats are available, a micro-dropdown appears with format options: `HTML`, `Tailwind`, `React`
- On the detail page, the copy button copies whichever code tab is currently active — no additional selection needed

**Copy Feedback:**
- On successful copy:
  - The button label transitions from `Copy` → `✓ Copied!` with a color shift to Emerald green (`#10B981`)
  - A toast notification appears (bottom-right): `"HTML code copied to clipboard!"` (dismisses after 2.5 seconds)
  - Button reverts to `Copy` after 2 seconds
- On copy failure (clipboard API unavailable):
  - A fallback `<textarea>` is programmatically selected for the user to manually press Ctrl+C
  - Toast notification: `"Select the text above and press Ctrl+C"`

**Technical Implementation:**
- Uses `navigator.clipboard.writeText()` (Clipboard API) as the primary method
- Falls back to `document.execCommand('copy')` on environments where Clipboard API is unavailable
- Copy analytics event is fired to Plausible: `copy_code` with properties `{ component_id, format, component_category }`

#### 4.3.3 User Stories

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-CC-01 | Developer | Click one button and have code copied to my clipboard | I can paste it into my project immediately |
| US-CC-02 | Developer | Choose which format (HTML/Tailwind/React) I copy | I only get the code relevant to my stack |
| US-CC-03 | Developer | See a clear visual confirmation that the copy succeeded | I don't accidentally paste an empty clipboard |

#### 4.3.4 Acceptance Criteria

- [ ] Clipboard copy completes within 100ms of button click
- [ ] Visual feedback (button state change + toast) appears within 150ms of click
- [ ] Copy button is accessible via keyboard (Tab + Enter / Space) in all contexts
- [ ] Fallback mechanism is triggered automatically when Clipboard API is denied or unavailable
- [ ] Copy button is visible on cards without requiring a hover on touch/mobile devices (always visible on small screens)
- [ ] Copy events are tracked in Plausible Analytics without PII

---

### 4.4 User System & Authentication

#### 4.4.1 Scope

User accounts enable community contribution, bookmarking, upvoting, and creator profiles. Authentication must be frictionless — OAuth only, no password management.

#### 4.4.2 Feature Description

**Authentication Providers:**
- GitHub OAuth (primary — most relevant to the developer audience)
- Google OAuth (secondary — broader accessibility)
- No email/password authentication in the MVP; reduces security surface area

**OAuth Flow (via Supabase Auth):**
1. User clicks "Sign In" or a protected action (Submit, Bookmark, Like)
2. Auth modal appears with two buttons: "Continue with GitHub" and "Continue with Google"
3. User is redirected to the OAuth provider
4. On return, Supabase creates a session JWT
5. A `users` record is upserted (matched by email) with profile data pulled from the OAuth provider
6. User is redirected back to the page they were on before the auth flow

**Creator Profile Page (`/creators/[username]`):**
- Public-facing profile page for any registered user who has submitted at least one component
- Displays:
  - Avatar (from OAuth provider or custom upload)
  - Display name, username, bio (editable)
  - Social links: GitHub, Twitter/X, Personal Site
  - Role tag: e.g., `Frontend Engineer`, `UI Designer`, `Full-Stack Developer`
  - Total component submissions, total likes received, total bookmarks received
  - Grid of all published components by this creator (sorted by likes, default)

**Component Management Dashboard (`/dashboard`):**
- Private, authenticated-only area for creators
- Tabs: `My Components` | `Bookmarks` | `Account Settings`
- **My Components tab:**
  - List view of all submitted components with status badges: `Published` | `Under Review` | `Rejected` | `Draft`
  - Edit, Delete, and Re-submit actions per component
  - Per-component stats: view count, like count, bookmark count (sparkline chart)
- **Bookmarks tab:**
  - Grid of all bookmarked components (same card layout as homepage)
  - Remove bookmark action
- **Account Settings tab:**
  - Edit display name, bio, role tag, social links
  - Profile picture upload (stored in Supabase Storage)
  - Account deletion (with confirmation dialog — triggers soft delete of user record)

#### 4.4.3 User Stories

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-AU-01 | Visitor | Sign in with my GitHub account | I don't have to create another password |
| US-AU-02 | Creator | View my public profile page | I can share it as part of my portfolio |
| US-AU-03 | Creator | See view, like, and bookmark stats per component | I know which of my components are most popular |
| US-AU-04 | Creator | Edit or delete a component I submitted | I can keep my work accurate and up to date |
| US-AU-05 | User | Bookmark components from the dashboard | I can access saved components later |

#### 4.4.4 Acceptance Criteria

- [ ] GitHub and Google OAuth flows complete in < 3 round trips; user lands on the correct return page
- [ ] All authenticated routes redirect to the auth modal if the user is unauthenticated
- [ ] Session persists across browser refreshes via Supabase's cookie-based JWT refresh
- [ ] Creator profile page is publicly accessible without authentication
- [ ] Profile avatar upload is restricted to JPEG/PNG/WEBP, max 2MB; images are resized to 256×256px on upload via Supabase Edge Function
- [ ] Account deletion removes all user PII but preserves submitted components attributed to `[Deleted User]`
- [ ] Row-Level Security (RLS) policies on Supabase ensure users can only edit/delete their own records

---

### 4.5 Community Submission Workflow

#### 4.5.1 Scope

The submission workflow is the platform's primary growth engine. It must be structured enough to maintain quality while being simple enough that a creator can submit a component in under 5 minutes.

#### 4.5.2 Feature Description

**Submission Form (`/submit`):**
The form is a multi-step wizard to avoid overwhelming the creator:

**Step 1 — Component Metadata:**
- Component Name (required, max 60 chars)
- Short Description (required, max 200 chars; plain text)
- Long Description (optional, Markdown supported, max 2000 chars)
- Category (required, single-select dropdown from canonical category list)
- Tags (optional, multi-select or free-text with autocomplete, max 5 tags, max 20 chars each)
- Tech Stack (required, single-select): `HTML + CSS` | `Tailwind CSS` | `React / JSX` | `Vue 3` (Phase 3)

**Step 2 — Code Entry & Live Preview:**
- The page shows a split-pane layout:
  - Left: CodeMirror 6 code editor (with appropriate syntax highlighting for the selected tech stack)
  - Right: Live sandboxed iframe preview that updates in real-time as the creator types (debounced 500ms)
- If the selected tech stack is `React / JSX`, the preview pane uses Babel standalone for transpilation
- The creator can paste their full component code (HTML structure + CSS styles inline or in a `<style>` block)
- A "Preview on Dark Background" toggle (dark/light background toggle for the preview pane — most components are designed for dark mode)
- Character count indicator (soft limit: 10,000 chars; hard limit: 50,000 chars)

**Step 3 — Review & Submit:**
- Summary card showing all entered metadata
- Final preview of the component
- Terms of contribution checkbox: `"I confirm this is my original work and I am licensing it under the MIT License for free community use."`
- `Submit for Review` button
- Submission triggers a Supabase Edge Function that:
  1. Sanitizes the code via DOMPurify
  2. Validates metadata fields (server-side)
  3. Inserts a record into the `components` table with `status: 'pending_review'`
  4. Sends a notification to the moderation queue (Discord webhook or Supabase email notification)
  5. Sends a confirmation email to the creator

**Moderation Queue (Admin-Only, `/admin`):**
- Table view of all `pending_review` components
- Inline preview of the component
- Actions: `Approve` | `Reject` | `Request Changes`
- Rejection and change-request actions trigger an email to the creator with the reason (free-text field)
- Approved components are immediately published and indexed

#### 4.5.3 User Stories

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-SW-01 | Creator | See a live preview of my component as I type the code | I can verify it looks correct before submitting |
| US-SW-02 | Creator | Know which tech stack the platform supports | I don't waste time submitting something unsupported |
| US-SW-03 | Creator | Receive a confirmation after submitting | I know my submission was received |
| US-SW-04 | Creator | Get notified when my component is approved or rejected | I can track the status of my submissions |
| US-SW-05 | Admin | Review and approve or reject submissions from a dashboard | I can maintain the quality of the platform |

#### 4.5.4 Acceptance Criteria

- [ ] Submission form is accessible only to authenticated users; unauthenticated access redirects to auth modal
- [ ] Live preview in Step 2 updates within 500ms after the creator stops typing (500ms debounce)
- [ ] Server-side validation rejects submissions with: empty required fields, code exceeding 50,000 characters, or more than 5 tags
- [ ] All submitted code is sanitized via DOMPurify before database insertion
- [ ] Creator receives a confirmation email within 60 seconds of submission
- [ ] Admin moderation queue displays all `pending_review` components, sorted by submission date (oldest first)
- [ ] Approved components are visible in the public gallery within 60 seconds of admin approval
- [ ] Rejection notification email is sent to the creator within 30 seconds of the rejection action

---

### 4.6 Community Engagement — Likes, Bookmarks & Sorting

#### 4.6.1 Scope

Community engagement features drive retention, surface quality content, and reward creators. They must be lightweight, fast, and require minimal friction.

#### 4.6.2 Feature Description

**Upvote / Like System:**
- A heart (`♥`) or upward-arrow icon on every component card and detail page
- Clicking the icon toggles a like/unlike action (requires authentication)
- The like count updates optimistically in the UI (before API response) to feel instant
- Authenticated users see a filled/highlighted icon on components they have already liked
- Like count is publicly visible on all cards and the detail page
- Supabase Realtime subscription optionally streams live like count updates on the detail page

**Bookmarks / Favorites:**
- A bookmark icon (`🔖`) on every component card and detail page
- Clicking toggles bookmark; requires authentication
- Bookmarked components are accessible in the user's Dashboard → Bookmarks tab
- Bookmark count is visible to creators on their component stats (in the dashboard), but is not necessarily shown publicly on cards (design decision: reduces cluttered card UI)

**Sorting & Filtering:**
The component grid supports the following sort modes, selectable via a dropdown or segmented control:

| Sort Mode | Logic | Use Case |
|---|---|---|
| `Trending` | Score = (likes in last 7 days × 2) + (bookmarks × 3) + (views / 100) | Default; surfaces currently hot components |
| `Latest` | Sort by `created_at DESC` | Discover newest submissions |
| `Most Liked` | Sort by `like_count DESC` (all-time) | Find the most community-validated components |
| `Most Viewed` | Sort by `view_count DESC` | Find the most widely used components |

The selected sort mode is reflected in the URL as a query parameter: `?sort=trending`, enabling shareable and bookmarkable filtered views.

**View Count Tracking:**
- Each component page visit increments the `view_count` column on the `components` table via a server-side API route (not client-side JS, to prevent ad-blocker interference)
- Duplicate views from the same user session (within 1 hour) are deduplicated using a session token hash

#### 4.6.3 User Stories

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-CE-01 | User | Like a component I found useful | I show appreciation to the creator and help surface quality content |
| US-CE-02 | User | Bookmark a component | I can find it quickly later in my dashboard |
| US-CE-03 | Developer | Sort the grid by "Most Liked" | I see the most community-validated, high-quality components first |
| US-CE-04 | Developer | Sort by "Latest" | I discover newly submitted components from the community |
| US-CE-05 | Creator | See how many bookmarks my component has received | I understand how much ongoing utility my component provides |

#### 4.6.4 Acceptance Criteria

- [ ] Like action completes an optimistic UI update within 50ms; API confirmation arrives within 500ms
- [ ] Unauthenticated like/bookmark clicks trigger the auth modal rather than a confusing error state
- [ ] A user cannot like the same component more than once (enforced at both client and database level via unique constraint)
- [ ] Sort selection updates the component grid within 300ms (client-side data already cached; server re-fetch for sort change)
- [ ] Trending sort algorithm runs as a PostgreSQL function/view, updated every hour via a Supabase scheduled Edge Function
- [ ] View count deduplication prevents a single user from inflating view counts during a single session (1-hour window)
- [ ] Sort mode is preserved in the URL and survives page refresh

---

## 5. Non-Functional Requirements

### 5.1 Performance

| Metric | Target | Measurement Tool |
|---|---|---|
| **Largest Contentful Paint (LCP)** | < 2.0 seconds (Good) | Google PageSpeed Insights, Vercel Analytics |
| **First Input Delay (FID) / INP** | < 100ms (Good) | Core Web Vitals real-user monitoring |
| **Cumulative Layout Shift (CLS)** | < 0.1 (Good) | Vercel Analytics, Lighthouse |
| **Time to First Byte (TTFB)** | < 200ms globally | Vercel Edge Network |
| **Component preview iframe render** | < 500ms from DOM insertion | Manual QA + synthetic testing |
| **Command palette search results** | < 300ms after debounce | Manual QA with PostgreSQL `EXPLAIN ANALYZE` |
| **API route p95 response time** | < 300ms | Sentry Performance |
| **Homepage JS bundle size** | < 150KB (gzipped) | Next.js Bundle Analyzer |

**Performance Strategies:**
- Use Next.js Server Components for all data-fetching-heavy pages (homepage, detail pages) to eliminate client-side loading waterfalls
- ISR (Incremental Static Regeneration) for component detail pages with `revalidate: 3600` (1 hour)
- `loading="lazy"` on all iframe previews below the fold
- Image optimization via `next/image` with AVIF/WebP formats
- `@next/bundle-analyzer` run on every CI build; bundle size regressions are flagged

---

### 5.2 Security

#### 5.2.1 XSS Protection (User-Submitted Code)

This is the highest-priority security concern on the platform. User-submitted HTML/CSS code is rendered in the browser of every visitor.

**Defense-in-Depth Strategy:**

| Layer | Mechanism | Details |
|---|---|---|
| **Layer 1: Input Validation** | Server-side schema validation | Zod schema validates all submission fields; rejects unexpected content types |
| **Layer 2: HTML Sanitization** | DOMPurify (isomorphic) | Strips all event handlers (`onclick`, `onerror`, etc.), `<script>` tags, `javascript:` protocols, and dangerous attributes before storage |
| **Layer 3: Iframe Sandbox** | `sandbox` attribute | `sandbox="allow-scripts"` prevents the iframe from accessing `window.parent`, cookies, or localStorage of the parent page |
| **Layer 4: Content Security Policy** | CSP headers on preview iframes | Restricts resource loading within iframes to a known allowlist (Tailwind CDN, React CDN, self) |
| **Layer 5: Supabase RLS** | Row-Level Security policies | Ensures users can only `UPDATE` or `DELETE` their own rows; prevents horizontal privilege escalation |

#### 5.2.2 Rate Limiting

| Endpoint | Limit | Window | Response on Breach |
|---|---|---|---|
| `POST /api/components` (submit) | 5 submissions | Per user per 24 hours | HTTP 429 with retry-after header |
| `POST /api/likes` | 60 likes | Per user per hour | HTTP 429 |
| `POST /api/bookmarks` | 100 bookmarks | Per user per hour | HTTP 429 |
| `GET /api/search` | 100 requests | Per IP per minute | HTTP 429 |
| Auth endpoints (Supabase) | Managed by Supabase | — | Supabase default throttling |

Rate limiting is enforced at the Vercel Edge Function layer using an in-memory store (Upstash Redis in Phase 2+).

#### 5.2.3 Additional Security Measures

- HTTPS-only: HSTS header enforced, HTTP redirects to HTTPS at the Cloudflare/Vercel edge
- Supabase API keys: The `anon` key is used client-side (RLS enforced); the `service_role` key is strictly server-side only, stored in Vercel environment variables
- Dependency scanning: GitHub Dependabot and `npm audit` run on every PR
- Admin routes (`/admin/*`): Protected by Supabase RLS `is_admin` column check on the `users` table; additional middleware guard in Next.js

---

### 5.3 Usability & Accessibility (a11y)

#### 5.3.1 WCAG Compliance

ApexUI targets **WCAG 2.1 Level AA** compliance as a minimum, with Level AAA targets for text elements and interactive controls.

| Element | Foreground | Background | Contrast Ratio | WCAG Level |
|---|---|---|---|---|
| Primary body text | `#FAFAFA` (white) | `#09090B` (Zinc-950) | 19.8:1 | AAA ✓ |
| Secondary text | `#A1A1AA` (Zinc-400) | `#09090B` (Zinc-950) | 7.0:1 | AAA ✓ |
| Muted text | `#71717A` (Zinc-500) | `#18181B` (Zinc-900) | 4.6:1 | AA ✓ |
| Electric Violet accent | `#8B5CF6` (Violet-500) | `#09090B` | 4.7:1 | AA ✓ |
| Emerald accent | `#10B981` (Emerald-500) | `#09090B` | 4.9:1 | AA ✓ |
| Interactive border focus | `#8B5CF6` focus ring | `#18181B` | 4.7:1 | AA ✓ |

#### 5.3.2 Keyboard Navigation

- All interactive elements (buttons, links, dropdowns, code tabs) are reachable via `Tab` key
- Command palette (Ctrl+K) is fully keyboard-navigable
- Focus trapping is implemented within modals (auth modal, submission review dialog) using Radix UI Dialog primitives
- `Esc` key closes any open modal, dropdown, or command palette
- Skip-to-main-content link is the first focusable element on every page (visible on focus)

#### 5.3.3 Semantic HTML & ARIA

- Correct use of landmark elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`
- Component cards use `<article>` elements with descriptive `aria-label` attributes
- Iframe preview elements have a descriptive `title` attribute: `title="Live preview of {component_name}"`
- Like and bookmark toggle buttons use `aria-pressed` to communicate state to screen readers
- Toast notifications are rendered in an `aria-live="polite"` region

#### 5.3.4 Code Readability

- All code displayed in the code panels uses a minimum font size of 13px (14px preferred)
- Line numbers are shown in the code panel for easier reference
- Syntax highlighting color tokens must themselves pass a minimum 3:1 contrast ratio against the code panel background (`#111113`)

---

## 6. Design System & UI/UX Guidelines — Jet Black Theme

### 6.1 Design Philosophy

> **"Premium Darkness"** — Every design decision should reinforce the feeling that ApexUI is a high-craft, premium tool. The darkness is not a mode; it is the identity. The interface should feel like opening an expensive physical product box: precise, confident, and slightly theatrical.

The Jet Black Premium Theme is characterized by:
- **Deep blacks** as the canvas — not grays
- **Razor-thin borders** that define structure without filling it
- **Glowing accents** that feel like electrical energy contained within the UI
- **Glassmorphism surfaces** for floating elements (modals, dropdowns, command palette)
- **Motion that implies physics** — hovers lift, clicks depress, modals materialize

---

### 6.2 Color Palette

#### 6.2.1 Background Hierarchy

| Role | Token | Hex | Tailwind Class | Usage |
|---|---|---|---|---|
| **App Background** | `color-bg-base` | `#09090B` | `bg-zinc-950` | Body, page root, full-bleed sections |
| **Surface (Cards, Panels)** | `color-bg-surface` | `#18181B` | `bg-zinc-900` | Component cards, sidebar panels, form fields |
| **Elevated Surface** | `color-bg-elevated` | `#1C1C1F` | `bg-zinc-900/80` | Dropdown menus, tooltips, popover backgrounds |
| **Overlay (Glass)** | `color-bg-overlay` | `rgba(24, 24, 27, 0.7)` | `bg-zinc-900/70 backdrop-blur-xl` | Command palette, auth modal, sheet overlays |

#### 6.2.2 Border Hierarchy

| Role | Token | Hex | Tailwind Class | Usage |
|---|---|---|---|---|
| **Default Border** | `color-border-default` | `#27272A` | `border-zinc-800` | Card borders, input borders, dividers |
| **Subtle Border** | `color-border-subtle` | `#1F1F23` | `border-zinc-900` | Section separators, collapsed panel borders |
| **Focus Border** | `color-border-focus` | `#8B5CF6` | `border-violet-500` | Input focus rings, active component card borders |

#### 6.2.3 Text Hierarchy

| Role | Token | Hex | Tailwind Class | Usage |
|---|---|---|---|---|
| **Primary Text** | `color-text-primary` | `#FAFAFA` | `text-zinc-50` | Headings, active labels, component names |
| **Secondary Text** | `color-text-secondary` | `#A1A1AA` | `text-zinc-400` | Subheadings, creator names, metadata |
| **Muted Text** | `color-text-muted` | `#71717A` | `text-zinc-500` | Timestamps, placeholders, helper text |
| **Disabled Text** | `color-text-disabled` | `#3F3F46` | `text-zinc-700` | Inactive tabs, disabled controls |

#### 6.2.4 Accent Colors

| Role | Token | Hex | Tailwind Class | Glow CSS |
|---|---|---|---|---|
| **Electric Violet (Primary)** | `color-accent-violet` | `#8B5CF6` | `text-violet-500` | `box-shadow: 0 0 20px rgba(139, 92, 246, 0.4)` |
| **Violet Hover** | `color-accent-violet-hover` | `#7C3AED` | `text-violet-600` | `box-shadow: 0 0 30px rgba(124, 58, 237, 0.5)` |
| **Emerald (Secondary/Success)** | `color-accent-emerald` | `#10B981` | `text-emerald-500` | `box-shadow: 0 0 20px rgba(16, 185, 129, 0.4)` |
| **Amber (Warning)** | `color-accent-amber` | `#F59E0B` | `text-amber-500` | `box-shadow: 0 0 20px rgba(245, 158, 11, 0.35)` |
| **Red (Destructive)** | `color-accent-red` | `#EF4444` | `text-red-500` | `box-shadow: 0 0 20px rgba(239, 68, 68, 0.35)` |

---

### 6.3 Typography

| Role | Font Family | Weight | Size (Desktop) | Size (Mobile) | Line Height |
|---|---|---|---|---|---|
| **Display / Hero Headline** | Inter (Variable) | 800 (ExtraBold) | 60–72px | 36–44px | 1.1 |
| **H1 — Page Title** | Inter | 700 (Bold) | 40px | 28px | 1.2 |
| **H2 — Section Title** | Inter | 600 (SemiBold) | 28px | 22px | 1.3 |
| **H3 — Card Title / Component Name** | Inter | 600 (SemiBold) | 16px | 15px | 1.4 |
| **Body — Standard Prose** | Inter | 400 (Regular) | 15px | 14px | 1.6 |
| **Body Small — Metadata, Labels** | Inter | 400 (Regular) | 13px | 12px | 1.5 |
| **Code — Snippets, Editor** | JetBrains Mono | 400 | 13–14px | 12px | 1.6 |
| **UI Labels — Buttons, Tabs** | Inter | 500 (Medium) | 13–14px | 13px | 1.0 |

**Font Loading:**
- Both Inter and JetBrains Mono are loaded via `next/font` with `display: swap` to prevent FOIT
- Variable font axes used: `wght` 100–900 for Inter; this eliminates multiple font file downloads

---

### 6.4 Component Card Layout & Hover Interaction Specifications

#### 6.4.1 Card Anatomy

```
┌─────────────────────────────────────────────┐  ← border: 1px solid #27272A
│                                             │     border-radius: 12px
│   ┌─────────────────────────────────────┐   │     background: #18181B
│   │                                     │   │
│   │     [LIVE IFRAME PREVIEW AREA]      │   │  ← min-height: 160px
│   │                                     │   │     background: #0D0D10
│   │                                     │   │     border-radius: 8px
│   └─────────────────────────────────────┘   │
│                                             │
│  [Category Badge]          [❤ 247]          │  ← footer row
│  "Neon Pulse Button"                        │  ← h3, text-zinc-50
│  by @sofia_reyes    [Avatar 20px]           │  ← text-zinc-400, text-sm
│                                             │
│  [Copy HTML ▾]           [🔖 Bookmark]      │  ← visible on hover only (desktop)
└─────────────────────────────────────────────┘     always visible on mobile
```

#### 6.4.2 Card Hover Interaction Specification

```css
/* Default state */
.component-card {
  background: #18181B;
  border: 1px solid #27272A;
  border-radius: 12px;
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 200ms ease,
              border-color 200ms ease;
}

/* Hover state */
.component-card:hover {
  transform: translateY(-4px);
  border-color: rgba(139, 92, 246, 0.5); /* Violet glow border */
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.4),
    0 10px 40px rgba(139, 92, 246, 0.12), /* Ambient violet glow */
    0 0 0 1px rgba(139, 92, 246, 0.15);   /* Inner ring */
}

/* Copy/action buttons appear on hover */
.component-card .hover-actions {
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 150ms ease, transform 150ms ease;
}
.component-card:hover .hover-actions {
  opacity: 1;
  transform: translateY(0);
}
```

#### 6.4.3 Glassmorphism (Command Palette & Modals)

```css
.glass-surface {
  background: rgba(24, 24, 27, 0.75);
  backdrop-filter: blur(16px) saturate(1.5);
  -webkit-backdrop-filter: blur(16px) saturate(1.5);
  border: 1px solid rgba(39, 39, 42, 0.8);
  border-radius: 16px;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.04); /* Top edge highlight */
}
```

#### 6.4.4 Interactive Button Specifications

| Variant | Background | Text | Border | Hover | Active |
|---|---|---|---|---|---|
| **Primary (Violet)** | `#8B5CF6` | `#FAFAFA` | None | `bg-violet-600` + glow | `scale(0.97)` |
| **Secondary (Outline)** | Transparent | `#FAFAFA` | `1px solid #27272A` | `bg-zinc-800` | `scale(0.97)` |
| **Ghost** | Transparent | `#A1A1AA` | None | `bg-zinc-800/50`, text `#FAFAFA` | `scale(0.97)` |
| **Destructive** | `#EF4444` | `#FAFAFA` | None | `bg-red-600` | `scale(0.97)` |
| **Success (Copy Confirmed)** | `#10B981` | `#FAFAFA` | None | n/a | n/a |

---

## 7. Database Schema Design

### 7.1 Overview

The database uses PostgreSQL (hosted on Supabase). Row-Level Security (RLS) is enabled on all tables. Supabase Auth manages the `auth.users` table; our application `users` table contains the public profile data.

---

### 7.2 Schema SQL

```sql
-- ============================================================
-- ApexUI Database Schema
-- PostgreSQL 15+ (Supabase)
-- Enable required extensions
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For full-text fuzzy search

-- ============================================================
-- TABLE: users
-- Public profile data, linked to Supabase auth.users
-- ============================================================
CREATE TABLE public.users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username      TEXT UNIQUE NOT NULL CHECK (char_length(username) BETWEEN 2 AND 40),
  display_name  TEXT NOT NULL CHECK (char_length(display_name) BETWEEN 1 AND 80),
  bio           TEXT CHECK (char_length(bio) <= 300),
  avatar_url    TEXT,
  website_url   TEXT,
  github_url    TEXT,
  twitter_url   TEXT,
  role_tag      TEXT CHECK (role_tag IN (
                  'Frontend Engineer',
                  'Full-Stack Developer',
                  'UI Designer',
                  'UX Designer',
                  'Indie Hacker',
                  'Student',
                  'Other'
                )),
  is_admin      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger: auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: categories
-- Canonical list of component categories
-- ============================================================
CREATE TABLE public.categories (
  id          SERIAL PRIMARY KEY,
  name        TEXT UNIQUE NOT NULL,  -- e.g., 'Buttons', 'Cards', 'Loaders'
  slug        TEXT UNIQUE NOT NULL,  -- e.g., 'buttons', 'cards', 'loaders'
  icon        TEXT,                  -- Lucide icon name string, e.g., 'square-mouse-pointer'
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed categories
INSERT INTO public.categories (name, slug, icon, sort_order) VALUES
  ('Buttons',     'buttons',     'square-mouse-pointer', 1),
  ('Cards',       'cards',       'id-card',              2),
  ('Loaders',     'loaders',     'loader-circle',        3),
  ('Forms',       'forms',       'form-input',           4),
  ('Inputs',      'inputs',      'text-cursor-input',    5),
  ('Backgrounds', 'backgrounds', 'layers',               6),
  ('Patterns',    'patterns',    'grid-3x3',             7),
  ('Navbars',     'navbars',     'menu',                 8),
  ('Modals',      'modals',      'panels-top-left',      9),
  ('Badges',      'badges',      'tag',                  10),
  ('Tooltips',    'tooltips',    'message-square',       11),
  ('Animations',  'animations',  'sparkles',             12);

-- ============================================================
-- TABLE: components
-- The core entity — user-submitted UI components
-- ============================================================
CREATE TYPE component_tech AS ENUM ('html_css', 'tailwind', 'react_jsx', 'vue');
CREATE TYPE component_status AS ENUM ('draft', 'pending_review', 'published', 'rejected');

CREATE TABLE public.components (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug              TEXT UNIQUE NOT NULL,
  creator_id        UUID NOT NULL REFERENCES public.users(id) ON DELETE SET NULL,
  category_id       INTEGER NOT NULL REFERENCES public.categories(id),
  name              TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 60),
  description_short TEXT NOT NULL CHECK (char_length(description_short) <= 200),
  description_long  TEXT CHECK (char_length(description_long) <= 2000),
  tech              component_tech NOT NULL,
  status            component_status NOT NULL DEFAULT 'pending_review',

  -- Raw code (sanitized on write, used for the code panel tabs)
  code_html         TEXT,               -- HTML/CSS version
  code_tailwind     TEXT,               -- Tailwind version
  code_react        TEXT,               -- React/JSX version
  code_vue          TEXT,               -- Vue version (Phase 3)

  -- Pre-sanitized preview HTML (injected into iframe srcdoc)
  preview_html      TEXT NOT NULL,

  -- Thumbnail screenshot (generated post-approval via headless browser)
  thumbnail_url     TEXT,

  -- Engagement counters (denormalized for read performance)
  like_count        INTEGER NOT NULL DEFAULT 0,
  bookmark_count    INTEGER NOT NULL DEFAULT 0,
  view_count        INTEGER NOT NULL DEFAULT 0,

  -- Moderation
  rejection_reason  TEXT,
  reviewed_by       UUID REFERENCES public.users(id),
  reviewed_at       TIMESTAMPTZ,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER components_updated_at
  BEFORE UPDATE ON public.components
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes for performance
CREATE INDEX idx_components_status ON public.components(status);
CREATE INDEX idx_components_category ON public.components(category_id);
CREATE INDEX idx_components_creator ON public.components(creator_id);
CREATE INDEX idx_components_created_at ON public.components(created_at DESC);
CREATE INDEX idx_components_like_count ON public.components(like_count DESC);
CREATE INDEX idx_components_view_count ON public.components(view_count DESC);

-- Full-text search index using pg_trgm
CREATE INDEX idx_components_search
  ON public.components
  USING GIN ((name || ' ' || COALESCE(description_short, '')) gin_trgm_ops);

-- ============================================================
-- TABLE: tags
-- Canonical tag dictionary
-- ============================================================
CREATE TABLE public.tags (
  id          SERIAL PRIMARY KEY,
  name        TEXT UNIQUE NOT NULL CHECK (char_length(name) <= 30),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: component_tags
-- Many-to-many: components ↔ tags
-- ============================================================
CREATE TABLE public.component_tags (
  component_id  UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  tag_id        INTEGER NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (component_id, tag_id)
);

CREATE INDEX idx_component_tags_tag ON public.component_tags(tag_id);

-- ============================================================
-- TABLE: likes
-- One like per user per component
-- ============================================================
CREATE TABLE public.likes (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  component_id  UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, component_id)
);

CREATE INDEX idx_likes_component ON public.likes(component_id);
CREATE INDEX idx_likes_user ON public.likes(user_id);

-- Trigger: keep like_count in sync
CREATE OR REPLACE FUNCTION sync_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.components
    SET like_count = like_count + 1
    WHERE id = NEW.component_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.components
    SET like_count = GREATEST(like_count - 1, 0)
    WHERE id = OLD.component_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER likes_sync_count
  AFTER INSERT OR DELETE ON public.likes
  FOR EACH ROW EXECUTE FUNCTION sync_like_count();

-- ============================================================
-- TABLE: bookmarks
-- One bookmark per user per component
-- ============================================================
CREATE TABLE public.bookmarks (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  component_id  UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, component_id)
);

CREATE INDEX idx_bookmarks_user ON public.bookmarks(user_id);
CREATE INDEX idx_bookmarks_component ON public.bookmarks(component_id);

-- Trigger: keep bookmark_count in sync
CREATE OR REPLACE FUNCTION sync_bookmark_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.components
    SET bookmark_count = bookmark_count + 1
    WHERE id = NEW.component_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.components
    SET bookmark_count = GREATEST(bookmark_count - 1, 0)
    WHERE id = OLD.component_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookmarks_sync_count
  AFTER INSERT OR DELETE ON public.bookmarks
  FOR EACH ROW EXECUTE FUNCTION sync_bookmark_count();

-- ============================================================
-- VIEW: trending_components
-- Trending score calculation — refreshed periodically
-- ============================================================
CREATE OR REPLACE VIEW public.trending_components AS
SELECT
  c.*,
  (
    (COUNT(l.id) FILTER (WHERE l.created_at > NOW() - INTERVAL '7 days') * 2) +
    (c.bookmark_count * 3) +
    (c.view_count / 100.0)
  ) AS trending_score
FROM public.components c
LEFT JOIN public.likes l ON l.component_id = c.id
WHERE c.status = 'published'
GROUP BY c.id
ORDER BY trending_score DESC;

-- ============================================================
-- ROW-LEVEL SECURITY POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- users: anyone can read public profiles; only owner can update
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.users FOR SELECT USING (TRUE);
CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE USING (auth.uid() = id);

-- components: published ones are public; creators manage their own
CREATE POLICY "Published components are viewable by everyone"
  ON public.components FOR SELECT USING (status = 'published');
CREATE POLICY "Creators can view their own components regardless of status"
  ON public.components FOR SELECT USING (auth.uid() = creator_id);
CREATE POLICY "Authenticated users can insert components"
  ON public.components FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update their own components"
  ON public.components FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Creators can delete their own components"
  ON public.components FOR DELETE USING (auth.uid() = creator_id);
CREATE POLICY "Admins have full access to components"
  ON public.components FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- likes: users manage their own likes
CREATE POLICY "Users can view all likes"
  ON public.likes FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can insert likes"
  ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own likes"
  ON public.likes FOR DELETE USING (auth.uid() = user_id);

-- bookmarks: users manage their own bookmarks
CREATE POLICY "Users can only view their own bookmarks"
  ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can insert bookmarks"
  ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own bookmarks"
  ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);
```

---

### 7.3 Entity Relationship Diagram (ERD Summary)

```
auth.users (Supabase Managed)
     │ 1:1
     ▼
  users ──────────────────────────────────┐
     │ 1:N                                │ (reviewed_by)
     ▼                                    │
 components ◄───────────────────────────┘
     │ N:M         │ 1:N        │ 1:N
     ▼             ▼            ▼
  tags           likes       bookmarks
     │             │              │
  component_tags  users         users
```

---

## 8. Product Roadmap & Phased Rollout

### 8.1 Phase 1 — MVP: Core Discovery Experience

**Timeline:** Weeks 1–8
**Goal:** Prove the core value proposition. A beautiful, fast, publicly accessible component gallery where developers can discover, preview, and copy UI components.

| Feature | Priority | Effort | Status |
|---|---|---|---|
| Project scaffolding (Next.js, Tailwind, Supabase) | P0 | S | 🔲 Todo |
| Jet Black design system implementation (colors, typography, tokens) | P0 | M | 🔲 Todo |
| Database schema setup (users, components, categories, tags) | P0 | S | 🔲 Todo |
| Hero & Landing Page (static, no auth) | P0 | M | 🔲 Todo |
| Category filter strip | P0 | S | 🔲 Todo |
| Component card grid with live iframe previews | P0 | L | 🔲 Todo |
| Component detail page (`/components/[slug]`) | P0 | L | 🔲 Todo |
| Code panel with tabs (HTML / Tailwind / React) | P0 | M | 🔲 Todo |
| One-click copy functionality | P0 | S | 🔲 Todo |
| Ctrl+K command palette (search) | P1 | M | 🔲 Todo |
| Seed database with 30–50 curated components (manual) | P0 | L | 🔲 Todo |
| Responsive design (mobile + tablet) | P0 | M | 🔲 Todo |
| SEO: meta tags, Open Graph, sitemap.xml | P1 | S | 🔲 Todo |
| Core Web Vitals optimization | P1 | M | 🔲 Todo |
| Vercel deployment + domain setup | P0 | S | 🔲 Todo |

**Phase 1 Exit Criteria:**
- Homepage loads with LCP < 2.0s on a 4G connection (Lighthouse score ≥ 90)
- At least 50 published components across 6+ categories
- One-click code copy works across Chrome, Firefox, Safari, Edge
- All component iframe previews render without XSS vulnerability (security audit pass)

---

### 8.2 Phase 2 — Community: Auth, Submissions & Engagement

**Timeline:** Weeks 9–18
**Goal:** Enable community participation. Allow creators to submit, users to engage, and build the flywheel of community-driven content growth.

| Feature | Priority | Effort | Status |
|---|---|---|---|
| Supabase Auth setup (GitHub + Google OAuth) | P0 | M | 🔲 Todo |
| User profile creation (auto on first OAuth login) | P0 | M | 🔲 Todo |
| Creator public profile page (`/creators/[username]`) | P1 | M | 🔲 Todo |
| Component Management Dashboard (`/dashboard`) | P1 | L | 🔲 Todo |
| Community Submission Form (`/submit`) — Step 1: Metadata | P0 | M | 🔲 Todo |
| Community Submission Form — Step 2: Live Preview Editor | P0 | XL | 🔲 Todo |
| Community Submission Form — Step 3: Review & Submit | P0 | M | 🔲 Todo |
| Server-side code sanitization pipeline (DOMPurify) | P0 | M | 🔲 Todo |
| Admin Moderation Queue (`/admin`) | P0 | L | 🔲 Todo |
| Email notifications (submission confirmation, approval, rejection) | P1 | M | 🔲 Todo |
| Like / upvote system | P0 | M | 🔲 Todo |
| Bookmark / favorites system | P0 | M | 🔲 Todo |
| Sort controls (Trending, Latest, Most Liked, Most Viewed) | P0 | M | 🔲 Todo |
| Rate limiting on submission and engagement endpoints | P1 | M | 🔲 Todo |
| Upstash Redis integration for rate limiting | P1 | S | 🔲 Todo |
| Trending score algorithm (PostgreSQL view) | P1 | M | 🔲 Todo |
| View count tracking (deduplication) | P2 | S | 🔲 Todo |
| Plausible Analytics integration | P2 | S | 🔲 Todo |
| Sentry error tracking integration | P1 | S | 🔲 Todo |
| WCAG AA accessibility audit & remediation | P1 | M | 🔲 Todo |

**Phase 2 Exit Criteria:**
- Full OAuth auth flow working for GitHub and GitHub providers
- Creators can submit components and receive email confirmation within 60 seconds
- Admin moderation queue is functional; approved components appear within 60 seconds
- Like and bookmark interactions complete with optimistic UI in < 100ms
- 100+ community-submitted components published through the moderation pipeline
- Rate limiting active on all submission endpoints

---

### 8.3 Phase 3 — Growth: Monetization, Multi-Framework Export & Analytics

**Timeline:** Weeks 19–32
**Goal:** Establish sustainable growth levers, expand the value proposition with multi-framework support, and introduce ethical monetization.

| Feature | Priority | Effort | Status |
|---|---|---|---|
| **Multi-Framework Export** | | | |
| Vue 3 SFC code tab + submission support | P1 | L | 🔲 Todo |
| Svelte code tab + submission support | P2 | L | 🔲 Todo |
| Vanilla JS (no framework) code tab | P2 | M | 🔲 Todo |
| **Advanced Search & Discovery** | | | |
| AI-powered component similarity search (pgvector embeddings) | P2 | XL | 🔲 Todo |
| Tag browsing pages (`/tags/[tag]`) | P1 | S | 🔲 Todo |
| "Collections" feature (curated themed sets of components) | P2 | L | 🔲 Todo |
| **Creator Economy & Recognition** | | | |
| Creator leaderboard page | P2 | M | 🔲 Todo |
| "Featured Creator" spotlight (homepage banner rotation) | P2 | M | 🔲 Todo |
| Creator analytics dashboard (view trends, like growth charts) | P1 | L | 🔲 Todo |
| **Monetization** | | | |
| Sponsor banner slots (homepage, category pages) | P1 | M | 🔲 Todo |
| "Premium Collections" by notable designers (one-time purchase) | P3 | XL | 🔲 Todo |
| ApexUI Pro subscription (priority submission review, advanced stats) | P3 | XL | 🔲 Todo |
| Newsletter integration (ConvertKit / Resend) with weekly "Best of ApexUI" digest | P1 | M | 🔲 Todo |
| **Technical Enhancements** | | | |
| Automated component thumbnail screenshots (Playwright headless) | P2 | L | 🔲 Todo |
| Component versioning (allow creators to update a component's code) | P2 | L | 🔲 Todo |
| Component download as `.zip` (includes all code variants) | P2 | M | 🔲 Todo |
| Community Component Review / Quality Score (peer review system) | P3 | XL | 🔲 Todo |
| Native dark/light preview toggle in submission editor | P2 | S | 🔲 Todo |

**Phase 3 Exit Criteria:**
- Vue 3 and Svelte code tabs live for applicable components
- First sponsorship deal live on the platform
- Newsletter with 2,000+ subscribers and ≥ 30% open rate
- Creator analytics dashboard accessible to all creators with published components
- 500+ total published components across all categories
- Platform MAU reaches 10,000+

---

### 8.4 Roadmap Timeline Summary

```
Week  1─────4─────8─────12────16────20────24────28────32
      │             │              │                   │
      ├─ PHASE 1 ───┤              │                   │
      │  MVP Core   │              │                   │
      │             ├─ PHASE 2 ───┤                   │
      │             │  Community   │                   │
      │             │             ├────── PHASE 3 ─────┤
      │             │             │   Growth & Scale   │
      ▼             ▼             ▼                   ▼
   [Launch     [Auth +       [Multi-          [Sustainable
    Preview]   Submissions]  Framework]       Platform]
```

---

## 9. Appendix & Glossary

### 9.1 Glossary

| Term | Definition |
|---|---|
| **Component** | A self-contained, reusable UI element (e.g., a button, loader, card) defined by its HTML/CSS/JS code |
| **Sandbox / iframe Sandbox** | An isolated browser context where user-submitted code is rendered safely without access to the parent page's DOM, cookies, or storage |
| **srcdoc** | An HTML `<iframe>` attribute that allows injecting HTML content directly as a string, rather than via a `src` URL |
| **DOMPurify** | An open-source JavaScript library that sanitizes HTML and prevents XSS attacks by stripping malicious attributes and tags |
| **ISR** | Incremental Static Regeneration — a Next.js feature that re-generates static pages in the background at a defined interval |
| **RLS** | Row-Level Security — a PostgreSQL security feature that enforces data access policies at the database row level |
| **WCAG** | Web Content Accessibility Guidelines — the international standard for web accessibility compliance |
| **LCP** | Largest Contentful Paint — a Core Web Vitals metric measuring when the largest visible element on screen finishes rendering |
| **INP** | Interaction to Next Paint — a Core Web Vitals metric measuring responsiveness to user interactions |
| **CLS** | Cumulative Layout Shift — a Core Web Vitals metric measuring visual stability (unexpected layout movement) |
| **Trending Score** | A calculated score per component based on recent likes, all-time bookmarks, and view count, used to rank the "Trending" feed |
| **pg_trgm** | A PostgreSQL extension providing fuzzy text matching using trigrams; enables fast `LIKE` and `ILIKE` queries on component names and descriptions |
| **JetBrains Mono** | The monospace typeface used for all code display panels in ApexUI |
| **Glassmorphism** | A UI design trend characterized by frosted-glass backgrounds with translucency, blur, and thin borders — used for ApexUI's floating surfaces |

---

### 9.2 Key External Dependencies

| Dependency | Version | License | Risk |
|---|---|---|---|
| Next.js | 14.x | MIT | Low — stable, widely adopted |
| React | 18.x | MIT | Low — stable |
| Tailwind CSS | 3.x | MIT | Low — stable |
| Supabase JS SDK | 2.x | MIT | Low — managed service with SLA |
| DOMPurify | 3.x | Apache-2.0 | Low — critical security dependency; pin version |
| CodeMirror | 6.x | MIT | Low — stable, extensible |
| Framer Motion | 10.x | MIT | Low |
| Babel Standalone | 7.x | MIT | Medium — used in iframe for JSX transpilation; monitor bundle size |
| isomorphic-dompurify | Latest | Apache-2.0 | Low |

---

### 9.3 Open Questions & Decisions Deferred

| # | Question | Owner | Target Resolution |
|---|---|---|---|
| OQ-1 | Should Vue 3 support be moved from Phase 3 into Phase 2 given its community size? | Product Lead | Before Phase 2 kickoff |
| OQ-2 | What is the moderation staffing model? (Volunteer community mods vs. paid admin team vs. AI-assisted pre-filtering?) | Community Manager | Before Phase 2 launch |
| OQ-3 | Should component view counts be publicly visible on cards, or only in creator dashboards? | Design Lead | Before Phase 1 design sign-off |
| OQ-4 | Should ApexUI require contributors to be the original author, or allow submissions of third-party MIT-licensed components with attribution? | Legal / Community Manager | Before Phase 2 submission feature launch |
| OQ-5 | What is the component rejection appeal process for creators? | Product Lead + Community Manager | Before Phase 2 launch |
| OQ-6 | Should the platform support a "Dark Mode Toggle" for previewing how components look on light backgrounds? | Design Lead | Phase 2 — submit form scope |
| OQ-7 | Will Phase 3 sponsorships be self-serve or manually booked? | Business Lead | Before Phase 3 kickoff |

---

### 9.4 Document Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | — | Product Team | Initial internal draft |
| 1.0 | July 2026 | Product Team | First complete PRD; all sections finalized; ready for engineering review |

---

*This document is the authoritative source of truth for the ApexUI v1.0 product. All engineering, design, and community decisions should be validated against this PRD. Amendments require a version bump and stakeholder sign-off.*

---

**End of Document — ApexUI PRD v1.0**
