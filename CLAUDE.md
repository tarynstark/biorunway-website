# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
npm run astro    # Access Astro CLI commands
```

**Live Site:** https://biorunway.com (Password Protected)
**Password:** biorunwayiscool

## Architecture Overview

**BioRunway Website** - Astro-based static site for biotech fashion content with Supabase email collection

### Tech Stack
- **Framework**: Astro v5.10.0 with React v19.1.0 for interactive components
- **Styling**: Tailwind CSS v4.1.8 (uses CSS variables system)
- **Content**: Content Collections with Zod schema validation
- **Backend**: Supabase for email list management
- **Animation**: Framer Motion v12.16.0
- **Deployment**: Netlify with custom domain and password protection

### Key Architecture Patterns

**1. Hybrid Component Strategy**
- Astro components (.astro) for static content and layouts
- React components (.jsx/.tsx) for interactive features requiring state
- Content collections for structured markdown content

**2. Content Management System**
- Articles stored as markdown in `src/content/articles/`
- Schema-driven with categories: products, research, sustainability, deep-dive, investment
- Frontmatter validation via Zod schema in `src/content/config.ts`

**3. Layout Hierarchy**
```
BaseLayout.astro     # Core SEO, meta tags, global styles
├── PageLayout.astro # General page wrapper
└── ArticleLayout.astro # Article-specific layout with structured data
```

## Project Structure

```
src/
├── components/
│   ├── EmailSignup.jsx        # React component for Supabase integration
│   ├── article/ArticleCard.tsx # Article display component
│   ├── layout/                # Header, Footer components
│   └── sections/              # Page section components
├── content/
│   ├── articles/              # Markdown articles with frontmatter
│   └── config.ts              # Content collection schemas
├── layouts/                   # Layout components
├── lib/supabase.js           # Supabase client configuration
├── pages/                    # File-based routing
└── styles/global.css         # Brand color system and base styles
```

## Brand System Integration

The site uses a comprehensive color system defined in `src/styles/global.css`:
- **Au Chico palette**: #fbf5f5, #f0dbdb, #a5555b, #66353d, #371a1e
- **Porsche palette**: #f8f0dc, #f0deb8, #e7c78a, #dca75c, #d48f3b, #a45e2a, #391f11  
- **Cod Gray**: #f7f7f6 and variants

Colors are implemented as CSS custom properties and should be used consistently across components.

## Development Workflow

### Content Creation
Articles are created as `.md` files in `src/content/articles/` with required frontmatter:
```yaml
title: "Article Title"
excerpt: "Brief description"
category: "research" # One of the defined enum values
author: "Author Name"
publishedAt: 2024-01-15
```

### Component Development
- Use Astro components for static content
- Use React components when state management or interactivity is needed
- Follow the existing component organization in `src/components/`

### Styling Approach
- Tailwind CSS classes for layout and spacing
- CSS custom properties for brand colors
- Component-scoped styles when needed
- Responsive design patterns established in existing components

### Figma Integration Workflow
When working with Figma designs, use the MCP tools available:
```bash
# Extract code from Figma node
mcp__figma-dev-mode-mcp-server__get_code

# Get design image for context
mcp__figma-dev-mode-mcp-server__get_image

# Get design variables/tokens
mcp__figma-dev-mode-mcp-server__get_variable_defs
```

**Important**: Always get both code AND image from Figma nodes to understand the complete design context. Extract node IDs from Figma URLs (e.g., `node-id=78-334` becomes `78:334`).

## Current Development State & Workflow

The project is undergoing a major homepage redesign with consolidated information architecture based on Figma designs. **Always check `tickets.json` first** - it contains sequenced development priorities with specific implementation details.

### Active Development Approach
1. **Figma-First Design**: All styling and layout decisions reference Figma designs
2. **Ticket-Driven Development**: Use `tickets.json` as the single source of truth for current work
3. **Figma MCP Integration**: Use Figma MCP tools to extract code and design specifications
4. **Consolidated Information Architecture**: Eliminating separate About/Contact pages for integrated homepage

### Current Priority Sequence (from tickets.json)
1. **Foundation Work**: Design system setup and gradient handling (STYLE-001, STYLE-002)
2. **Navigation & Hero**: Simplified nav structure and hero with email signup (IA-001, IA-002) 
3. **Content Sections**: About sections, articles grid, team showcases (IA-003 through IA-006)
4. **Footer & Newsletter**: Contact info consolidation and newsletter CTA (IA-007, IA-008)
5. **Responsive Design**: Mobile optimization across all sections (RESPONSIVE-001)
6. **Cleanup & Polish**: Remove unused pages, style email forms, security (CLEANUP-001, EMAIL-001-003)

### Design System Requirements
- **Color Palette**: Au Chico (#fbf5f5 to #371a1e), Porsche (#f8f0dc to #391f11), Cod Gray (#f7f7f6)
- **Typography**: PP Pangaia (headings), Inter (body), SF Pro Rounded (UI elements)
- **Gradients**: Radial gradients for section backgrounds (convert from inline SVG)
- **Spacing**: 80px border radius for large elements, 20px for cards
- **Shadows**: Complex multi-layer shadows as specified in Figma

## Environment Setup

### Required Environment Variables
```bash
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SITE_PASSWORD=biorunwayiscool  # For production password protection
```

### Site Access
- **Production Site**: https://biorunway.com - Password protected with "biorunwayiscool"
- **Preview Deployments**: Branch and deploy previews remain unprotected for development
- **Password Protection**: Applied only to production domain via Netlify configuration

### Supabase Integration
- Email collection managed through `src/lib/supabase.js`
- RLS policies enabled with secure error handling (BIO-17 completed)
- EmailSignup component handles form submission and validation
- **CORS Settings**: Ensure Supabase allows requests from biorunway.com domain

## SEO and Performance

- Static site generation for optimal performance
- Comprehensive meta tag system in BaseLayout
- Open Graph and Twitter Card support
- Structured data (JSON-LD) for organization information
- Content-focused approach with minimal JavaScript footprint

## Linear Task Management Workflow

**CRITICAL**: All development work is tracked through Linear. There is no separate tickets.json file - Linear is the single source of truth.

### Before Starting Work
Check Linear for current tasks, priorities, and technical details in issue descriptions.

### Working on Linear Issues
- Use auto-generated branch names: taryns/bio-[number]-[title]
- Reference Linear ID in all commits: [BIO-XX]: Description
- Include Linear URL in commit messages

### Current Priority Issues
- BIO-14: Migrate from Vercel to Netlify (In Progress)
- BIO-17: Security & Bug Fixes (Urgent)
- BIO-18: Replace Placeholder Content (Medium)

Visit https://linear.app/biorunway for full task list.