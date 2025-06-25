# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
npm run astro    # Access Astro CLI commands
```

## Architecture Overview

**BioRunway Website** - Astro-based static site for biotech fashion content with Supabase email collection

### Tech Stack
- **Framework**: Astro v5.10.0 with React v19.1.0 for interactive components
- **Styling**: Tailwind CSS v4.1.8 (uses CSS variables system)
- **Content**: Content Collections with Zod schema validation
- **Backend**: Supabase for email list management
- **Animation**: Framer Motion v12.16.0
- **Deployment**: GitHub Pages (`/biorunway-website` base path)

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
```

### Supabase Integration
- Email collection managed through `src/lib/supabase.js`
- Currently has RLS disabled (security ticket EMAIL-002 addresses this)
- EmailSignup component handles form submission and validation

## SEO and Performance

- Static site generation for optimal performance
- Comprehensive meta tag system in BaseLayout
- Open Graph and Twitter Card support
- Structured data (JSON-LD) for organization information
- Content-focused approach with minimal JavaScript footprint

## Mandatory Ticket Management Workflow

**CRITICAL**: Every code change MUST follow this workflow before committing:

### 1. Pre-Commit Ticket Review
**ALWAYS** before making any commits:
- Read `tickets.json` to understand current project status
- Identify which ticket(s) your changes address
- Check if new tickets need to be created for discovered work

### 2. During Development
- Use TodoWrite tool to track implementation progress
- Reference ticket IDs in commit messages and PR descriptions
- Document any scope changes or new requirements discovered

### 3. Post-Implementation Ticket Updates
**REQUIRED** for every commit involving code changes:

```bash
# 1. Update tickets.json FIRST
# - Mark completed tickets with detailed description of work done
# - Update status: "backlog" -> "in_progress" -> "completed"
# - Add implementation details to description field
# - Create new tickets for any discovered work or tech debt

# 2. Commit tickets.json separately
git add tickets.json
git commit -m "Update tickets.json - mark [TICKET-ID] complete, add [NEW-TICKETS]"

# 3. Then commit your code changes
git add .
git commit -m "[TICKET-ID]: Brief description\n\nDetailed implementation notes\n\n🤖 Generated with Claude Code"
```

### 4. Ticket Creation Guidelines
Create new tickets when you:
- Discover technical debt that needs addressing
- Implement features that require follow-up work
- Find bugs or issues during development
- Identify improvements or optimizations
- Need to refactor or clean up code

### 5. Ticket Status Management
- **backlog**: Not yet started, prioritized in sequence
- **in_progress**: Currently being worked on (limit to 1-2 tickets)
- **completed**: Fully implemented and tested

### 6. Commit Message Standards
Always include:
- Ticket ID in format `[TICKET-ID]: Description`
- Reference to tickets.json updates when applicable
- Clear description of what was implemented
- Any breaking changes or migration notes

**Example Workflow:**
```bash
# 1. Start work
# Read tickets.json, identify CONTENT-001

# 2. During implementation
# Use TodoWrite to track progress

# 3. Complete work
# Update tickets.json - mark CONTENT-001 complete, add CONTENT-003 for discovered optimization
git add tickets.json
git commit -m "Update tickets.json - mark CONTENT-001 complete, add CONTENT-003 image optimization"

# 4. Commit code changes
git add .
git commit -m "CONTENT-001: Add real images to Latest Articles cards

- Replace placeholder images with optimized article images
- Update image paths and alt text for accessibility
- Ensure proper aspect ratios and loading performance

🤖 Generated with Claude Code"
```

This workflow ensures:
- Full traceability of all work
- Proper project planning and documentation
- No forgotten tasks or technical debt
- Clear commit history tied to business requirements