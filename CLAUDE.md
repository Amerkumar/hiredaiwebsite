# CLAUDE.md - AI Assistant Guide for HiredAI.ca Website

## Project Overview

**HiredAI.ca** is a marketing website for an AI voice receptionist service targeting Canadian dental practices. This is a **static website** with no build process or dependencies - pure HTML, CSS, and vanilla JavaScript.

### Key Information
- **Type**: Static marketing website
- **Tech Stack**: HTML5, CSS3, Vanilla JavaScript
- **Target Audience**: Canadian dental practices
- **Primary Purpose**: Lead generation and customer education
- **Repository**: Amerkumar/hiredaiwebsite

---

## Codebase Structure

```
/home/user/hiredaiwebsite/
├── index.html       # Main HTML file (294 lines)
├── styles.css       # All styling and responsive design (757 lines)
├── script.js        # Interactive functionality (85 lines)
└── .git/            # Git repository
```

### Architecture
This is a **single-page application** with all content on one HTML file. Navigation uses anchor links (#features, #pricing, #faq) for smooth scrolling between sections.

---

## File Descriptions

### index.html
**Lines: 294 | Purpose: Site structure and content**

**Sections (in order):**
1. **Navigation (12-23)**: Fixed navbar with logo and links
2. **Hero Section (25-34)**: Main headline and CTA
3. **Features Section (36-71)**: 6 feature cards in a grid
4. **Stats Section (73-92)**: 3 statistics with sources
5. **Pricing Section (94-122)**: Single pricing tier at $199/month
6. **FAQ Section (124-281)**: 17 expandable FAQ items
7. **Footer (284-289)**: Copyright and location info

**Key Elements:**
- Mobile menu toggle button (#mobileMenuBtn)
- All internal links use `href="#section-id"` format
- CTA buttons use `mailto:contact@hiredai.ca`
- Stats include citation superscripts with data-source attributes
- FAQ items use `.faq-question` buttons with `.faq-answer` divs

### styles.css
**Lines: 757 | Purpose: Complete styling system**

**CSS Architecture:**
- **CSS Variables (9-18)**: Color scheme and shadows
  - `--primary-blue: #0066FF`
  - `--light-gray: #F8F9FA`
  - `--dark-text: #1a1a1a`
  - `--medium-gray: #6B7280`

**Major Style Blocks:**
- Navigation (28-125): Fixed navbar with scroll effects
- Hero (127-193): Gradient background with animations
- Features (209-281): Grid layout with hover effects
- Stats (349-422): Card-based layout with citations
- Pricing (424-568): Premium card design with gradient header
- FAQ (570-626): Accordion-style expandable items
- Responsive (676-751): Mobile breakpoints at 768px and 480px

**Animation System:**
- `fadeInUp`: Used for hero elements
- `growBar`: For analytics bars (currently unused)
- `.fade-in` + IntersectionObserver: Scroll-triggered animations
- Hover transforms: translateY(-5px to -8px)

### script.js
**Lines: 85 | Purpose: Interactive features**

**Functionality:**
1. **Mobile Menu (4-16)**: Toggle navigation on mobile
2. **Navbar Scroll Effect (18-26)**: Add `.scrolled` class on scroll
3. **FAQ Accordion (28-51)**: Expand/collapse FAQ items (only one open at a time)
4. **Intersection Observer (53-70)**: Trigger `.fade-in` animations when elements enter viewport
5. **Smooth Scrolling (72-84)**: Polyfill for anchor link smooth scrolling

---

## Development Workflows

### Making Content Changes

**Adding/Editing Features:**
1. Locate the `.features-grid` in index.html (lines 39-70)
2. Copy an existing `.feature-card` div
3. Update: icon emoji, h3 title, p description
4. Feature cards auto-adjust to grid layout (minmax(320px, 1fr))

**Adding FAQ Items:**
1. Locate `.faq-container` in index.html (line 127+)
2. Copy a complete `.faq-item` block (question button + answer div)
3. Update question text and answer content
4. Accordion functionality works automatically via script.js

**Updating Pricing:**
1. Find `.pricing-card` in index.html (line 98+)
2. Update `pricing-amount`, `pricing-subtext`, or list items
3. Pricing features use a 2-column grid on desktop, 1-column on mobile

**Modifying Stats:**
1. Locate `.stats-grid` in index.html (lines 76-91)
2. Each `.stat-card` has: stat-number, stat-label, stat-source link
3. Citations use `data-source` attribute for hover tooltips

### Styling Guidelines

**Color Usage:**
- Primary actions: `var(--primary-blue)` (#0066FF)
- Text hierarchy: `var(--dark-text)` for headings, `var(--medium-gray)` for body
- Backgrounds: `var(--light-gray)` for alternate sections
- Always use CSS variables, never hardcode colors

**Spacing System:**
- Sections: `padding: 6rem 2rem` (desktop), `4rem 1rem` (mobile)
- Cards: `padding: 2.5rem` (desktop), `1.5rem` (mobile)
- Grids: `gap: 2rem` to `2.5rem`

**Button Styles:**
- `.btn-primary`: Filled blue button (CTAs)
- `.btn-secondary`: Outlined button (currently defined but unused)
- Always include hover states with `translateY(-2px)`

### Responsive Design

**Breakpoints:**
- **Desktop**: Default styles (max-width: 1200px containers)
- **Tablet**: 768px - Mobile menu activates, grids collapse
- **Mobile**: 480px - Further padding/font size reductions

**Testing Checklist:**
- Mobile menu toggle works
- All grids stack vertically on mobile
- Text remains readable (min 2rem for h1 on mobile)
- Touch targets are minimum 44px

---

## Code Conventions and Patterns

### HTML Conventions
- **Semantic HTML**: Use `<nav>`, `<section>`, `<footer>` tags
- **IDs**: Only for navigation targets and JavaScript hooks (e.g., `#navbar`, `#mobileMenuBtn`)
- **Classes**: Descriptive BEM-like naming (`.feature-card`, `.faq-question`, `.stat-number`)
- **Links**: External links include `target="_blank"`, mailto links include subject params

### CSS Conventions
- **Organization**: Styles grouped by component, not by property type
- **Naming**: Component-based (`.pricing-card`, `.pricing-header`, `.pricing-features`)
- **Animations**: Define keyframes at bottom (643-662), apply with transition or animation
- **Vendor Prefixes**: Not used (assuming modern browser support)

### JavaScript Conventions
- **Vanilla JS**: No frameworks or libraries
- **DOM Queries**: `getElementById` for unique elements, `querySelectorAll` for lists
- **Event Listeners**: Arrow functions preferred
- **Class Toggling**: Using `.classList.add/remove/toggle()`

### Design Patterns

**Accordion Pattern (FAQ):**
```javascript
// Only one FAQ open at a time
// Close all others before opening selected
document.querySelectorAll('.faq-answer').forEach(item => {
    if (item !== answer) item.classList.remove('active');
});
answer.classList.toggle('active');
```

**Intersection Observer Pattern:**
```javascript
// Trigger animations when elements scroll into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {threshold: 0.1, rootMargin: '0px 0px -50px 0px'});
```

---

## Key Features and Functionality

### Navigation System
- **Fixed navbar** that adds `.scrolled` class on scroll (affects padding and shadow)
- **Mobile menu**: Hamburger toggle with slide-in drawer from left
- **Auto-close**: Mobile menu closes when any link is clicked
- **Smooth scroll**: All anchor links scroll smoothly to target sections

### Animation System
- **Hero animations**: Sequential fadeInUp on h1, p, CTA (0s, 0.2s, 0.4s delays)
- **Scroll animations**: `.fade-in` elements become `.visible` when 10% enters viewport
- **Hover effects**: Cards translate up, icons rotate/scale, shadows intensify
- **FAQ transitions**: Max-height animation for accordion (0.3s ease)

### Interactive Elements
- **FAQ Accordion**: Click to expand/collapse, only one open at time
- **Hover tooltips**: Stat citations show source on hover via ::after pseudo-element
- **Call-to-action**: All CTAs link to `mailto:contact@hiredai.ca?subject=...`

---

## Common Tasks for AI Assistants

### Task 1: Add a New Feature Card
```html
<div class="feature-card fade-in">
    <div class="feature-icon">[EMOJI]</div>
    <h3>[Feature Title]</h3>
    <p>[Feature Description]</p>
</div>
```
- Add within `.features-grid` (after line 69)
- Choose relevant emoji for icon
- Keep description to 1-2 sentences

### Task 2: Update Pricing
- Find `.pricing-amount` (line 101)
- Update `.pricing-subtext` (line 102)
- Add/remove items in `.pricing-features` list (105-114)
- Each list item auto-styles with checkmark icon

### Task 3: Add FAQ Item
```html
<div class="faq-item fade-in">
    <button class="faq-question">
        <span>[Question text]</span>
        <span class="faq-icon">+</span>
    </button>
    <div class="faq-answer">
        <p>[Answer text]</p>
    </div>
</div>
```
- Insert within `.faq-container` (after line 127)
- Accordion functionality automatic via script.js
- No limit on answer length (max-height: 500px with scroll)

### Task 4: Modify Color Scheme
1. Edit CSS variables in styles.css (lines 9-18)
2. Change `--primary-blue` to affect all buttons, links, accents
3. All colors reference variables, so changes propagate automatically

### Task 5: Add New Section
1. Add `<section id="new-section">` in index.html
2. Add navigation link: `<li><a href="#new-section">Link Text</a></li>`
3. Follow existing section structure (h2 title, content container)
4. Add to `.fade-in` elements for scroll animations

---

## Git Workflow

### Branch Strategy
- **Main branch**: Not specified in repo (likely `main` or `master`)
- **Feature branches**: Use `claude/` prefix with session ID
- **Current branch**: `claude/claude-md-mhyf049a5q98vqpg-018FyFGMrHRigNUibiXdpaVm`

### Commit Guidelines
Based on recent commit history:
- Use descriptive commit messages (not generic "Update files")
- Group related changes in single commits
- Examples from history:
  - "Update FAQ: Remove trust claim from privacy question"
  - "Comprehensive FAQ section update with 17 detailed questions"
  - "Design overhaul: Modern features section, premium pricing table"

### Pushing Changes
```bash
git add index.html styles.css script.js
git commit -m "Descriptive message about changes"
git push -u origin claude/[branch-name]
```

**Important**: Always use the correct `claude/` branch name. Push will fail with 403 if branch name doesn't match session ID.

---

## Important Notes for AI Assistants

### What This Site Is
- **Marketing website**: Primary goal is lead generation via "Book Demo" CTAs
- **Educational resource**: Extensive FAQ addresses common objections
- **Canadian focus**: References PIPEDA compliance, Canadian statistics, Vancouver location
- **Service pricing**: $199/month + $0.35/min clearly displayed

### What This Site Is NOT
- **Not a web app**: No user accounts, dashboards, or interactive tools
- **Not using a framework**: No React, Vue, or build process
- **Not connected to backend**: All CTAs are mailto links, no API calls
- **Not using analytics**: No Google Analytics or tracking scripts currently

### Content Guidelines
- **Tone**: Professional but approachable, focused on ROI for dental practices
- **Stats**: Always cite sources (see lines 78, 83 for examples)
- **FAQ answers**: Detailed and honest, address concerns directly
- **Privacy**: Multiple FAQ items about data privacy (PIPEDA compliance)

### Technical Constraints
- **No build process**: Changes to files are immediately reflected
- **No dependencies**: No npm, no package.json, no node_modules
- **Browser compatibility**: Modern browsers only (CSS Grid, IntersectionObserver)
- **No polyfills**: Smooth scrolling implemented in JS for broader support

### Testing Recommendations
When making changes, always verify:
1. **Mobile menu** toggles correctly on small screens
2. **FAQ accordion** expands/collapses properly
3. **Smooth scrolling** works for all anchor links
4. **Animations** trigger on scroll (fade-in elements)
5. **Hover states** work on all interactive elements
6. **All links** point to correct destinations (mailto or anchors)

### Performance Considerations
- **Images**: None currently (only emoji for icons)
- **External resources**: None (no CDN dependencies)
- **CSS size**: 14.6KB uncompressed
- **JS size**: 2.3KB uncompressed
- **Total page weight**: Very light (~36KB for all files)

### SEO Considerations
- **Title tag**: "HiredAI.ca - AI Receptionist for Dentists"
- **Meta description**: Present (line 7)
- **Semantic HTML**: Proper use of header tags (h1, h2, h3)
- **Internal links**: All navigation is on-page
- **External links**: Stats citations link to authoritative sources

---

## Quick Reference

### File Line Numbers
- **Navigation**: index.html:12-23
- **Hero**: index.html:25-34
- **Features**: index.html:36-71
- **Stats**: index.html:73-92
- **Pricing**: index.html:94-122
- **FAQ**: index.html:124-281
- **CSS Variables**: styles.css:9-18
- **Mobile Breakpoint**: styles.css:676-737

### Contact Information
- **Email**: contact@hiredai.ca
- **Location**: Vancouver, BC, Canada
- **Domain**: HiredAI.ca

### Key Metrics (from stats section)
- 75% of patients prefer calling over online booking
- 30% of appointments missed from after-hours calls
- 24hrs average setup time

---

## Version History

**Last Updated**: 2025-11-14
**Created By**: Claude Code AI Assistant
**Repository State**: Clean working directory on branch `claude/claude-md-mhyf049a5q98vqpg-018FyFGMrHRigNUibiXdpaVm`

**Recent Changes** (from git log):
- FAQ section comprehensively updated
- Statistics made clickable with source links
- Design overhaul with modern features and pricing
- Privacy questions refined

---

## Future Considerations

### Potential Improvements
- **Analytics**: Consider adding privacy-friendly analytics (Plausible, Fathom)
- **Contact form**: Replace mailto with actual form + backend
- **Testimonials**: Add customer testimonials section
- **Demo video**: Embed product demo video
- **Blog**: Add content marketing section
- **A/B testing**: Test different headlines, CTAs
- **Conversion tracking**: Track which CTAs perform best

### Scalability Notes
- If site grows beyond single page, consider:
  - Multi-page architecture
  - Build process (for asset optimization)
  - CMS for content management
  - Component-based framework

---

*This document is designed to help AI assistants (like Claude) understand the codebase structure, conventions, and common tasks. Keep this file updated as the project evolves.*
