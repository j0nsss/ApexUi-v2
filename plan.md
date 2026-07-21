# ApexUI — AI Agent Implementation Plan

> **Plan Version:** 1.0.0
> **Generated From:** ApexUI PRD v1.0.0
> **Purpose:** Step-by-step roadmap for AI Coding Agents (Cursor / Windsurf / Claude Code)
> **Architecture:** Next.js 14 App Router · TypeScript · Tailwind CSS · Supabase · Vercel

---

## Table of Contents

1. [Tech Stack & Environment Setup Checklist](#1-tech-stack--environment-setup-checklist)
2. [Folder & File Architecture Roadmap](#2-folder--file-architecture-roadmap)
3. [Database & Backend Implementation Steps](#3-database--backend-implementation-steps)
4. [Design System & Styling Implementation](#4-design-system--styling-implementation)
5. [Phase-by-Phase Task Breakdown](#5-phase-by-phase-task-breakdown)
   - [Phase 1: Project Skeleton & Design System Foundation](#phase-1-project-skeleton--design-system-foundation)
   - [Phase 2: Database Schema & Supabase Integration](#phase-2-database-schema--supabase-integration)
   - [Phase 3: Core UI Components & Jet Black Shell](#phase-3-core-ui-components--jet-black-shell)
   - [Phase 4: Component Sandbox & Preview Rendering System](#phase-4-component-sandbox--preview-rendering-system)
   - [Phase 5: Search, Filter & One-Click Copy System](#phase-5-search-filter--one-click-copy-system)
   - [Phase 6: Auth System & Creator Profile Dashboard](#phase-6-auth-system--creator-profile-dashboard)
   - [Phase 7: Community Submission Workflow](#phase-7-community-submission-workflow)
   - [Phase 8: Engagement Features](#phase-8-engagement-features)
   - [Phase 9: Security, Sanitization & Rate Limiting](#phase-9-security-sanitization--rate-limiting)
   - [Phase 10: Testing, Performance Optimization & Vercel Deployment](#phase-10-testing-performance-optimization--vercel-deployment)
6. [AI Agent Execution Rules & Instructions](#6-ai-agent-execution-rules--instructions)

---

## 1. Tech Stack & Environment Setup Checklist

### 1.1 Core Framework Initialization

Run the following commands **in order** to scaffold the project:

```bash
# Step 1: Create Next.js app with TypeScript and Tailwind
npx create-next-app@14 apexui \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd apexui

# Step 2: Confirm Node.js version (must be >= 18.17)
node -v

# Step 3: Initialize git (if not already)
git init
git add .
git commit -m "chore: initial Next.js 14 scaffold"
```

### 1.2 Required Packages & Dependencies

Install all production dependencies **in a single pass** to avoid version conflicts:

```bash
# --- Supabase ---
npm install @supabase/supabase-js @supabase/ssr

# --- UI Primitives & Design ---
npm install @radix-ui/react-dialog \
            @radix-ui/react-dropdown-menu \
            @radix-ui/react-tabs \
            @radix-ui/react-tooltip \
            @radix-ui/react-avatar \
            @radix-ui/react-select \
            @radix-ui/react-label \
            @radix-ui/react-checkbox \
            @radix-ui/react-slot

# --- shadcn/ui (run after Radix installs) ---
npx shadcn-ui@latest init
# When prompted:
#   Style: Default
#   Base color: Zinc
#   CSS variables: Yes

# Add required shadcn components
npx shadcn-ui@latest add button dialog dropdown-menu tabs tooltip avatar \
                          select label checkbox badge separator sheet

# --- Animation & Motion ---
npm install framer-motion

# --- Icons ---
npm install lucide-react

# --- State Management ---
npm install zustand

# --- Code Editor (Submission Form) ---
npm install @codemirror/view \
            @codemirror/state \
            @codemirror/lang-html \
            @codemirror/lang-css \
            @codemirror/lang-javascript \
            @codemirror/theme-one-dark \
            codemirror

# --- Toast Notifications ---
npm install react-hot-toast

# --- Security / Sanitization ---
npm install dompurify isomorphic-dompurify
npm install --save-dev @types/dompurify

# --- Fonts ---
# (Handled via next/font — no npm install needed)

# --- Utilities ---
npm install clsx tailwind-merge
npm install slugify
npm install date-fns

# --- Rate Limiting ---
npm install @upstash/ratelimit @upstash/redis

# --- Email (transactional) ---
npm install resend

# --- Markdown ---
npm install react-markdown remark-gfm

# --- SEO ---
# (Handled natively via Next.js Metadata API — no extra package)
```

Install development dependencies:

```bash
npm install --save-dev \
  @types/node \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jest \
  jest-environment-jsdom \
  @playwright/test \
  eslint-plugin-jsx-a11y \
  prettier \
  prettier-plugin-tailwindcss
```

### 1.3 Environment Variables Template

Create `.env.example` at the project root **exactly as follows**. Copy it to `.env.local` and fill in real values before running the dev server.

```bash
# .env.example
# =============================================================
# ApexUI — Environment Variables Template
# Copy this file to .env.local and fill in the values.
# NEVER commit .env.local to version control.
# =============================================================

# --- Supabase (Required) ---
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# --- Supabase Auth Redirect ---
# Local development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Production (override in Vercel env)
# NEXT_PUBLIC_SITE_URL=https://apexui.dev

# --- Upstash Redis (Rate Limiting — Required for Phase 9) ---
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-token-here

# --- Resend (Email — Required for Phase 7) ---
RESEND_API_KEY=re_your-resend-key-here
RESEND_FROM_EMAIL=noreply@apexui.dev

# --- Sentry (Error Tracking — Phase 10) ---
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_AUTH_TOKEN=your-sentry-auth-token

# --- Plausible Analytics (Phase 10) ---
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=apexui.dev
```

Add `.env.local` to `.gitignore` (verify it is already listed from Next.js scaffold — if not, add it):

```bash
echo ".env.local" >> .gitignore
```

---

## 2. Folder & File Architecture Roadmap

### 2.1 Complete Directory Structure

The following is the **target architecture** for the entire project. Build toward this tree incrementally — do not create empty files ahead of schedule.

```
apexui/
├── .env.example                        # Env vars template (committed)
├── .env.local                          # Actual secrets (git-ignored)
├── .eslintrc.json                      # ESLint config
├── .prettierrc                         # Prettier config
├── next.config.ts                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind + Jet Black theme
├── tsconfig.json                       # TypeScript config
├── postcss.config.js                   # PostCSS (Tailwind dependency)
├── components.json                     # shadcn/ui config
├── package.json
│
├── src/
│   ├── app/                            # Next.js App Router
│   │   ├── layout.tsx                  # Root layout (fonts, providers, toast)
│   │   ├── page.tsx                    # Homepage — component gallery
│   │   ├── globals.css                 # Global styles & CSS variables
│   │   │
│   │   ├── components/
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Component detail page
│   │   │
│   │   ├── creators/
│   │   │   └── [username]/
│   │   │       └── page.tsx            # Public creator profile page
│   │   │
│   │   ├── dashboard/
│   │   │   ├── layout.tsx              # Dashboard layout (auth guard)
│   │   │   ├── page.tsx                # Dashboard — My Components tab
│   │   │   ├── bookmarks/
│   │   │   │   └── page.tsx            # Dashboard — Bookmarks tab
│   │   │   └── settings/
│   │   │       └── page.tsx            # Dashboard — Account Settings tab
│   │   │
│   │   ├── submit/
│   │   │   └── page.tsx                # Multi-step submission wizard
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx              # Admin layout (admin guard)
│   │   │   └── page.tsx                # Admin moderation queue
│   │   │
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts            # Supabase OAuth callback handler
│   │   │
│   │   └── api/                        # Next.js API Routes
│   │       ├── components/
│   │       │   ├── route.ts            # GET (list) / POST (create)
│   │       │   └── [id]/
│   │       │       ├── route.ts        # GET / PATCH / DELETE single
│   │       │       └── view/
│   │       │           └── route.ts    # POST — increment view count
│   │       ├── likes/
│   │       │   └── route.ts            # POST (like) / DELETE (unlike)
│   │       ├── bookmarks/
│   │       │   └── route.ts            # POST (add) / DELETE (remove)
│   │       ├── search/
│   │       │   └── route.ts            # GET — full-text search
│   │       ├── users/
│   │       │   └── [username]/
│   │       │       └── route.ts        # GET creator profile data
│   │       ├── admin/
│   │       │   ├── components/
│   │       │   │   └── route.ts        # GET pending_review list
│   │       │   └── components/[id]/
│   │       │       ├── approve/
│   │       │       │   └── route.ts    # POST — approve component
│   │       │       └── reject/
│   │       │           └── route.ts    # POST — reject component
│   │       └── upload/
│   │           └── avatar/
│   │               └── route.ts        # POST — avatar upload to Supabase Storage
│   │
│   ├── components/                     # Reusable React components
│   │   │
│   │   ├── ui/                         # shadcn/ui generated components (auto-managed)
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                     # Page-level shell components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Providers.tsx           # Client providers wrapper (Zustand, Toast)
│   │   │
│   │   ├── home/                       # Homepage-specific components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CategoryFilterStrip.tsx
│   │   │   ├── ComponentGrid.tsx
│   │   │   └── SortControls.tsx
│   │   │
│   │   ├── component-card/             # Component card & grid cell
│   │   │   ├── ComponentCard.tsx
│   │   │   └── ComponentCardSkeleton.tsx
│   │   │
│   │   ├── preview/                    # Sandbox preview system
│   │   │   ├── ComponentPreview.tsx    # iframe sandbox wrapper
│   │   │   ├── PreviewWidthControls.tsx
│   │   │   └── PreviewErrorBoundary.tsx
│   │   │
│   │   ├── code-panel/                 # Code display & copy
│   │   │   ├── CodePanel.tsx           # Tabbed code viewer
│   │   │   ├── CodeBlock.tsx           # Syntax-highlighted code block
│   │   │   └── CopyButton.tsx          # One-click copy with feedback
│   │   │
│   │   ├── search/                     # Command palette / search
│   │   │   ├── CommandPalette.tsx      # Ctrl+K modal
│   │   │   └── SearchResult.tsx
│   │   │
│   │   ├── auth/                       # Auth UI
│   │   │   ├── AuthModal.tsx
│   │   │   └── AuthGuard.tsx           # Client-side auth wrapper
│   │   │
│   │   ├── submission/                 # Multi-step submit form
│   │   │   ├── SubmissionWizard.tsx    # Step controller
│   │   │   ├── StepMetadata.tsx        # Step 1
│   │   │   ├── StepCodeEditor.tsx      # Step 2 (CodeMirror + live preview)
│   │   │   └── StepReview.tsx          # Step 3
│   │   │
│   │   ├── dashboard/                  # Dashboard-specific components
│   │   │   ├── ComponentStatusBadge.tsx
│   │   │   ├── DashboardComponentRow.tsx
│   │   │   └── AvatarUploader.tsx
│   │   │
│   │   ├── engagement/                 # Like & bookmark buttons
│   │   │   ├── LikeButton.tsx
│   │   │   └── BookmarkButton.tsx
│   │   │
│   │   └── admin/                      # Admin-only components
│   │       └── ModerationCard.tsx
│   │
│   ├── lib/                            # Utilities & service clients
│   │   ├── supabase/
│   │   │   ├── client.ts               # Browser Supabase client (singleton)
│   │   │   ├── server.ts               # Server Supabase client (SSR)
│   │   │   └── middleware.ts           # Session refresh middleware helper
│   │   ├── sanitize.ts                 # DOMPurify wrapper (server + client)
│   │   ├── rate-limit.ts               # Upstash rate limiter setup
│   │   ├── slug.ts                     # Slug generation utility
│   │   ├── clipboard.ts                # Copy to clipboard with fallback
│   │   ├── trending.ts                 # Trending score helpers
│   │   └── email.ts                    # Resend email sender helpers
│   │
│   ├── hooks/                          # Custom React hooks
│   │   ├── useComponentGrid.ts         # Infinite scroll + filter state
│   │   ├── useSearch.ts                # Debounced search hook
│   │   ├── useAuth.ts                  # Auth state hook
│   │   ├── useLike.ts                  # Optimistic like toggle
│   │   ├── useBookmark.ts              # Optimistic bookmark toggle
│   │   └── useCopyCode.ts              # Copy with visual feedback
│   │
│   ├── store/                          # Zustand stores
│   │   ├── searchStore.ts              # Command palette state
│   │   ├── filterStore.ts              # Active category + sort state
│   │   └── authStore.ts                # Client-side auth mirror
│   │
│   ├── types/                          # TypeScript type definitions
│   │   ├── database.types.ts           # Generated from Supabase (see §3.5)
│   │   ├── component.types.ts          # Component domain types
│   │   ├── user.types.ts               # User / creator types
│   │   └── api.types.ts                # API request/response types
│   │
│   └── middleware.ts                   # Next.js middleware (auth session)
│
├── supabase/
│   └── migrations/
│       ├── 001_extensions.sql
│       ├── 002_users.sql
│       ├── 003_categories.sql
│       ├── 004_components.sql
│       ├── 005_tags.sql
│       ├── 006_likes.sql
│       ├── 007_bookmarks.sql
│       ├── 008_views.sql
│       ├── 009_rls_policies.sql
│       └── 010_seed_categories.sql
│
└── public/
    ├── favicon.ico
    ├── og-image.png                    # Open Graph default image (1200×630)
    └── fonts/                          # (empty — using next/font CDN)
```

### 2.2 Naming Conventions

- **Files:** PascalCase for React components (`ComponentCard.tsx`), kebab-case for route segments (`[slug]`), camelCase for utilities (`sanitize.ts`).
- **Types:** Suffix `Types` on type definition files (`component.types.ts`). Use `interface` for object shapes, `type` for unions/intersections.
- **API Routes:** Always named `route.ts` inside the appropriate `app/api/` segment.
- **Hooks:** Always prefixed with `use` (`useLike.ts`).
- **Stores:** Always suffixed with `Store` (`filterStore.ts`).
- **CSS classes:** Compose Tailwind utilities directly. Custom one-off classes go in `globals.css` under `@layer components`.
- **SQL migrations:** Zero-padded three-digit prefix, descriptive name (`001_extensions.sql`).

---

## 3. Database & Backend Implementation Steps (Supabase)

### 3.1 Supabase Project Setup

```
1. Go to https://supabase.com/dashboard → New Project
2. Name: apexui-prod
3. Database password: [generate strong password, save securely]
4. Region: closest to your Vercel deployment region
5. Copy Project URL and anon key into .env.local
6. Copy service_role key into .env.local (NEVER expose client-side)
```

### 3.2 Migration Files — Generation Order

Create each SQL file under `supabase/migrations/` in numbered order. Apply them via the Supabase Dashboard SQL Editor or Supabase CLI (`supabase db push`).

---

#### Migration 001 — Extensions

```sql
-- supabase/migrations/001_extensions.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
```

---

#### Migration 002 — Users Table

```sql
-- supabase/migrations/002_users.sql

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

-- Auto-update trigger for updated_at
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
```

---

#### Migration 003 — Categories Table

```sql
-- supabase/migrations/003_categories.sql

CREATE TABLE public.categories (
  id          SERIAL PRIMARY KEY,
  name        TEXT UNIQUE NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  icon        TEXT,              -- Lucide icon name string
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

#### Migration 004 — Components Table

```sql
-- supabase/migrations/004_components.sql

CREATE TYPE component_tech AS ENUM ('html_css', 'tailwind', 'react_jsx', 'vue');
CREATE TYPE component_status AS ENUM ('draft', 'pending_review', 'published', 'rejected');

CREATE TABLE public.components (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug              TEXT UNIQUE NOT NULL,
  creator_id        UUID REFERENCES public.users(id) ON DELETE SET NULL,
  category_id       INTEGER NOT NULL REFERENCES public.categories(id),
  name              TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 60),
  description_short TEXT NOT NULL CHECK (char_length(description_short) <= 200),
  description_long  TEXT CHECK (char_length(description_long) <= 2000),
  tech              component_tech NOT NULL,
  status            component_status NOT NULL DEFAULT 'pending_review',

  -- Raw code variants (sanitized on write)
  code_html         TEXT,
  code_tailwind     TEXT,
  code_react        TEXT,
  code_vue          TEXT,

  -- Pre-sanitized HTML injected into iframe srcdoc
  preview_html      TEXT NOT NULL,

  -- Thumbnail (generated post-approval)
  thumbnail_url     TEXT,

  -- Denormalized engagement counters for read performance
  like_count        INTEGER NOT NULL DEFAULT 0,
  bookmark_count    INTEGER NOT NULL DEFAULT 0,
  view_count        INTEGER NOT NULL DEFAULT 0,

  -- Moderation metadata
  rejection_reason  TEXT,
  reviewed_by       UUID REFERENCES public.users(id),
  reviewed_at       TIMESTAMPTZ,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER components_updated_at
  BEFORE UPDATE ON public.components
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Performance indexes
CREATE INDEX idx_components_status      ON public.components(status);
CREATE INDEX idx_components_category    ON public.components(category_id);
CREATE INDEX idx_components_creator     ON public.components(creator_id);
CREATE INDEX idx_components_created_at  ON public.components(created_at DESC);
CREATE INDEX idx_components_like_count  ON public.components(like_count DESC);
CREATE INDEX idx_components_view_count  ON public.components(view_count DESC);

-- Full-text / fuzzy search index (pg_trgm)
CREATE INDEX idx_components_search
  ON public.components
  USING GIN ((name || ' ' || COALESCE(description_short, '')) gin_trgm_ops);
```

---

#### Migration 005 — Tags Tables

```sql
-- supabase/migrations/005_tags.sql

CREATE TABLE public.tags (
  id          SERIAL PRIMARY KEY,
  name        TEXT UNIQUE NOT NULL CHECK (char_length(name) <= 30),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.component_tags (
  component_id  UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  tag_id        INTEGER NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (component_id, tag_id)
);

CREATE INDEX idx_component_tags_tag ON public.component_tags(tag_id);
```

---

#### Migration 006 — Likes Table

```sql
-- supabase/migrations/006_likes.sql

CREATE TABLE public.likes (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  component_id  UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, component_id)
);

CREATE INDEX idx_likes_component ON public.likes(component_id);
CREATE INDEX idx_likes_user      ON public.likes(user_id);

-- Sync like_count on components table
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
```

---

#### Migration 007 — Bookmarks Table

```sql
-- supabase/migrations/007_bookmarks.sql

CREATE TABLE public.bookmarks (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  component_id  UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, component_id)
);

CREATE INDEX idx_bookmarks_user      ON public.bookmarks(user_id);
CREATE INDEX idx_bookmarks_component ON public.bookmarks(component_id);

-- Sync bookmark_count on components table
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
```

---

#### Migration 008 — Trending View

```sql
-- supabase/migrations/008_views.sql

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
```

---

#### Migration 009 — Row-Level Security (RLS) Policies

```sql
-- supabase/migrations/009_rls_policies.sql

-- Enable RLS on all application tables
ALTER TABLE public.users      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks  ENABLE ROW LEVEL SECURITY;

-- ---- users policies ----
CREATE POLICY "Public profiles viewable by everyone"
  ON public.users FOR SELECT USING (TRUE);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- ---- components policies ----
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

-- ---- likes policies ----
CREATE POLICY "Anyone can view likes"
  ON public.likes FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated users can insert likes"
  ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes"
  ON public.likes FOR DELETE USING (auth.uid() = user_id);

-- ---- bookmarks policies ----
CREATE POLICY "Users can only view their own bookmarks"
  ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert bookmarks"
  ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);
```

---

#### Migration 010 — Seed Categories

```sql
-- supabase/migrations/010_seed_categories.sql

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
```

### 3.3 Supabase Auth Configuration

In the Supabase Dashboard → **Authentication → Providers**:

```
GitHub OAuth:
  1. Go to GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
  2. Application name: ApexUI
  3. Homepage URL: http://localhost:3000 (update to prod URL later)
  4. Authorization callback URL: https://[your-project-ref].supabase.co/auth/v1/callback
  5. Copy Client ID and Client Secret back into Supabase Dashboard

Google OAuth:
  1. Go to Google Cloud Console → APIs & Services → Credentials → Create OAuth 2.0 Client
  2. Authorized redirect URI: https://[your-project-ref].supabase.co/auth/v1/callback
  3. Copy Client ID and Secret back into Supabase Dashboard

Site URL in Supabase Dashboard → Authentication → URL Configuration:
  Site URL: http://localhost:3000
  Redirect URLs (add all of these):
    http://localhost:3000/auth/callback
    https://apexui.dev/auth/callback
    https://[your-vercel-preview-url].vercel.app/auth/callback
```

### 3.4 Supabase Storage Configuration

In the Supabase Dashboard → **Storage → New Bucket**:

```
Bucket 1: avatars
  Public: YES
  File size limit: 2MB
  Allowed MIME types: image/jpeg, image/png, image/webp

Bucket 2: thumbnails
  Public: YES
  File size limit: 5MB
  Allowed MIME types: image/png, image/webp
```

### 3.5 Generate TypeScript Types from Supabase

After applying all migrations:

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Generate types
supabase gen types typescript --linked > src/types/database.types.ts
```

Re-run this command whenever the schema changes.

---

## 4. Design System & Styling Implementation

### 4.1 `tailwind.config.ts` — Jet Black Theme

Replace the default `tailwind.config.ts` with this full configuration:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Jet Black Color Palette ──────────────────────────────
      colors: {
        // Background hierarchy
        'bg-base':     '#09090B',   // Zinc-950 — page root
        'bg-surface':  '#18181B',   // Zinc-900 — cards, panels
        'bg-elevated': '#1C1C1F',   // Elevated dropdowns, tooltips
        'bg-overlay':  'rgba(24, 24, 27, 0.7)', // Glassmorphism overlay

        // Border hierarchy
        'border-default': '#27272A', // Zinc-800 — card borders
        'border-subtle':  '#1F1F23', // Zinc-900 — section separators
        'border-focus':   '#8B5CF6', // Violet — focus rings

        // Text hierarchy
        'text-primary':   '#FAFAFA', // Zinc-50 — headings
        'text-secondary': '#A1A1AA', // Zinc-400 — metadata
        'text-muted':     '#71717A', // Zinc-500 — timestamps
        'text-disabled':  '#3F3F46', // Zinc-700 — inactive

        // Accent colors
        'accent-violet':       '#8B5CF6', // Electric Violet — primary
        'accent-violet-hover': '#7C3AED', // Violet hover
        'accent-emerald':      '#10B981', // Emerald — success/copy
        'accent-amber':        '#F59E0B', // Amber — warning
        'accent-red':          '#EF4444', // Red — destructive
      },

      // ── Typography ───────────────────────────────────────────
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'Menlo', 'monospace'],
      },

      fontSize: {
        'display': ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.1', fontWeight: '800' }],
        'h1':      ['clamp(1.75rem, 3vw, 2.5rem)',  { lineHeight: '1.2', fontWeight: '700' }],
        'h2':      ['clamp(1.375rem, 2vw, 1.75rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'h3':      ['1rem',  { lineHeight: '1.4', fontWeight: '600' }],
        'body':    ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small':   ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
        'code':    ['0.8125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'label':   ['0.875rem',  { lineHeight: '1.0', fontWeight: '500' }],
      },

      // ── Border Radius ────────────────────────────────────────
      borderRadius: {
        'card':   '12px',
        'inner':  '8px',
        'pill':   '9999px',
        'glass':  '16px',
      },

      // ── Box Shadows ──────────────────────────────────────────
      boxShadow: {
        'card-hover': `
          0 4px 6px rgba(0, 0, 0, 0.4),
          0 10px 40px rgba(139, 92, 246, 0.12),
          0 0 0 1px rgba(139, 92, 246, 0.15)
        `,
        'glow-violet':  '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-violet-lg': '0 0 30px rgba(124, 58, 237, 0.5)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glow-amber':   '0 0 20px rgba(245, 158, 11, 0.35)',
        'glow-red':     '0 0 20px rgba(239, 68, 68, 0.35)',
        'glass':        '0 25px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      },

      // ── Transitions ──────────────────────────────────────────
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // ── Animations ───────────────────────────────────────────
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to:   { opacity: '0' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' },
          '50%':       { boxShadow: '0 0 30px rgba(139, 92, 246, 0.7)' },
        },
      },
      animation: {
        'fade-in':    'fade-in 0.2s ease forwards',
        'scale-in':   'scale-in 0.15s ease forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

> **Note:** Install `tailwindcss-animate` before running the dev server: `npm install tailwindcss-animate`

### 4.2 `src/app/globals.css` — Global Styles & CSS Variables

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── CSS Custom Properties (Design Tokens) ─────────────────── */
:root {
  /* Background */
  --color-bg-base:     #09090B;
  --color-bg-surface:  #18181B;
  --color-bg-elevated: #1C1C1F;

  /* Borders */
  --color-border-default: #27272A;
  --color-border-subtle:  #1F1F23;
  --color-border-focus:   #8B5CF6;

  /* Text */
  --color-text-primary:   #FAFAFA;
  --color-text-secondary: #A1A1AA;
  --color-text-muted:     #71717A;
  --color-text-disabled:  #3F3F46;

  /* Accents */
  --color-accent-violet:       #8B5CF6;
  --color-accent-violet-hover: #7C3AED;
  --color-accent-emerald:      #10B981;
  --color-accent-amber:        #F59E0B;
  --color-accent-red:          #EF4444;

  /* Code panel background */
  --color-code-bg: #111113;
}

/* ── Base Resets ────────────────────────────────────────────── */
@layer base {
  * {
    @apply border-border-default;
  }

  html {
    @apply scroll-smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: var(--color-bg-base);
    color: var(--color-text-primary);
    font-family: var(--font-inter), system-ui, sans-serif;
    @apply min-h-screen;
  }

  /* Scrollbar styling — Webkit browsers */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-bg-base);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-border-default);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-muted);
  }

  /* Focus ring — global */
  :focus-visible {
    outline: 2px solid var(--color-accent-violet);
    outline-offset: 2px;
  }
}

/* ── Reusable Component Classes ─────────────────────────────── */
@layer components {

  /* Component card */
  .component-card {
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border-default);
    border-radius: 12px;
    transition:
      transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 200ms ease,
      border-color 200ms ease;
  }

  .component-card:hover {
    transform: translateY(-4px);
    border-color: rgba(139, 92, 246, 0.5);
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.4),
      0 10px 40px rgba(139, 92, 246, 0.12),
      0 0 0 1px rgba(139, 92, 246, 0.15);
  }

  /* Hover-reveal action buttons on cards */
  .component-card .hover-actions {
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 150ms ease, transform 150ms ease;
  }

  .component-card:hover .hover-actions {
    opacity: 1;
    transform: translateY(0);
  }

  /* Glassmorphism surface */
  .glass-surface {
    background: rgba(24, 24, 27, 0.75);
    backdrop-filter: blur(16px) saturate(1.5);
    -webkit-backdrop-filter: blur(16px) saturate(1.5);
    border: 1px solid rgba(39, 39, 42, 0.8);
    border-radius: 16px;
    box-shadow:
      0 25px 50px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  /* Code panel */
  .code-panel {
    background: var(--color-code-bg);
    font-family: var(--font-jetbrains-mono), 'Menlo', monospace;
    font-size: 13px;
    line-height: 1.6;
    border-radius: 8px;
    overflow: auto;
  }

  /* Category badge chip */
  .category-chip {
    @apply inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-small font-medium
           bg-bg-surface border border-border-default text-text-secondary
           transition-all duration-150 cursor-pointer select-none;
  }

  .category-chip.active,
  .category-chip:hover {
    @apply bg-accent-violet/10 border-accent-violet/40 text-text-primary;
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.2);
  }

  /* Skip-to-content link (a11y) */
  .skip-link {
    @apply absolute -top-full left-4 z-[200] px-4 py-2 bg-accent-violet text-white rounded-md
           font-medium text-sm transition-all duration-150;
  }

  .skip-link:focus {
    @apply top-4;
  }
}
```

### 4.3 `src/app/layout.tsx` — Root Layout with Fonts

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/components/layout/Providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'ApexUI — Open-Source UI Component Library',
    template: '%s | ApexUI',
  },
  description:
    'Discover, preview, and copy beautiful, production-ready UI components. Community-driven. Free forever.',
  keywords: ['UI components', 'Tailwind CSS', 'React', 'open source', 'dark mode', 'design system'],
  openGraph: {
    title: 'ApexUI — Open-Source UI Component Library',
    description: 'Discover, preview, and copy beautiful UI components. Free forever.',
    url: 'https://apexui.dev',
    siteName: 'ApexUI',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexUI — Open-Source UI Component Library',
    description: 'Discover, preview, and copy beautiful UI components. Free forever.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://apexui.dev'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          {children}
        </Providers>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#18181B',
              color: '#FAFAFA',
              border: '1px solid #27272A',
              borderRadius: '8px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#10B981', secondary: '#FAFAFA' },
              duration: 2500,
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#FAFAFA' },
            },
          }}
        />
      </body>
    </html>
  )
}
```

---

## 5. Phase-by-Phase Task Breakdown

---

### Phase 1: Project Skeleton & Design System Foundation

**Goal:** A runnable Next.js app with the Jet Black design system fully applied, zero broken states.

#### 1.1 — Scaffold & Config

- [ ] Run `npx create-next-app@14 apexui --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` and confirm dev server starts at `localhost:3000`.
- [ ] Install all production dependencies listed in §1.2.
- [ ] Install `tailwindcss-animate` with `npm install tailwindcss-animate`.
- [ ] Replace `tailwind.config.ts` with the full Jet Black config from §4.1.
- [ ] Replace `src/app/globals.css` with the full styles from §4.2.
- [ ] Update `src/app/layout.tsx` with the root layout from §4.3.
- [ ] Create `.env.example` at the root with all variables from §1.3.
- [ ] Copy `.env.example` to `.env.local` and populate Supabase values.
- [ ] Verify `body` renders with `#09090B` background in the browser.

#### 1.2 — TypeScript Configuration

- [ ] Open `tsconfig.json` and confirm `"strict": true` is set.
- [ ] Confirm `@/*` path alias maps to `./src/*`.
- [ ] Create `src/types/` directory and add placeholder `index.ts` exporting nothing (to register the folder in the TypeScript project).

#### 1.3 — Prettier & ESLint

- [ ] Create `.prettierrc` at the project root:
  ```json
  {
    "semi": false,
    "singleQuote": true,
    "trailingComma": "es5",
    "tabWidth": 2,
    "plugins": ["prettier-plugin-tailwindcss"]
  }
  ```
- [ ] Add `.prettierignore` listing `node_modules`, `.next`, `src/types/database.types.ts`.
- [ ] Update `.eslintrc.json` to add `plugin:jsx-a11y/recommended` to the extends array.
- [ ] Run `npx eslint src --fix` and confirm no errors.

#### 1.4 — Supabase Clients

- [ ] Create `src/lib/supabase/client.ts`:
  ```typescript
  import { createBrowserClient } from '@supabase/ssr'
  import type { Database } from '@/types/database.types'

  export function createClient() {
    return createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  ```
- [ ] Create `src/lib/supabase/server.ts` using `createServerClient` from `@supabase/ssr` with cookies from `next/headers`. Follow the Supabase SSR docs for Next.js App Router.
- [ ] Create `src/middleware.ts` to refresh Supabase auth sessions on every request (session refresh middleware pattern from Supabase SSR docs).
- [ ] Verify middleware is listed in `matcher` to exclude `_next/static`, `_next/image`, `favicon.ico`.

#### 1.5 — Providers Component

- [ ] Create `src/components/layout/Providers.tsx` as a `'use client'` component wrapping children. Reserve this for adding Zustand providers, theme context, and other client-only providers in future phases.

#### 1.6 — Utility Helpers

- [ ] Create `src/lib/slug.ts` using `slugify` library: exported function `generateSlug(name: string): string` that produces URL-safe lowercase slugs.
- [ ] Create `src/lib/clipboard.ts` with function `copyToClipboard(text: string): Promise<boolean>` — uses `navigator.clipboard.writeText()` with `document.execCommand('copy')` textarea fallback.

#### 1.7 — Verify Phase 1

- [ ] Run `npm run dev` — no TypeScript errors, no ESLint errors.
- [ ] Open browser. Confirm background is `#09090B`.
- [ ] Confirm Inter font is loading (check Network tab in DevTools).

---

### Phase 2: Database Schema & Supabase Integration

**Goal:** Full database schema deployed to Supabase, TypeScript types generated, Supabase clients verified.

#### 2.1 — Apply Migrations

- [ ] Open Supabase Dashboard → SQL Editor.
- [ ] Apply `001_extensions.sql`. Verify no errors.
- [ ] Apply `002_users.sql`. Verify table and trigger created.
- [ ] Apply `003_categories.sql`. Verify table created.
- [ ] Apply `004_components.sql`. Verify table, ENUM types, indexes, and trigger created.
- [ ] Apply `005_tags.sql`. Verify both `tags` and `component_tags` tables created.
- [ ] Apply `006_likes.sql`. Verify table, indexes, and trigger created.
- [ ] Apply `007_bookmarks.sql`. Verify table, indexes, and trigger created.
- [ ] Apply `008_views.sql`. Verify `trending_components` view created.
- [ ] Apply `009_rls_policies.sql`. Verify all RLS policies created for all four tables.
- [ ] Apply `010_seed_categories.sql`. Verify 12 rows inserted into `categories`.

#### 2.2 — Verify Database

- [ ] In Supabase Table Editor: confirm all six tables (`users`, `categories`, `components`, `tags`, `component_tags`, `likes`, `bookmarks`) are visible.
- [ ] In Supabase Table Editor → `categories`: confirm 12 seeded rows are present.
- [ ] Manually test RLS: try to INSERT into `components` without auth — confirm it is rejected.

#### 2.3 — Generate TypeScript Types

- [ ] Run `supabase gen types typescript --linked > src/types/database.types.ts`.
- [ ] Open `database.types.ts` and confirm all tables and ENUM types are present.
- [ ] Do **not** manually edit `database.types.ts` — it is auto-generated.

#### 2.4 — Define Domain Types

- [ ] Create `src/types/component.types.ts`:
  ```typescript
  import type { Database } from './database.types'

  export type ComponentRow = Database['public']['Tables']['components']['Row']
  export type ComponentInsert = Database['public']['Tables']['components']['Insert']
  export type ComponentUpdate = Database['public']['Tables']['components']['Update']
  export type ComponentTech = Database['public']['Enums']['component_tech']
  export type ComponentStatus = Database['public']['Enums']['component_status']

  // Component with joined creator and category data
  export interface ComponentWithMeta extends ComponentRow {
    creator: {
      username: string
      display_name: string
      avatar_url: string | null
    } | null
    category: {
      name: string
      slug: string
      icon: string | null
    }
    tags: string[]
    is_liked?: boolean
    is_bookmarked?: boolean
  }
  ```
- [ ] Create `src/types/user.types.ts` with `UserRow`, `UserUpdate`, `CreatorProfile` (user + component stats).
- [ ] Create `src/types/api.types.ts` with standardized API response wrapper:
  ```typescript
  export interface ApiResponse<T> {
    data: T | null
    error: string | null
  }
  ```

#### 2.5 — Seed Initial Components

- [ ] Manually insert 10–15 seed components via the Supabase SQL Editor or Table Editor.
  - Ensure at least 3–4 categories are represented.
  - Set `status = 'published'` on all seed components.
  - Populate `preview_html`, `code_html`, `code_tailwind`, `code_react` where applicable.
  - Use a real (seed) `creator_id` — insert a test user row first.
- [ ] Confirm rows are visible via `SELECT * FROM components WHERE status = 'published'`.

#### 2.6 — Verify Phase 2

- [ ] Run a test query from the app: create a temporary test page (`app/test/page.tsx`) that fetches from `components` using the server Supabase client and `console.log`s results.
- [ ] Confirm data appears in terminal (SSR fetch).
- [ ] Delete the test page after verification.

---

### Phase 3: Core UI Components & Jet Black Shell

**Goal:** Navbar, Hero, Footer, CategoryFilterStrip, ComponentGrid, ComponentCard with correct Jet Black styling.

#### 3.1 — Navbar

- [ ] Create `src/components/layout/Navbar.tsx` as a server component.
- [ ] Navbar renders:
  - Left: `ApexUI` logotype (text or SVG logo) linking to `/`.
  - Center: Category quick links (hidden on mobile, collapsed to hamburger via `Sheet` on mobile).
  - Right: `Ctrl+K` search trigger button, `Sign In` button (shows `Avatar` when authenticated), `Submit a Component` CTA button (violet, primary style).
- [ ] Import and render `Navbar` in `src/app/layout.tsx` above `{children}`.
- [ ] Style the navbar: `position: sticky; top: 0; z-index: 50; background: rgba(9, 9, 11, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid #27272A`.
- [ ] Add `aria-label="Main navigation"` to the `<nav>` element.

#### 3.2 — Footer

- [ ] Create `src/components/layout/Footer.tsx`.
- [ ] Footer contains: Copyright notice, GitHub repo link, links to `About`, `Submit`, `API docs`.
- [ ] Style: `border-top: 1px solid #27272A; background: #09090B; color: #71717A`.
- [ ] Import and render `Footer` in `src/app/layout.tsx` below `{children}`.

#### 3.3 — Hero Section

- [ ] Create `src/components/home/HeroSection.tsx` as a server component.
- [ ] Hero content:
  - Headline: `"Beautiful UI Components,\nFree Forever."` — `text-display font-extrabold text-zinc-50`.
  - Subheadline: `text-body text-zinc-400`, max 2 lines.
  - Component count badge: `{count}+ Components` — fetched server-side via ISR.
  - Two CTAs: `Browse Components` (scrolls to grid) and `Submit a Component` (links to `/submit`).
  - Subtle grid/dot background pattern via `backgrounds` gradient (`radial-gradient` + `bg-[length:30px_30px]`).
- [ ] Fetch real component count on the server using Supabase server client: `supabase.from('components').select('id', { count: 'exact', head: true }).eq('status', 'published')`.

#### 3.4 — Category Filter Strip

- [ ] Create `src/components/home/CategoryFilterStrip.tsx` as a `'use client'` component.
- [ ] Fetch categories from Supabase (can be static since categories don't change often — fetch at build time and pass as prop from parent server component).
- [ ] Render horizontally scrollable row of `.category-chip` buttons: `All` + one per category.
- [ ] On chip click, update URL query param `?category=<slug>` using `useRouter` + `useSearchParams`.
- [ ] Active chip applies `.category-chip.active` styles (violet glow).
- [ ] Hide scrollbar on mobile (`scrollbar-hide` utility — add it to Tailwind config or use `overflow-x: auto; scrollbar-width: none`).
- [ ] Render Lucide icon from each category's `icon` field.

#### 3.5 — ComponentCard

- [ ] Create `src/components/component-card/ComponentCard.tsx` as a `'use client'` component (needs `useState` for hover state on mobile).
- [ ] Card accepts `ComponentWithMeta` prop.
- [ ] Card renders:
  - `<article aria-label="Component: {name}">` wrapper.
  - Live iframe preview area (placeholder in Phase 3 — full implementation in Phase 4).
  - Category badge chip (bottom-left of preview).
  - Like count with heart icon (bottom-right of preview).
  - Component name (`h3`, `text-zinc-50`).
  - Creator avatar + username (`text-zinc-400`, linked to `/creators/{username}`).
  - `.hover-actions` row: `Copy Code` dropdown button and `Bookmark` icon button.
- [ ] Apply `.component-card` class with all hover styles from `globals.css`.
- [ ] Create `src/components/component-card/ComponentCardSkeleton.tsx` — same dimensions but with `animate-pulse` gray placeholder blocks. Used during loading states.

#### 3.6 — Sort Controls

- [ ] Create `src/components/home/SortControls.tsx` as a `'use client'` component.
- [ ] Renders a segmented control / button group: `Trending | Latest | Most Liked | Most Bookmarked`.
- [ ] Active sort button is highlighted with violet underline / background.
- [ ] On change, updates URL param `?sort=trending|latest|liked|bookmarked`.

#### 3.7 — ComponentGrid

- [ ] Create `src/components/home/ComponentGrid.tsx` as a `'use client'` component.
- [ ] Reads `?category` and `?sort` from `useSearchParams`.
- [ ] Initial render: displays 12 `ComponentCardSkeleton` placeholders while fetching.
- [ ] On data load: replaces skeletons with `ComponentCard` components.
- [ ] CSS Grid layout: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`.
- [ ] Infinite scroll: uses `IntersectionObserver` on a sentinel `div` at the bottom of the grid. When sentinel enters viewport, fetches next page of 12 components and appends to the list.
- [ ] On category or sort change: resets to page 1 and replaces the entire grid.

#### 3.8 — Homepage Assembly

- [ ] Update `src/app/page.tsx`:
  - Export `revalidate = 3600` (ISR — regenerate every hour for component count).
  - Fetch initial component data server-side (first 12 `published` components, sorted by trending).
  - Pass initial data to `ComponentGrid` as a prop to enable hydration without a loading flash.
  - Render: `<HeroSection />`, `<CategoryFilterStrip />`, `<SortControls />`, `<ComponentGrid />`.
  - `<main id="main-content">` wraps everything below the navbar.

#### 3.9 — Verify Phase 3

- [ ] Homepage renders Navbar + Hero + CategoryFilterStrip + ComponentGrid + Footer.
- [ ] Background is `#09090B`, cards are `#18181B`.
- [ ] Category chips scroll horizontally on a 375px viewport.
- [ ] Sort controls are visible and update the URL when clicked.
- [ ] No TypeScript errors: `npx tsc --noEmit`.

---

### Phase 4: Component Sandbox & Preview Rendering System

**Goal:** Live, safe, isolated iframe previews of all three component types (HTML/CSS, Tailwind, React/JSX).

#### 4.1 — Sanitization Utility

- [ ] Create `src/lib/sanitize.ts`:
  ```typescript
  // Works in both Node.js (server) and browser environments
  import createDOMPurify from 'isomorphic-dompurify'

  const DOMPurify = createDOMPurify()

  // Sanitize for safe storage (strict — strip all JS event handlers)
  export function sanitizeForStorage(html: string): string {
    return DOMPurify.sanitize(html, {
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
      FORBID_TAGS: ['script'],
      ALLOW_DATA_ATTR: false,
    })
  }

  // Sanitize for preview injection (allows style tags and inline styles)
  export function sanitizeForPreview(html: string): string {
    return DOMPurify.sanitize(html, {
      FORCE_BODY: true,
      ADD_TAGS: ['style'],
      ADD_ATTR: ['class', 'style', 'id'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick'],
    })
  }
  ```
- [ ] Write a unit test in `__tests__/sanitize.test.ts` confirming that `<script>alert('xss')</script>` is stripped.

#### 4.2 — Preview HTML Builder

- [ ] Create `src/lib/preview-builder.ts` with three exported functions:

  ```typescript
  export function buildHtmlCssPreview(html: string): string
  // Wraps html in a minimal HTML document with dark background #0D0D10 and centers the component.

  export function buildTailwindPreview(html: string): string
  // Same as above but also injects <script src="https://cdn.tailwindcss.com"></script> before </head>.

  export function buildReactPreview(jsxCode: string): string
  // Injects React + ReactDOM UMD CDN scripts + Babel standalone CDN.
  // Wraps jsxCode in a <script type="text/babel"> block.
  // Renders to <div id="root"> using ReactDOM.render or createRoot.
  ```

- [ ] Each builder includes a `<meta name="viewport" content="width=device-width, initial-scale=1">` tag.
- [ ] Each builder sets `body { margin: 0; padding: 1rem; background: #0D0D10; display: flex; align-items: center; justify-content: center; min-height: 100vh; }`.

#### 4.3 — ComponentPreview Component

- [ ] Create `src/components/preview/ComponentPreview.tsx` as a `'use client'` component.
- [ ] Props: `{ previewHtml: string; title: string; minHeight?: number }`.
- [ ] Renders `<iframe>` with:
  - `srcdoc={previewHtml}` (already sanitized string).
  - `sandbox="allow-scripts"` (no `allow-same-origin` to prevent DOM access to parent).
  - `title={\`Live preview of \${title}\`}` (accessibility).
  - `loading="lazy"`.
  - `style={{ border: 'none', width: '100%', minHeight: `${minHeight ?? 200}px`, borderRadius: '8px', background: '#0D0D10' }}`.
- [ ] Add `onError` handler: catch iframe load errors via `postMessage` or iframe `onError` event and display `PreviewErrorBoundary` fallback.
- [ ] Wrap the iframe in a div with `overflow: hidden; border-radius: 8px`.

#### 4.4 — Preview Error Boundary

- [ ] Create `src/components/preview/PreviewErrorBoundary.tsx`.
- [ ] Renders a centered `⚠ Preview unavailable` message with a ghost `View Code` button.
- [ ] Background: `#0D0D10`, text: `#71717A`.

#### 4.5 — Preview Width Controls

- [ ] Create `src/components/preview/PreviewWidthControls.tsx` as a `'use client'` component.
- [ ] Renders three icon buttons: Mobile (375px), Tablet (768px), Desktop (100%).
- [ ] Controls a state value `previewWidth` passed down to resize the iframe wrapper `max-width`.
- [ ] Uses Lucide icons: `Smartphone`, `Tablet`, `Monitor`.

#### 4.6 — Integrate Preview into ComponentCard

- [ ] Update `ComponentCard.tsx` to render `<ComponentPreview>` in the preview area slot.
- [ ] Pass `previewHtml` from the component row.
- [ ] Set `minHeight={160}` for card previews.
- [ ] Use `loading="lazy"` — only render the iframe when the card enters the viewport (add IntersectionObserver around the card or use the native `loading="lazy"` attribute).

#### 4.7 — Component Detail Page

- [ ] Create `src/app/components/[slug]/page.tsx` as a server component.
- [ ] Fetch component data server-side using slug param: `supabase.from('components').select('*, users(*), categories(*)').eq('slug', params.slug).eq('status', 'published').single()`.
- [ ] If no result, call `notFound()`.
- [ ] Generate page metadata using `generateMetadata` export.
- [ ] Page layout:
  - **Left/Main (60%):** Large `<ComponentPreview>` (min-height 400px) + `<PreviewWidthControls>`.
  - **Right (40%):** `<CodePanel>` with tabs (HTML / Tailwind / React).
  - Below both panels: Creator credit block + Related components grid (max 4 cards, same category).
- [ ] Add `export const revalidate = 60` (ISR — revalidate detail page every 60s for like/bookmark counts).
- [ ] Increment view count: fire a `fetch` to `/api/components/{id}/view` from a client component on page mount (use a `useEffect` wrapper component to avoid server component limitations).

#### 4.8 — Code Panel

- [ ] Create `src/components/code-panel/CodePanel.tsx` as a `'use client'` component.
- [ ] Props: `{ codeHtml?: string; codeTailwind?: string; codeReact?: string }`.
- [ ] Uses Radix UI `Tabs` (or shadcn `Tabs`) with tabs: `HTML`, `Tailwind`, `React`.
- [ ] Only renders tabs for which code content exists (non-null).
- [ ] Each tab content shows `<CodeBlock>` component with the code string.
- [ ] `<CopyButton>` in the tab panel header copies the active tab's code.

#### 4.9 — Code Block

- [ ] Create `src/components/code-panel/CodeBlock.tsx`.
- [ ] Uses CodeMirror 6 in read-only mode with the One Dark theme.
- [ ] `extensions` array: appropriate language extension based on tab (`html()`, `javascript()`, `css()`).
- [ ] Set `editable: false`, `lineNumbers: true`.
- [ ] Wraps in a `div.code-panel` for styling.
- [ ] Minimum font size: 13px.

#### 4.10 — Copy Button

- [ ] Create `src/components/code-panel/CopyButton.tsx` as a `'use client'` component.
- [ ] Calls `copyToClipboard(code)` from `src/lib/clipboard.ts`.
- [ ] Shows `<Check />` icon and `"Copied!"` text for 2 seconds after success (local `useState`).
- [ ] On success, also fires `react-hot-toast.success('{format} code copied!')`.
- [ ] On failure, fires `toast.error(...)` and attempts textarea fallback.
- [ ] Always visible on mobile (not just on hover), transitions from `Copy` → `✓ Copied!` with emerald color shift.

#### 4.11 — View Count API Route

- [ ] Create `src/app/api/components/[id]/view/route.ts` (POST handler).
- [ ] Uses server Supabase client with service role to call `rpc('increment_view_count', { component_id: id })` — or direct UPDATE.
- [ ] Deduplicate views: check a 24-hour cookie `viewed_{id}` before incrementing. If cookie exists, return 204 without incrementing.
- [ ] Set the cookie on first view with `maxAge: 86400`.

#### 4.12 — Verify Phase 4

- [ ] Component cards show live iframe previews for HTML/CSS and Tailwind components.
- [ ] React/JSX components render correctly in the iframe (Babel transpilation working).
- [ ] `<script>alert('xss')</script>` injected into preview HTML is stripped and does not execute.
- [ ] Detail page loads, preview is visible, code tabs switch correctly.
- [ ] Copy button copies code to clipboard and shows toast confirmation.

---

### Phase 5: Search, Filter & One-Click Copy System

**Goal:** Global Ctrl+K command palette with debounced Postgres search; category + sort filtering; fully functional one-click copy.

#### 5.1 — Search API Route

- [ ] Create `src/app/api/search/route.ts` (GET handler).
- [ ] Accepts query param `q` (search term) and optional `category` param.
- [ ] Uses Supabase server client with `pg_trgm` search:
  ```sql
  SELECT * FROM components
  WHERE status = 'published'
    AND (name || ' ' || description_short) % $1  -- trigram similarity
    AND ($2::TEXT IS NULL OR category_id = $2::INTEGER)
  ORDER BY similarity(name, $1) DESC
  LIMIT 20;
  ```
- [ ] Alternatively use Supabase's `.textSearch()` method or `.ilike()` with `%{q}%`.
- [ ] Returns `ApiResponse<ComponentWithMeta[]>`.
- [ ] Apply rate limiting: max 30 search requests per IP per 60 seconds (implemented in Phase 9 — leave a `// TODO: rate limit` comment for now).

#### 5.2 — Search Store

- [ ] Create `src/store/searchStore.ts` using Zustand:
  ```typescript
  interface SearchStore {
    isOpen: boolean
    query: string
    results: ComponentWithMeta[]
    isLoading: boolean
    recentSearches: string[]
    openPalette: () => void
    closePalette: () => void
    setQuery: (q: string) => void
    setResults: (r: ComponentWithMeta[]) => void
    setLoading: (v: boolean) => void
    addRecentSearch: (q: string) => void
  }
  ```
- [ ] `recentSearches` is persisted to `localStorage` using Zustand's `persist` middleware (note: localStorage is only in browser — add `typeof window !== 'undefined'` guard).

#### 5.3 — Search Hook

- [ ] Create `src/hooks/useSearch.ts`.
- [ ] Debounces the query by 300ms before firing the API call.
- [ ] On query change (after debounce), fetches `/api/search?q={query}`.
- [ ] Updates `searchStore.results` and `searchStore.isLoading`.
- [ ] On empty query, clears results and shows recent searches.

#### 5.4 — Command Palette Component

- [ ] Create `src/components/search/CommandPalette.tsx` as a `'use client'` component.
- [ ] Built on `@radix-ui/react-dialog` (or shadcn `Dialog`) for focus trapping and `Esc` dismissal.
- [ ] Uses `.glass-surface` class.
- [ ] Contains a search `<input>` with a magnifying glass icon.
- [ ] Below the input: shows recent searches (when query is empty) OR search results grouped by category.
- [ ] Each result row shows: category icon, component name, creator username, like count.
- [ ] Keyboard navigation: `↑`/`↓` to move through results, `Enter` to navigate to `/components/{slug}`.
- [ ] "No results" state: message + suggestions of popular categories.
- [ ] Mount globally in `src/app/layout.tsx` inside `<Providers>`.

#### 5.5 — Global Keyboard Listener

- [ ] In `src/components/search/CommandPalette.tsx` (or in `Providers.tsx`), add a `useEffect` that listens for `keydown` events:
  ```typescript
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        searchStore.openPalette()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])
  ```
- [ ] Verify command palette opens within 50ms of `Ctrl+K` keypress.

#### 5.6 — Filter Store

- [ ] Create `src/store/filterStore.ts` using Zustand:
  ```typescript
  interface FilterStore {
    activeCategory: string | null   // category slug or null = all
    activeSortField: 'trending' | 'latest' | 'liked' | 'bookmarked'
    setCategory: (slug: string | null) => void
    setSort: (field: 'trending' | 'latest' | 'liked' | 'bookmarked') => void
  }
  ```
- [ ] `CategoryFilterStrip` and `SortControls` read from and write to this store.
- [ ] `ComponentGrid` reads from this store to fire filtered API calls.

#### 5.7 — Component List API Route

- [ ] Create `src/app/api/components/route.ts` (GET handler).
- [ ] Accepts query params: `category`, `sort`, `page` (default 1), `limit` (default 12).
- [ ] Sort logic:
  - `trending` → `ORDER BY trending_score DESC` (via `trending_components` view).
  - `latest`   → `ORDER BY created_at DESC`.
  - `liked`    → `ORDER BY like_count DESC`.
  - `bookmarked` → `ORDER BY bookmark_count DESC`.
- [ ] Returns paginated `ComponentWithMeta[]` + `totalCount` for infinite scroll.

#### 5.8 — Verify Phase 5

- [ ] Pressing `Ctrl+K` opens the command palette.
- [ ] Typing in the palette fires search 300ms after the last keystroke.
- [ ] Results appear, are keyboard-navigable, and navigate correctly on `Enter`.
- [ ] Pressing `Esc` closes the palette.
- [ ] Clicking a category chip filters the grid.
- [ ] Changing sort reloads the grid in the correct order.
- [ ] Copy button works on both cards and the detail page.

---

### Phase 6: Auth System & Creator Profile Dashboard

**Goal:** GitHub + Google OAuth, auto-profile creation, creator public profile, private dashboard.

#### 6.1 — Auth Callback Route

- [ ] Create `src/app/auth/callback/route.ts`:
  ```typescript
  // Handles Supabase OAuth code exchange
  import { createServerClient } from '@supabase/ssr'
  import { NextResponse } from 'next/server'
  import { cookies } from 'next/headers'

  export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    if (code) {
      const supabase = createServerClient(/* ... */)
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
    return NextResponse.redirect(`${origin}/auth/error`)
  }
  ```

#### 6.2 — Auto-Profile Creation (Database Trigger)

- [ ] In Supabase SQL Editor, create a trigger on `auth.users` that automatically inserts a row into `public.users` on new sign-up:
  ```sql
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.users (id, username, display_name, avatar_url)
    VALUES (
      NEW.id,
      -- Derive username from email or GitHub login
      COALESCE(
        NEW.raw_user_meta_data->>'user_name',
        split_part(NEW.email, '@', 1)
      ),
      COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        split_part(NEW.email, '@', 1)
      ),
      NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  ```
- [ ] Add this as `supabase/migrations/011_auth_trigger.sql`.
- [ ] Apply via SQL Editor.

#### 6.3 — Auth Store

- [ ] Create `src/store/authStore.ts` with Zustand. Stores current user session data client-side.
- [ ] Sync with Supabase `onAuthStateChange` in a `useEffect` inside `Providers.tsx`.

#### 6.4 — useAuth Hook

- [ ] Create `src/hooks/useAuth.ts` returning `{ user, session, isLoading, signInWithGitHub, signInWithGoogle, signOut }`.
- [ ] `signInWithGitHub()` calls `supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: ${origin}/auth/callback } })`.
- [ ] `signInWithGoogle()` same pattern with `provider: 'google'`.

#### 6.5 — Auth Modal

- [ ] Create `src/components/auth/AuthModal.tsx` as a `'use client'` component using shadcn `Dialog`.
- [ ] Two buttons: "Continue with GitHub" (GitHub icon, outline style) and "Continue with Google" (Google icon, outline style).
- [ ] Modal is triggered by: clicking "Sign In" in Navbar, or any protected action (Like, Bookmark, Submit).
- [ ] Uses `.glass-surface` class for the modal content panel.
- [ ] After OAuth redirect, the modal auto-closes.

#### 6.6 — Middleware Auth Guard

- [ ] Update `src/middleware.ts` to protect routes `/dashboard/*`, `/submit`, `/admin/*`.
- [ ] If unauthenticated user accesses these routes, redirect to `/?auth=required` (which opens the auth modal via query param).

#### 6.7 — Creator Profile Page

- [ ] Create `src/app/creators/[username]/page.tsx` as a server component.
- [ ] Fetch creator data: `users` row + all published components by creator (sorted by like_count DESC).
- [ ] If no user found, call `notFound()`.
- [ ] Page renders:
  - Avatar (Radix `Avatar` with fallback initials).
  - Display name, `@username`, role tag badge.
  - Bio text.
  - Social links: GitHub, Twitter/X, Website (icon buttons).
  - Stats row: `{totalComponents} Components · {totalLikes} Likes · {totalBookmarks} Bookmarks`.
  - Grid of published components (same `ComponentCard` layout).
- [ ] Generate `metadata` with creator name and bio for SEO.
- [ ] `export const revalidate = 3600` (ISR).

#### 6.8 — Dashboard Layout

- [ ] Create `src/app/dashboard/layout.tsx` — server component that checks auth server-side. If no session, redirect to `/`.
- [ ] Renders a sidebar with tabs: "My Components", "Bookmarks", "Account Settings".

#### 6.9 — Dashboard: My Components Tab

- [ ] `src/app/dashboard/page.tsx` — fetches all components by current user (all statuses).
- [ ] Renders a `DashboardComponentRow` for each: component name, category, status badge, like/view/bookmark counts, Edit/Delete actions.
- [ ] Status badge colors: `published` → emerald, `pending_review` → amber, `rejected` → red, `draft` → zinc.

#### 6.10 — Dashboard: Bookmarks Tab

- [ ] `src/app/dashboard/bookmarks/page.tsx` — fetches all bookmarks for current user with joined component data.
- [ ] Renders same `ComponentCard` grid as homepage.

#### 6.11 — Dashboard: Account Settings Tab

- [ ] `src/app/dashboard/settings/page.tsx` — form with fields for display_name, bio, role_tag, website_url, github_url, twitter_url.
- [ ] On submit, PATCH to `/api/users/me` route.
- [ ] Avatar upload section: `<AvatarUploader>` component — file input (JPEG/PNG/WEBP, max 2MB), uploads to Supabase Storage bucket `avatars`, updates `avatar_url` in `users` table.

#### 6.12 — Profile Avatar Upload API

- [ ] Create `src/app/api/upload/avatar/route.ts` (POST handler, server only).
- [ ] Validates file type and size server-side.
- [ ] Uses service role client to upload to Supabase Storage.
- [ ] Returns the public URL.
- [ ] Updates the `avatar_url` column in `users`.

#### 6.13 — Verify Phase 6

- [ ] Click "Sign In" in Navbar → Auth modal opens.
- [ ] Click "Continue with GitHub" → redirected to GitHub → back to app, signed in.
- [ ] Auto-profile created in `users` table (verify in Supabase Dashboard).
- [ ] Navigate to `/creators/{username}` — profile page loads.
- [ ] Navigate to `/dashboard` — dashboard loads with tabs.
- [ ] Navigate to `/submit` without auth → redirected to auth modal.

---

### Phase 7: Community Submission Workflow

**Goal:** Three-step submission wizard (Metadata → Live Editor → Review), server-side sanitization, moderation queue, email notifications.

#### 7.1 — Submission Wizard Controller

- [ ] Create `src/components/submission/SubmissionWizard.tsx` as a `'use client'` component.
- [ ] Manages a `step: 1 | 2 | 3` state.
- [ ] Manages a `formData` state object typed as `SubmissionFormData` (defined in `api.types.ts`):
  ```typescript
  interface SubmissionFormData {
    name: string
    description_short: string
    description_long: string
    category_id: number
    tags: string[]
    tech: ComponentTech
    code: string
    agreedToTerms: boolean
  }
  ```
- [ ] Renders `<StepMetadata>`, `<StepCodeEditor>`, or `<StepReview>` based on `step`.
- [ ] Progress indicator at top: `Step 1 of 3 — Component Details`.

#### 7.2 — Step 1: Metadata Form

- [ ] Create `src/components/submission/StepMetadata.tsx`.
- [ ] Fields (with validation):
  - `name`: text input, required, 2–60 chars.
  - `description_short`: text input, required, max 200 chars (live char count).
  - `description_long`: textarea, optional, max 2000 chars, with note "Markdown supported".
  - `category_id`: shadcn `Select`, required, populated from categories fetched from API.
  - `tags`: multi-select with tag autocomplete, max 5 tags, max 20 chars each.
  - `tech`: radio button group: `HTML + CSS`, `Tailwind CSS`, `React / JSX`.
- [ ] Client-side validation before allowing Next button.
- [ ] "Next →" button advances to Step 2.

#### 7.3 — Step 2: Code Editor & Live Preview

- [ ] Create `src/components/submission/StepCodeEditor.tsx` as a `'use client'` component.
- [ ] Split-pane layout (50/50 on desktop, stacked on mobile):
  - **Left pane:** CodeMirror 6 editor with syntax highlighting matching `tech` selection.
  - **Right pane:** Live sandboxed `<ComponentPreview>` that updates 500ms after the user stops typing.
- [ ] CodeMirror config: `minHeight: '400px'`, One Dark theme, `lineNumbers: true`.
- [ ] Preview pane has a "Dark / Light Background" toggle that switches the preview's body background between `#0D0D10` and `#FFFFFF`.
- [ ] Character count indicator: `{chars} / 10,000 chars (soft limit)`. Warn at 10k, hard block at 50k.
- [ ] "← Back" and "Next →" buttons.

#### 7.4 — Step 3: Review & Submit

- [ ] Create `src/components/submission/StepReview.tsx`.
- [ ] Summary card showing all metadata.
- [ ] Final read-only `<ComponentPreview>` of the submitted component.
- [ ] Terms checkbox: `"I confirm this is my original work and I am licensing it under the MIT License."` — required before submit button is enabled.
- [ ] `Submit for Review` button (primary violet, full width).
- [ ] On click: POST to `/api/components` with full form data.

#### 7.5 — Submission API Route

- [ ] Create `src/app/api/components/route.ts` (POST handler — add to existing GET handler file).
- [ ] Require authentication (check session via server Supabase client).
- [ ] Validate all fields server-side (duplicate validation from client).
- [ ] Sanitize `code` via `sanitizeForStorage()`.
- [ ] Build `preview_html` via `buildTailwindPreview()`, `buildHtmlCssPreview()`, or `buildReactPreview()` based on `tech`.
- [ ] Sanitize `preview_html` via `sanitizeForPreview()`.
- [ ] Generate `slug` via `generateSlug(name)` + uniqueness check (append random suffix if slug exists).
- [ ] Insert into `components` table with `status: 'pending_review'`.
- [ ] Insert tags: upsert into `tags`, then insert into `component_tags`.
- [ ] Trigger email notification (see §7.6).
- [ ] Return `{ data: { slug }, error: null }`.

#### 7.6 — Email Notifications

- [ ] Create `src/lib/email.ts` using Resend SDK:
  ```typescript
  import { Resend } from 'resend'
  const resend = new Resend(process.env.RESEND_API_KEY)

  export async function sendSubmissionConfirmation(to: string, componentName: string) { ... }
  export async function sendApprovalNotification(to: string, componentName: string, slug: string) { ... }
  export async function sendRejectionNotification(to: string, componentName: string, reason: string) { ... }
  ```
- [ ] Email templates use inline HTML. Jet Black theme where practical.
- [ ] Call `sendSubmissionConfirmation` from the POST `/api/components` route.

#### 7.7 — Admin Moderation Queue

- [ ] Create `src/app/admin/layout.tsx` — server component that verifies `is_admin = true` via server Supabase client. Redirects to `/` if not admin.
- [ ] Create `src/app/admin/page.tsx`:
  - Fetches all `status = 'pending_review'` components, ordered by `created_at ASC` (oldest first).
  - Renders each in a `<ModerationCard>` component.
- [ ] Create `src/components/admin/ModerationCard.tsx`:
  - Component name, creator, category, submission date.
  - `<ComponentPreview>` of the submitted component.
  - `<CodePanel>` with submitted code.
  - Action buttons: `Approve` (emerald) and `Reject` (red with rejection reason textarea).
- [ ] Create `src/app/api/admin/components/[id]/approve/route.ts` (POST):
  - Verify admin session.
  - Update `status = 'published'`, set `reviewed_by` and `reviewed_at`.
  - Send approval email to creator.
- [ ] Create `src/app/api/admin/components/[id]/reject/route.ts` (POST):
  - Verify admin session.
  - Update `status = 'rejected'`, set `rejection_reason`.
  - Send rejection email to creator.

#### 7.8 — Submit Page

- [ ] Create `src/app/submit/page.tsx`:
  - Requires auth (handled by middleware).
  - Fetches categories server-side and passes to wizard.
  - Renders `<SubmissionWizard>`.

#### 7.9 — Verify Phase 7

- [ ] Sign in as a test user and navigate to `/submit`.
- [ ] Complete all 3 steps and submit a component.
- [ ] Verify `pending_review` component appears in Supabase `components` table.
- [ ] Verify confirmation email is sent (check Resend logs).
- [ ] Sign in as admin user, navigate to `/admin`.
- [ ] Approve the test component. Verify it switches to `published`.
- [ ] Verify approved component appears in the public gallery.
- [ ] Verify approval email is sent.

---

### Phase 8: Engagement Features (Upvoting, Bookmarking, Sorting)

**Goal:** Optimistic like/bookmark UI, correct counts, sort by trending/liked/bookmarked, all protected by auth.

#### 8.1 — Like API Routes

- [ ] Create `src/app/api/likes/route.ts`:
  - **POST:** Require auth. Insert into `likes (user_id, component_id)`. The DB trigger automatically increments `like_count`. Return `{ data: { liked: true }, error: null }`. On UNIQUE constraint violation (already liked), return 409.
  - **DELETE:** Require auth. Delete from `likes WHERE user_id = auth_uid AND component_id = :id`. Return `{ data: { liked: false }, error: null }`.

#### 8.2 — Bookmark API Routes

- [ ] Create `src/app/api/bookmarks/route.ts` with same POST/DELETE pattern as likes.

#### 8.3 — useLike Hook

- [ ] Create `src/hooks/useLike.ts`:
  ```typescript
  export function useLike(componentId: string, initialLiked: boolean, initialCount: number) {
    const [isLiked, setIsLiked] = useState(initialLiked)
    const [count, setCount] = useState(initialCount)
    const { user } = useAuth()

    async function toggleLike() {
      if (!user) { /* open auth modal */ return }
      // Optimistic update
      setIsLiked(prev => !prev)
      setCount(prev => isLiked ? prev - 1 : prev + 1)
      // API call
      const res = await fetch('/api/likes', {
        method: isLiked ? 'DELETE' : 'POST',
        body: JSON.stringify({ component_id: componentId }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        // Revert optimistic update on failure
        setIsLiked(prev => !prev)
        setCount(prev => isLiked ? prev + 1 : prev - 1)
      }
    }

    return { isLiked, count, toggleLike }
  }
  ```

#### 8.4 — LikeButton Component

- [ ] Create `src/components/engagement/LikeButton.tsx` as a `'use client'` component.
- [ ] Renders heart icon + count. Heart fills on `isLiked = true`.
- [ ] Uses `useLike` hook for optimistic updates.
- [ ] `aria-pressed={isLiked}` for accessibility.
- [ ] `aria-label={isLiked ? 'Unlike this component' : 'Like this component'}`.

#### 8.5 — useBookmark Hook

- [ ] Create `src/hooks/useBookmark.ts` — same pattern as `useLike` but for bookmarks. Uses bookmark icon (filled/outline).

#### 8.6 — BookmarkButton Component

- [ ] Create `src/components/engagement/BookmarkButton.tsx` using the same pattern as `LikeButton`.
- [ ] `aria-pressed={isBookmarked}`.

#### 8.7 — Integrate Engagement Buttons

- [ ] Add `<LikeButton>` to `ComponentCard` (in the card footer, always visible).
- [ ] Add `<BookmarkButton>` to `ComponentCard` hover actions.
- [ ] Add both buttons to the Component Detail Page (right panel, below the code panel).

#### 8.8 — Fetch Engagement State for Authenticated Users

- [ ] In server components that fetch component lists, if the user is authenticated, fetch their likes and bookmarks for the current page of components in a single query:
  ```sql
  SELECT component_id FROM likes WHERE user_id = auth.uid()
    AND component_id = ANY(ARRAY[...component_ids])
  ```
- [ ] Pass `is_liked` and `is_bookmarked` as props to `ComponentCard`.

#### 8.9 — Verify Phase 8

- [ ] Click the like button without auth → Auth modal opens.
- [ ] Sign in, click like → Count increases optimistically.
- [ ] Refresh page → Count persists (DB was updated).
- [ ] Click like again → Count decreases (unlike).
- [ ] Bookmark a component → Appears in `/dashboard/bookmarks`.
- [ ] Sort by "Most Liked" → Components with highest `like_count` appear first.

---

### Phase 9: Security, Sanitization (XSS Protection) & Rate Limiting

**Goal:** All user-submitted code is safe; API endpoints are protected from abuse.

#### 9.1 — XSS Protection Audit

- [ ] Confirm `sanitizeForStorage()` is called before every INSERT into `components.code_*` columns.
- [ ] Confirm `sanitizeForPreview()` is called before every INSERT into `components.preview_html`.
- [ ] Confirm `sanitizeForPreview()` is also called client-side immediately before assigning to `iframe.srcdoc` (defense in depth — one sanitize on write, one on render).
- [ ] Confirm all iframes use `sandbox="allow-scripts"` (NOT `allow-same-origin`). The absence of `allow-same-origin` prevents sandboxed scripts from accessing `document.cookie`, `localStorage`, or the parent DOM.
- [ ] Add `csp` iframe attribute:
  ```html
  csp="default-src 'self';
       style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com;
       script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com
                  https://unpkg.com https://cdnjs.cloudflare.com;
       img-src 'self' data:;"
  ```
- [ ] Add Content Security Policy headers to `next.config.ts`:
  ```typescript
  const securityHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ]
  ```

#### 9.2 — Rate Limiting Setup (Upstash Redis)

- [ ] Create an Upstash Redis database at upstash.com and copy credentials to `.env.local`.
- [ ] Create `src/lib/rate-limit.ts`:
  ```typescript
  import { Ratelimit } from '@upstash/ratelimit'
  import { Redis } from '@upstash/redis'

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })

  export const submissionRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 submissions per hour
  })

  export const searchRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '60 s'), // 30 searches per minute
  })

  export const engagementRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '60 s'), // 60 likes/bookmarks per minute
  })
  ```

#### 9.3 — Apply Rate Limiting to Routes

- [ ] In `src/app/api/components/route.ts` (POST): apply `submissionRateLimit` using the user's IP from `request.headers.get('x-forwarded-for')`.
- [ ] In `src/app/api/search/route.ts` (GET): apply `searchRateLimit`.
- [ ] In `src/app/api/likes/route.ts` and `src/app/api/bookmarks/route.ts`: apply `engagementRateLimit`.
- [ ] If rate limit is exceeded, return HTTP 429 with body `{ error: 'Too many requests. Please try again later.' }`.

#### 9.4 — Input Validation Layer

- [ ] All API routes that accept user input must validate on the server using manual checks or a schema library.
- [ ] For the submission route, validate:
  - `name` length (2–60).
  - `description_short` length (≤200).
  - `code` length (≤50,000).
  - `tags` array length (≤5), each tag (≤20 chars).
  - `category_id` must exist in `categories` table (SELECT check).
  - `tech` must be a valid ENUM value.
- [ ] Return HTTP 422 with field-level error messages for invalid input.

#### 9.5 — Supabase Service Role Key Guard

- [ ] Audit all API routes: confirm `SUPABASE_SERVICE_ROLE_KEY` is **only** used in server-side code (`route.ts` files, never in `'use client'` components).
- [ ] Confirm `NEXT_PUBLIC_SUPABASE_ANON_KEY` is used for client-side Supabase client.
- [ ] Add ESLint rule or comment markers to flag any accidental use of service role key client-side.

#### 9.6 — Admin Route Protection

- [ ] Confirm `src/app/admin/layout.tsx` checks `is_admin = true` via the server Supabase client (not the anon client).
- [ ] Add a secondary RLS policy check: admin API routes use the service role client but still validate `is_admin` at the application layer before performing admin actions (defense in depth).

#### 9.7 — Dependency Security

- [ ] Run `npm audit`. Fix all high-severity vulnerabilities.
- [ ] Pin `isomorphic-dompurify` and `dompurify` to a specific version in `package.json` (remove `^` caret) — security-critical library.
- [ ] Add a `"scripts"` entry in `package.json`: `"security:audit": "npm audit --audit-level=high"`.

#### 9.8 — Verify Phase 9

- [ ] Attempt to submit a component containing `<script>alert(1)</script>` in the code field. Verify the stored `preview_html` contains no `<script>` tag.
- [ ] Verify the iframe does not execute the script (open browser console, confirm no alert fires).
- [ ] Fire 4 consecutive submissions from the same IP — the 4th must return HTTP 429.
- [ ] Fire 4+ search requests in rapid succession — confirm rate limit kicks in.
- [ ] Attempt to access `/admin` as a non-admin user — confirm redirect to `/`.

---

### Phase 10: Testing, Performance Optimization & Vercel Deployment

**Goal:** Lighthouse score ≥ 90, LCP < 2.0s, full test coverage on critical paths, production deployment on Vercel.

#### 10.1 — Jest Unit Tests

- [ ] Configure Jest in `jest.config.ts` with `jest-environment-jsdom` and `@testing-library/react`.
- [ ] Write unit tests for:
  - `src/lib/sanitize.ts` — test that `<script>` tags, `onerror` attributes, and `javascript:` URLs are stripped.
  - `src/lib/clipboard.ts` — mock `navigator.clipboard` and test fallback.
  - `src/lib/slug.ts` — test slug generation with special characters.
  - `src/lib/preview-builder.ts` — test that Tailwind CDN script is injected for Tailwind type.
  - `src/hooks/useLike.ts` — test optimistic update and revert on error.
- [ ] Run `npm test` — all tests pass.

#### 10.2 — Playwright E2E Tests

- [ ] Configure Playwright in `playwright.config.ts` targeting `localhost:3000`.
- [ ] Write E2E tests for critical flows:
  - **Home page loads:** Navigate to `/`, assert hero heading is visible, assert at least one component card is visible.
  - **Command palette:** Press `Ctrl+K`, type "button", assert results appear.
  - **Component detail:** Click a card, assert detail page loads, assert code panel is visible.
  - **Copy code:** Click "Copy HTML", assert toast "copied" appears.
  - **Auth flow:** Click "Sign In", assert auth modal opens.
  - **Submission flow (mocked):** Navigate to `/submit`, assert redirect to auth if unauthenticated.

#### 10.3 — Performance Optimization

- [ ] Verify all images use `next/image` with `width` and `height` props to prevent CLS.
- [ ] Verify all component cards use `loading="lazy"` on their iframe previews.
- [ ] Use `React.lazy` + `Suspense` for `CodeMirror` editor (heavy dependency) in `StepCodeEditor.tsx` — only loaded on the `/submit` page.
- [ ] Verify `next/font` is loading Inter and JetBrains Mono with `display: swap`.
- [ ] Add `export const dynamic = 'force-static'` or `revalidate` exports to all pages that can benefit from ISR:
  - `/` → `revalidate = 3600`
  - `/components/[slug]` → `revalidate = 60`
  - `/creators/[username]` → `revalidate = 3600`
- [ ] Analyze bundle size: `npm run build && npx @next/bundle-analyzer`. Confirm no unexpectedly large client-side bundles.
- [ ] Defer Babel standalone (React preview) inside iframes — it is only loaded inside the iframe document, not the main app bundle.

#### 10.4 — Accessibility Audit

- [ ] Run `npx eslint --plugin jsx-a11y src/` — fix all reported issues.
- [ ] Manually tab through the homepage: every interactive element must be reachable and have a visible focus ring.
- [ ] Verify all images have descriptive `alt` attributes.
- [ ] Verify all form inputs have associated `<label>` elements.
- [ ] Verify like/bookmark buttons use `aria-pressed` and descriptive `aria-label`.
- [ ] Verify toast notifications are in an `aria-live="polite"` region (react-hot-toast handles this).
- [ ] Test with screen reader (NVDA/VoiceOver) on the homepage and detail page.

#### 10.5 — SEO

- [ ] Verify `<title>` and `<meta name="description">` are set on all pages via the Next.js Metadata API.
- [ ] Create `src/app/sitemap.ts` that generates a sitemap including all published component pages.
- [ ] Create `src/app/robots.ts` with appropriate rules (allow all, disallow `/admin`, `/dashboard`, `/api`).
- [ ] Add Open Graph image tag to component detail pages using the component's `thumbnail_url` (fallback to `/og-image.png`).

#### 10.6 — Vercel Deployment

- [ ] Push code to GitHub: `git push origin main`.
- [ ] Go to vercel.com → New Project → Import GitHub repo `apexui`.
- [ ] Set all environment variables from `.env.example` in Vercel Project Settings → Environment Variables.
- [ ] Deploy. Confirm build succeeds.
- [ ] After deploy, update in Supabase Dashboard:
  - Authentication → URL Configuration → Site URL: `https://apexui.dev` (or Vercel URL).
  - Add production callback URL to allowed redirect URLs.
- [ ] Update GitHub/Google OAuth app redirect URLs to production callback URL.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to `https://apexui.dev` in Vercel env.
- [ ] Re-deploy after updating env vars.

#### 10.7 — Lighthouse Audit

- [ ] Open Chrome DevTools → Lighthouse on the production URL.
- [ ] Target scores: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90.
- [ ] Fix any performance issues flagged by Lighthouse until scores are met.
- [ ] Verify LCP < 2.0s using the "Timings" section of the Network tab on a throttled 4G connection.

#### 10.8 — Final Verification Checklist

- [ ] Homepage loads and shows component grid with live previews.
- [ ] Ctrl+K opens command palette with working search.
- [ ] Category filter chips filter the grid correctly.
- [ ] Component detail page: preview renders, all code tabs work, copy button works.
- [ ] GitHub OAuth sign in/sign out flow works end-to-end.
- [ ] Google OAuth sign in/sign out flow works end-to-end.
- [ ] Submit a component: all 3 wizard steps complete, confirmation email received.
- [ ] Admin approval flow: approve component, confirm it appears in gallery.
- [ ] Like a component: count updates optimistically, persists on refresh.
- [ ] Bookmark a component: appears in dashboard bookmarks.
- [ ] No XSS vulnerabilities: malicious `<script>` in submitted code does not execute in preview.
- [ ] Rate limiting active: excess submissions return HTTP 429.
- [ ] All Playwright E2E tests pass against the production URL.
- [ ] Lighthouse score ≥ 90 across all categories.

---

## 6. AI Agent Execution Rules & Instructions

The following rules are **mandatory** for any AI coding agent executing this plan. Read them before beginning and refer back to them if uncertain.

---

### Rule 1: Read One Task at a Time

- Process this plan **sequentially**, one `- [ ]` task at a time.
- Do not skip ahead to a future phase unless all prior tasks in the current phase are complete.
- After completing each task, mark it as `- [x]` before moving to the next.

---

### Rule 2: Verify Before You Add

- Before installing any new `npm` package, first check `package.json` to confirm it is not already installed.
- Before creating a new file, check if it already exists using a directory listing or file read.
- Before adding a new utility function, search the codebase for an existing one that serves the same purpose.
- Never install a duplicate package under a different name (e.g., if `@supabase/ssr` is installed, do not also install `@supabase/auth-helpers-nextjs`).

---

### Rule 3: Strict TypeScript — Zero `any` Policy

- Every component, hook, API route, and utility must be fully typed.
- Never use `any`. If the type is unknown, use `unknown` and perform type narrowing.
- All API route handlers must have typed `Request` and `Response` objects.
- All Supabase queries must reference the generated `Database` type from `database.types.ts`.
- Run `npx tsc --noEmit` after completing each phase. Fix all TypeScript errors before proceeding.

---

### Rule 4: Server vs. Client Component Discipline

- Default to **Server Components** unless the component requires: `useState`, `useEffect`, `useRef`, browser APIs (`window`, `document`, `localStorage`), or event listeners.
- Add `'use client'` **only** at the top of files that genuinely need it.
- Never use `localStorage` or browser APIs at the module level in Server Components.
- Keep the client bundle small: heavy libraries (CodeMirror, Framer Motion, Babel standalone) must only be imported in client components or inside dynamic imports with `next/dynamic`.

---

### Rule 5: Sanitize All User-Submitted HTML Before Storage AND Before Render

- The sanitization pipeline is the most critical security mechanism. Never bypass it.
- Rule: **sanitize on write** (before database INSERT) using `sanitizeForStorage()`.
- Rule: **sanitize on render** (before assigning to `srcdoc`) using `sanitizeForPreview()`.
- The double sanitization is intentional defense-in-depth. Do not remove either layer.
- Never inject raw unsanitized strings into `srcdoc`, `innerHTML`, or `dangerouslySetInnerHTML`.

---

### Rule 6: Never Expose the Service Role Key Client-Side

- `SUPABASE_SERVICE_ROLE_KEY` must only appear in server-side code: API routes (`route.ts`), server components, Supabase Edge Functions.
- Variables prefixed `NEXT_PUBLIC_` are exposed to the browser. Never assign the service role key to a `NEXT_PUBLIC_` variable.
- If you are unsure whether a file runs on the server or client, check for the `'use client'` directive at the top. If absent, it is a Server Component.

---

### Rule 7: Optimistic UI for Engagement Actions

- All like and bookmark toggle interactions must update the UI **immediately** (optimistic update) before the API call resolves.
- If the API call fails, **revert** the optimistic update and display an error toast.
- Never block the user with a loading spinner for like/bookmark actions.

---

### Rule 8: Mobile-First Responsive Design

- Write Tailwind classes mobile-first: default classes apply to mobile, then use `sm:`, `md:`, `lg:`, `xl:` breakpoint prefixes for larger screens.
- Test every new UI component at 375px (iPhone SE), 768px (iPad), and 1280px (desktop) before marking a task complete.
- The category filter strip must be horizontally scrollable on mobile with no visible scrollbar.

---

### Rule 9: ISR Caching Strategy

- Do not use `export const dynamic = 'force-dynamic'` unless real-time data is absolutely required.
- Default to ISR with sensible `revalidate` values (homepage: 3600s, detail page: 60s, creator profile: 3600s).
- Client-side engagement state (likes, bookmarks for logged-in user) is always fetched fresh client-side and does not depend on ISR.

---

### Rule 10: No Migrations Without Review

- Never modify production Supabase schema directly without first updating the corresponding SQL file in `supabase/migrations/`.
- Number new migrations sequentially (e.g., `012_`).
- Migrations are **append-only**: never modify an already-applied migration file. Create a new migration to alter existing schema.
- Before running any migration, read it in full and confirm it does not have unintended side effects (e.g., `DROP TABLE`, `TRUNCATE`).

---

### Rule 11: Check Acceptance Criteria Before Closing a Phase

Before marking any phase as complete, verify all of the Acceptance Criteria listed in the PRD for features implemented in that phase. Specifically:

- **Phase 1 exit:** LCP < 2.0s, 50+ components, copy works across all major browsers, no XSS vulnerability.
- **Phase 2 exit:** OAuth works (GitHub + Google), email confirmation < 60s, moderation queue functional, rate limiting active.
- Each phase's verify checklist at the end of its section must pass 100%.

---

### Rule 12: Never Hardcode Credentials or URLs

- All credentials (API keys, secrets) must come from `process.env.*` variables.
- All base URLs (site URL, Supabase URL) must come from environment variables.
- Never hardcode `https://apexui.dev` or any production URL as a string literal in source code.

---

*This plan is the authoritative implementation roadmap for ApexUI v1.0. All code, schema changes, and infrastructure decisions must align with both this plan and the source PRD v1.0. If a conflict arises between this plan and the PRD, the PRD is the source of truth.*

---

**End of ApexUI Implementation Plan v1.0.0**
