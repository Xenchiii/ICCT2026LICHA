# Caraga Region XIII — Vertex XIII
### WEBster ICT Strand Competition Entry · 2025

> *"The people of Caraga have always looked outward — to the sea, to the world — while remaining rooted in the rich soil and ancient waters of this land."*

A comprehensive, multi-page tourism and cultural heritage website for **Caraga (Region XIII)**, the Land of Promise in northeastern Mindanao, Philippines. Built entirely from scratch using pure HTML, CSS, and vanilla JavaScript as a competition project for the **WEBster ICT Strand** by **Team Vertex XIII**.

The site covers all five provinces of Caraga in detail, documents the region's pre-colonial history dating back to 320 AD, profiles its indigenous peoples, festivals, delicacies, and notable personalities — and brings it all together through a polished, responsive, animation-rich user interface that looks and behaves like a professional tourism portal.

---

## Table of Contents

1. [The Team](#the-team)
2. [Project Overview](#project-overview)
3. [Project Structure](#project-structure)
4. [Page-by-Page Breakdown](#page-by-page-breakdown)
5. [Tech Stack](#tech-stack)
6. [JavaScript Architecture](#javascript-architecture-jsmainjs)
7. [CSS Architecture](#css-architecture-cssstylecss)
8. [Responsive Design](#responsive-design)
9. [Design System](#design-system)
10. [Content Coverage](#content-coverage)
11. [How to Run](#how-to-run)
12. [Design Decisions & Philosophy](#design-decisions--philosophy)

---

## The Team

| Avatar | Name | Role |
|--------|------|------|
| **LR** | Laurence| Full-Stack Developer    |
| **AN** | Andrea  | Documentor & Research   |
| **JN** | Jonas   | Backend & Functionality |
| **ZA** | Zareena | Frontend Developer      |
| **KZ** | Kriziel | UI Design & CSS         |

---

## Project Overview

### What This Project Is

Vertex XIII is a fully hand-coded tourism website for Caraga Region XIII of the Philippines. It was built for the WEBster ICT Strand competition and represents a complete, production-quality web project created without any JavaScript frameworks, CSS frameworks, or third-party UI libraries.

The website serves as a comprehensive digital guide to the Caraga region, covering:

- **5 provinces** with individual dedicated pages each containing multiple sections of unique content
- **50+ tourist spots** documented with detailed descriptions, activity tags, and direct Google Maps integration
- **A 17-entry history timeline** tracing Caraga from 320 AD to the present day
- **30+ festivals and events** documented across a calendar and dedicated cards
- **5 indigenous peoples** profiled in depth — Manobo, Mamanwa, Higaonon, Banwaon, and Surigaonon
- **14 regional delicacies** with a food glossary and "where to eat" guide
- **16 notable personalities** across politics, sports, arts, history, religion, and business
- **A full contact page** with form validation, FAQ accordion, office information, and social media links

### Competition Context

This project was entered into the WEBster ICT Strand competition, which evaluates web development projects on design quality, responsiveness, code organisation, content depth, and interactivity. The team chose Caraga Region XIII as the subject both because of its extraordinary natural and cultural richness, and because the region is significantly underrepresented in digital tourism content compared to destinations like Palawan or Cebu. The goal was to build something that felt like a real, production-grade tourism portal while being 100% hand-written code.

---

## Project Structure

```
vertex-xiii/
│
├── index.html                            # Main homepage
│
├── css/
│   └── style.css                         # Global stylesheet shared across every page
│                                         # (~1,400 lines covering all shared components)
│
├── js/
│   └── main.js                           # All interactive JavaScript for the whole site
│                                         # (~400 lines of vanilla JS, no dependencies)
│
├── images/                               # All photography and visual assets
│   │
│   ├── Hero images (full-screen slides on homepage)
│   │   ├── hero-siargao.jpg
│   │   ├── hero-enchanted.jpg
│   │   ├── hero-tinuyan.jpg
│   │   ├── hero-marsh.jpg
│   │   ├── hero-sohoton.jpg
│   │   └── hero-britania.jpg
│   │
│   ├── Province hero banner images
│   │   ├── province-agusan-norte.jpg
│   │   ├── province-agusan-sur.jpg
│   │   ├── province-surigao-norte.jpg
│   │   ├── province-surigao-sur.jpg
│   │   └── province-dinagat.jpg
│   │
│   ├── General content images
│   │   └── about-caraga.jpg
│   │
│   └── Tourist spot photos (spot-*.jpg)
│       ├── spot-balanghai.jpg
│       ├── spot-masao.jpg
│       ├── spot-bood.jpg
│       ├── spot-butuan-cathedral.jpg
│       ├── spot-agusan-river.jpg
│       ├── spot-nasipit.jpg
│       ├── spot-butuan-market.jpg
│       ├── spot-national-museum-butuan.jpg
│       ├── spot-marsh.jpg
│       ├── spot-manobo-floating.jpg
│       ├── spot-mainit.jpg
│       ├── spot-sibagat.jpg
│       ├── spot-diwata.jpg
│       ├── spot-banwaon.jpg
│       ├── spot-bayugan.jpg
│       ├── spot-siargao.jpg / spot-cloud9.jpg
│       ├── spot-sugba.jpg
│       ├── spot-magpupungko.jpg
│       ├── spot-siargao-islands.jpg
│       ├── spot-sohoton-bucas.jpg
│       ├── spot-homonhon.jpg
│       ├── spot-mabua.jpg
│       ├── spot-hikdop.jpg
│       ├── spot-siargao-mangrove.jpg
│       ├── spot-delight-island.jpg
│       ├── spot-surigao-city.jpg
│       ├── spot-enchanted.jpg
│       ├── spot-tinuyan.jpg
│       ├── spot-britania.jpg
│       ├── spot-cantingas.jpg
│       ├── spot-lianga-bay.jpg
│       ├── spot-manobo-village.jpg
│       ├── spot-sohoton-dinagat.jpg / spot-sohoton.jpg
│       ├── spot-jellyfish-lagoon.jpg
│       ├── spot-basilisa-bio.jpg / spot-biolum.jpg
│       ├── spot-bitaug.jpg
│       ├── spot-hagakhak.jpg
│       ├── spot-lake-bababu.jpg
│       └── spot-dinagat-heritage.jpg
│
├── provinces/                            # One HTML file per province
│   ├── agusan-norte.html                 # Agusan del Norte province page
│   ├── agusan-sur.html                   # Agusan del Sur province page
│   ├── surigao-norte.html                # Surigao del Norte province page
│   ├── surigao-sur.html                  # Surigao del Sur province page
│   └── dinagat.html                      # Dinagat Islands province page
│
└── pages/                                # Standalone section pages
    ├── tourist-spots.html                # Full listing of all tourist spots
    ├── culture-events.html               # Festivals, calendar, indigenous peoples, arts
    ├── delicacies.html                   # Regional food, glossary, where to eat
    ├── notable-personalities.html        # Historical and modern personalities
    └── contact.html                      # Contact form, FAQ, office info, map
```

> **Note on image fallbacks:** Every card that displays an image also has a CSS gradient background as a fallback. If an image file is missing, the `onerror="this.style.display='none'"` attribute hides the broken image and the CSS gradient shows instead, maintaining the visual design at all times. This means the site never looks broken, regardless of which images are present.

---

## Page-by-Page Breakdown

### Homepage (`index.html`)

The homepage is the largest and most feature-rich page in the project. It serves as the complete overview and entry point to all other sections. It is a single long-scroll page with multiple named anchor sections that the navbar links jump to.

#### Loading Screen

Every page on the site opens with a full-screen loading animation. The loader (`#loader`) displays the Roman numeral "XIII" in a rounded box, a CSS-animated spinning circle (`.spinner`), the word "CARAGA" in large white letters, and the subtitle "REGION XIII · PHILIPPINES". It covers the entire viewport with a solid teal background (`var(--deep-cyan)`). Once the `window.load` event fires, JavaScript adds the `.hidden` class which triggers a CSS `opacity: 0` transition over 500ms. After the transition completes, `display: none` is applied so it no longer blocks interaction. The 1.1-second minimum delay ensures the animation is fully visible even on fast connections.

#### Hero Slideshow (`#home`)

The hero occupies `100vh` (minimum 600px) and is the most visually elaborate section of the site. It contains six full-screen slides, each representing a different major Caraga destination:

1. **Siargao Island** — deep ocean blue gradient, `hero-siargao.jpg`
2. **Hinatuan Enchanted River** — deep teal gradient, `hero-enchanted.jpg`
3. **Tinuy-an Falls** — forest green gradient, `hero-tinuyan.jpg`
4. **Agusan Marsh** — olive green gradient, `hero-marsh.jpg`
5. **Sohoton Cove, Dinagat** — deep purple gradient, `hero-sohoton.jpg`
6. **Britania Islands** — ocean blue gradient, `hero-britania.jpg`

Each slide has four layers stacked using `position: absolute; inset: 0`:

1. `.slide-bg` — the background photo. Starts at `transform: scale(1.05)` and animates to `scale(1.0)` with an 8-second ease transition when the slide becomes active. This is the **Ken Burns effect** — the photo very slowly zooms out, making it feel alive.
2. `.slide-gradient` — a semi-transparent colored gradient overlay (`opacity: 0.88`) unique to each slide, giving each destination its own visual identity.
3. A dark-to-transparent gradient at the bottom (`linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.22) 60%, transparent 100%)`) ensuring the white text below is always readable.
4. `.slide-content` — the text area. Starts at `opacity: 0; transform: translateY(18px)` and animates in with a 0.9-second transition and a 0.4-second delay — the photo appears first, then the text slides up into place. Contains: a location pill tag (e.g. "SURIGAO DEL NORTE"), the destination name as `<h1>`, a tagline paragraph, and an "Explore Now" button linking to the relevant province page.

The slideshow includes:
- **Prev/Next arrow buttons** using frosted glass styling (`backdrop-filter: blur(8px)`). Click either to change slides and reset the auto-play timer.
- **Dot indicators** positioned bottom-left. The active dot stretches from 8px wide to 28px wide (pill shape) via a CSS `width` transition. Clicking any dot jumps to that slide.
- **Auto-advance** every 6,000ms via `setInterval`.
- **Touch swipe support** — `touchstart` records the X position, `touchend` calculates the delta; any swipe over 50px triggers `changeSlide()`.

Overlaid on the slideshow (always visible regardless of which slide is showing):
- **Region badge** (top-right) — frosted glass panel with "XIII" in mint green, "Caraga Region" in white, and "Land of Promise · Philippines" in muted text
- **Stats strip** (very bottom) — `background: rgba(0,0,0,0.42); backdrop-filter: blur(16px)` bar, height 90px, showing 5 key region statistics: 5 Provinces, 2 HUC Cities, 2.8M+ Population, 21K+ km² Area, 320 AD Est. History. Stats are separated by subtle `rgba(255,255,255,0.1)` right borders.
- **Scroll indicator** (right side) — a CSS mouse icon with a bouncing scroll wheel dot (`@keyframes scrollDown`), and vertical "Scroll Down" text (`writing-mode: vertical-rl`)

#### About Section (`#about`)

A two-column CSS Grid (`grid-template-columns: 1fr 1fr; gap: 72px`). The left column holds a decorative image frame — a gradient-bordered container (`padding: 4px` on a `linear-gradient(135deg, var(--summer-green), var(--med-green))` background creating a visible gradient edge), a placeholder icon if no photo loads, a pink "Est. 1951" badge positioned at `bottom: -18px; right: -18px`, and a row of province quick-link pill buttons below (`.pml-btn`, one per province, each with a unique color class: `pml-an`, `pml-as`, `pml-sn`, `pml-ss`, `pml-dn`).

The right column has three descriptive paragraphs about the region's geography, history, and indigenous communities; a 2×2 grid of highlight items (Regional Center, Total Area, Population, Established date) each with an icon box; and a primary "Explore the Provinces" CTA button.

#### History Timeline (`#history`)

A vertical timeline with a decorative gradient line running down the center. The line is created with a `::before` pseudo-element on `.timeline`:
```css
content: '';
position: absolute;
left: 50%;
top: 0; bottom: 0;
width: 2px;
background: linear-gradient(to bottom, var(--deep-cyan), var(--summer-green), var(--dark-hot-pink));
transform: translateX(-50%);
```

Each `.timeline-item` uses a 2-column CSS Grid. Even-numbered items place the date on the left and the card on the right. Odd-numbered items are reversed — date on the right, card on the left. This creates the classic alternating timeline layout. A `.timeline-dot` circle sits on the center line for each event.

Each card has a small era category tag in the `tl-era-tag` style (e.g. "Ancient History", "Pre-Colonial", "Spanish Colonial", "World War II") styled in pink with a pink background tint.

The 17 timeline entries:
- The Balanghai Era (~320 AD) — ancient plank boats, Southeast Asia's oldest watercraft
- The Gold Trade Period (~900–1000 AD) — 1,500+ gold artefacts, trade networks to Java, Borneo, China
- Rajah Kiling's Mission to China (1001 AD) — first Philippine diplomatic contact with a major world empire
- The Rajahnate of Butuan — 9th–11th century gold kingdom, sophisticated pre-colonial civilisation
- Magellan's First Philippine Landing (March 17, 1521) — Homonhon Island, Surigao del Norte
- Spanish Colonisation Begins (1563) — Augustinian missionaries, colonial footholds
- Jesuit Missions Established (1609) — reduction towns, Caraga Revolt of 1631
- Three Centuries Under Spain (16th–19th century) — churches, abaca and timber economy
- American Period & Modernisation (early 1900s) — schools, roads, telegraph, agricultural expansion
- World War II (1941–1945) — Japanese occupation, guerrilla resistance, Battle of Surigao Strait
- Balanghai Boats Unearthed (1970s/1976) — discovery at Libertad, Butuan; carbon-dated to 320 AD
- Agusan Marsh Declared Wildlife Sanctuary (1976) — Proclamation 1038; Ramsar site 1999
- Siargao Emerges on the World Stage (1992) — Cloud 9 discovered by international surfers
- Republic Act 7901 — Caraga Becomes Region XIII (February 23, 1995)
- First Siargao International Surfing Cup (1996) — Asia's top annual surf event established
- Dinagat Islands — Caraga's 5th Province (2006/2013) — Republic Acts 9355 and 10020
- Typhoon Pablo (Bopha) Devastates Caraga (December 2012) — Super Typhoon, widespread damage
- Caraga Goes Global (2015–Present) — Enchanted River viral, Siargao "Best Island in the World" 2021

#### Provinces Section (`#provinces`)

A filterable grid of 5 province cards. Four filter buttons above the grid (`filterProvinces()`) use `data-category` values:
- `all` — shows all 5 cards
- `agusan` — shows Agusan del Norte and Agusan del Sur
- `surigao` — shows Surigao del Norte and Surigao del Sur
- `island` — shows Dinagat Islands

Each card is an `<a>` tag (the entire card is clickable) linking to the province's dedicated page. Card structure:
- A `.province-img` area (200px) containing the province photo, a gradient fallback background, a transparent icon frame, a dark gradient overlay, and the province name label overlaid at the bottom-left
- A `.province-body` with a category tag pill, the province name as `<h3>`, a 2-sentence description, 3 spot mini-chips (`.pspot` rounded tags), 2 metadata items (capital + area or founding date), and a `.province-cta-hint` "Explore Province →" line that starts `opacity: 0; transform: translateX(-6px)` and fades/slides in on card `:hover`

#### Tourist Spots Carousel (`#tourist-spots`)

A horizontally scrollable carousel containing 9 spot cards, with left/right arrow navigation and dot position indicators. The carousel uses `overflow-x: auto; scrollbar-width: none; scroll-behavior: smooth` — the scrollbar is hidden but scroll events and touch dragging still work.

`scrollCarousel(dir)` calculates scroll position by getting the first card's `offsetWidth` plus the 22px CSS gap, multiplying by the number of cards per page (1/2/3 depending on viewport), and calling `carousel.scrollTo()` with the result. `getCardsPerPage()` returns different values based on `window.innerWidth` thresholds (600px and 900px).

Dots are dynamically created by `initCarouselDots()` — the count equals `Math.ceil(cards.length / perPage)`. A scroll event listener on the carousel recalculates `carouselPage = Math.round(carousel.scrollLeft / (cardW * perPage))` and calls `updateCarouselDots()` to keep the indicator in sync with manual scrolling.

Spots in the carousel: Cloud 9 Siargao, Enchanted River, Tinuy-an Falls, Sugba Lagoon, Agusan Marsh Wildlife Sanctuary, Britania Islands, Magpupungko Rock Pools, Sohoton Cove Dinagat, Lake Mainit.

#### Culture & Events Section (`#events`)

A `repeat(auto-fit, minmax(250px, 1fr))` CSS Grid of 6 festival event cards. Each card has a left-edge teal/green gradient stripe (4px wide `::before` pseudo-element), a colored icon box (three variants: default teal, `.pink-box`, `.green-box`), a pink month label, and a location line. Events covered: Balanghai Festival (August), Bonok-Bonok Maradjao Kataw (September), Kahimunan Festival (October), Cloud 9 Surfing Cup (September), Panaghiusa sa Kinaiyahan (June), Caraga Fiesta (December).

#### Interactive Map Section (`#region-map`)

An embedded Google Maps iframe (500px height) with 6 tab buttons. `switchMap()` handles tab clicks: it looks up the destination URL in a `mapUrls` object keyed by province string, sets `iframe.src`, removes `.active` from all tabs, and adds it to the clicked tab. Below the iframe, a `.map-legend` strip explains the color-coding for each province's marker. Map tab destinations and zoom levels: Whole Region (z=8), Agusan Norte → Butuan City (z=11), Agusan Sur → Prosperidad (z=10), Surigao Norte → Siargao Island (z=11), Surigao Sur → Tandag City (z=10), Dinagat → Dinagat Islands (z=11).

---

### Province Pages (`provinces/`)

All five province pages share an identical structural template but contain completely unique content. Each one links to the shared `style.css` and `main.js`. Page-specific styles go in a `<style>` block in `<head>` only when needed. All paths use `../` because these files live one level deeper than the root.

#### Province Hero

A `min-height: 70vh` div with three stacked position-absolute layers: the background image div (province-specific gradient + optional photo), a dark gradient overlay div, and the hero content. The background starts at `transform: scale(1.03)` and slowly zooms out on hover (Ken Burns effect). Hero content: breadcrumb (`Home → Provinces → [Name]`), province name `<h1>`, `.province-hero-sub` tagline, and a `.province-hero-stats` strip with 4 stat items.

#### Province Overview

Two-column grid: descriptive paragraphs (3) on the left; a colored info panel on the right containing a 2×3 grid of white rounded fact cards. Each fact card shows a teal label and a bold value.

#### Tourist Spots Grid

A `repeat(auto-fill, minmax(290px, 1fr))` grid of `.province-spot-card` elements. Each card has a 200px image area with gradient fallback, `onerror` image hiding, dark overlay, `.psc-badge` category label, `.psc-gmap-btn` Google Maps button. The body has the spot name, a detailed description (80–150 words), `.psc-tag` activity tags, and a `.psc-info` location note. Number of spot cards per province:

| Province | Spot Cards | Highlights |
|----------|-----------|-----------|
| Agusan del Norte | 8 | Balanghai Museum, National Museum, Masao Beach, Bood Promontory, Cathedral, Agusan River, Nasipit Port, Butuan City food scene |
| Agusan del Sur | 7 | Agusan Marsh, Manobo Floating Villages, Lake Mainit, Sibagat/Veruela Falls, Diwata Mountains, Banwaon Communities, Bayugan City |
| Surigao del Norte | 12 | Cloud 9, Sugba Lagoon, Magpupungko, Naked/Daku/Guyam Islands, Sohoton Bucas, Lake Mainit, Mabua Beach, Homonhon, Hikdop, Siargao Mangrove, Delight Island, Surigao City Heritage |
| Surigao del Sur | 6 | Enchanted River, Tinuy-an Falls, Britania Islands, Cantingas River, Lianga Bay, Manobo Communities |
| Dinagat Islands | 7 | Sohoton Cathedral Caves, Stingless Jellyfish Lagoon, Basilisa Bioluminescent Bay, Bitaug Beach, Hagakhak Rock Arches, Lake Bababu, San Jose Heritage |

#### Interactive Province Map

Each province page defines its own `provMapUrls` object in an inline `<script>` at the bottom of the page. `switchProvMap()` handles the tab switching. Tab counts per province:

| Province | Tabs | Locations |
|----------|------|----------|
| Agusan Norte | 5 | Province View, Butuan City, Balanghai Site, Masao Beach, Nasipit Port |
| Agusan Sur | 5 | Province View, Agusan Marsh, Lake Mainit, Bayugan City, Prosperidad |
| Surigao Norte | 6 | Province View, Siargao Island, Cloud 9, Sugba Lagoon, Surigao City, Lake Mainit |
| Surigao Sur | 5 | Province View, Enchanted River, Tinuy-an Falls, Britania Islands, Tandag City |
| Dinagat Islands | 5 | Province View, Sohoton Cove, Basilisa, San Jose, Loreto/Bitaug |

#### How to Get There

Four travel tip cards in `repeat(auto-fit, minmax(240px, 1fr))` grid. Each covers a transport method (By Air, By Sea, By Bus, Getting Around) with province-specific routes, times, and practical notes (e.g., "check tide tables before visiting Sohoton," "bring cash — ATM availability on Dinagat is limited").

---

### Tourist Spots (`pages/tourist-spots.html`)

A comprehensive listing of all tourist spots across every province in one filterable view.

#### Sticky Filter Bar

Sticks to `top: 66px` using `position: sticky; z-index: 90`. Horizontally scrollable with `overflow-x: auto; scrollbar-width: none`. Contains "All Spots" plus 5 province filter buttons and a live "Showing X spots" badge that updates on every `filterSpots()` call.

#### All Spots Grid

`repeat(3, 1fr)` grid (2 at 1024px, 1 at 640px). 18 spot cards total. Each has `data-province` for filtering. `filterSpots()` loops through all cards, shows/hides by matching `data-province`, replays a `fadeInUp` animation using the `void card.offsetWidth` reflow trick, updates the count badge, and shows/hides an empty state message when zero results match.

#### Province CTA Section

Five colored `<a>` cards linking to individual province pages. Each has a gradient background, province label, name, spot count, and a bottom-right arrow circle. Hover: `translateY(-4px)` lift, deeper shadow, subtle white overlay via `::after`.

---

### Culture & Events (`pages/culture-events.html`)

#### Page Hero

Deep forest green gradient. A decorative `::after` pseudo-element renders the Chinese character 文化 ("culture") in enormous near-invisible white letters as a background design element. Hero stat pills (`.ce-stat-pill`) show: 30+ Annual Festivals, 5 Indigenous Peoples, 1,700+ Years of History, National Cultural Treasures.

#### Balanghai Spotlight Section

A two-column feature section. Left: image frame with gradient border and festival badge. Right: section label, heading, divider, two descriptive paragraphs, a 2×2 fact grid (When, Where, Highlights, Significance), and a primary CTA button.

#### Festivals Grid

Nine festival cards in `repeat(auto-fill, minmax(340px, 1fr))`. Each uses `flex-direction: column` with `flex: 1` on the description so all cards in a row share equal height regardless of description length. Month and province badges overlay the image. `data-cat` attribute contains space-separated category values so cards can appear under multiple filters.

Festivals documented:
1. Balanghai Festival — August, Butuan City — Heritage, Fluvial, Street Dancing
2. Bonok-Bonok Maradjao Kataw — September, Surigao City — Maritime, Cultural, Fluvial
3. Kahimunan Festival — October, Butuan City — Religious, Procession, Heritage
4. Siargao International Surfing Cup — September, Siargao Island — Sports, International
5. Panaghiusa sa Kinaiyahan — June, Agusan del Sur — Environmental, Indigenous, Eco-Tourism
6. Caraga Fiesta — December, Region-wide — Regional, Trade Fair, Culture
7. Sinulog sa Butuan — January, Butuan City — Religious, Street Dance, Santo Niño
8. Araw ng Surigao — March, Surigao City — City Anniversary, Trade Fair, Cultural
9. Banog Festival — April, Bislig City — Wildlife, Eco-Culture, Kite Festival

#### Annual Calendar Strip

A 4-column CSS Grid (12 cells, one per month). Each cell shows the month name and 2 event entries with colored category dots. A legend below explains: teal = cultural/heritage, pink = religious/civic, green = environmental/sports. The grid responsively collapses from 4 → 3 → 2 → 1 columns as the viewport shrinks.

#### Indigenous Peoples Section

Five cards in `repeat(auto-fill, minmax(280px, 1fr))` with the same left-edge gradient stripe as event cards. Groups profiled with full historical and cultural detail:
- **Manobo** (Agusan del Sur) — marsh communities, beadwork, baylan (spiritual healers), floating houses
- **Mamanwa** (Agusan del Norte / Surigao del Norte) — Negrito people, considered among the oldest ethnic groups in Southeast Asia, honey-gathering from dipterocarp trees
- **Higaonon** (Agusan del Norte / Misamis Oriental) — "people of the mountains," datu governance, adat customary law, geometric textiles
- **Banwaon** (Agusan del Sur) — upper Agusan River valley, agricultural rituals, kubing jaw harp and gimbal drum
- **Surigaonon** (Surigao provinces / Dinagat Islands) — maritime culture, fishing, boat-building, oral literature, mangungubat healers

#### Arts, Music & Traditions Section

Six cards in a 3-column grid:
1. Abaca & Traditional Weaving — Manobo and Banwaon geometric textile traditions
2. Balanghai Boat Building — ancient plank-sewn watercraft techniques still practiced
3. Butuan's Gold Tradition — 1,500+ recovered artefacts, 9th–11th century goldsmithing
4. Tribal Dance & Ritual — Manobo kaamulan dances, Surigaonon maritime celebration dances
5. Indigenous Music — kubing (jaw harp), gimbal (drum), kulintang (gong ensemble)
6. Bamboo & Rattan Crafts — Agusan del Sur highland weaving, baskets and furniture

---

### Delicacies (`pages/delicacies.html`)

#### Page Hero

Dark amber/brown gradient (`#3d1500 → #7a3200 → #b85a00`) reflecting the warmth of food. Decorative radial gradient glows via `::before` and a large emoji plate watermark via `::after`. Hero pills: Fresh Seafood Capital, Indigenous Recipes, Kakanin Traditions, Centuries-Old Recipes.

#### Kinilaw Spotlight

Two-column feature section spotlighting kinilaw na isda as Caraga's signature dish. Pink "No. 1 Must Try" badge overlaid on the image frame. Fact grid: Main Ingredient (fresh tuna/tanigue/lapu-lapu), Key Flavour (sour, spicy, coconut-creamy), Best Found In (Surigao del Norte, Siargao Island), Occasion (festivals, everyday meals). Followed by two descriptive paragraphs.

#### Delicacies Grid

14 food cards in `repeat(auto-fill, minmax(320px, 1fr))`, filterable by: All, Seafood, Kakanin & Rice, Savoury Dishes, Sweets & Snacks, Drinks.

| Name | Category | Province |
|------|----------|----------|
| Kinilaw na Isda | Seafood | Surigao del Norte |
| Sinalaw | Seafood / Savoury | Agusan del Sur |
| Inubarang nga Manok | Savoury | Agusan del Norte |
| Tinuom | Savoury | All Provinces |
| Kalamay | Kakanin / Sweet | Surigao del Norte |
| Puto Gabi | Kakanin / Sweet | Agusan del Norte |
| Bibingka sa Bao | Kakanin / Sweet | Surigao del Sur |
| Pastil | Savoury / Kakanin | Agusan del Sur |
| Lechon Caraga-Style | Savoury | All Provinces |
| Lake Mainit Sardines | Seafood / Savoury | Agusan del Sur |
| Sinugbang Isda sa Siargao | Savoury | Surigao del Norte |
| Panyalam | Sweet / Kakanin | Dinagat Islands |
| Tapuy (Indigenous Rice Wine) | Drink | Agusan del Sur |
| Tuba (Coconut Wine) | Drink | Surigao del Norte |

#### Where to Eat Section

Six location cards: Butuan City Public Market, Surigao City Baywalk, Siargao Island Food Scene, Agusan Marsh Floating Villages, Tandag City Karinderyas, Bislig City Night Market. Each has an icon box, description, and a location chip.

#### Food Glossary

A 3-column grid of 9 entries explaining key food terms encountered when eating in Caraga:
- **Sukang Tuba** — native coconut wine vinegar aged with mangrove bark
- **Batwan** — souring fruit (Garcinia binucao) native to Mindanao
- **Kakanin** — the general Filipino term for rice cakes
- **Bubod** — traditional natural yeast starter for tapuy rice wine
- **Barok** — dried mangrove bark used to age tuba into vinegar
- **Panutsa** — raw unrefined cane sugar in solid block form
- **Tanglad** — lemongrass; essential aromatic in many Caraga dishes
- **Inubarang** — the technique of cooking food inside a bamboo tube over fire
- **Pasalubong** — gifts brought home from travel; kalamay and dried fish are Caraga's most popular

---

### Notable Personalities (`pages/notable-personalities.html`)

#### Page Hero

Purple/violet gradient (`#1a0050 → #3d006e → #6600b0`) with two decorative CSS orbs (`::before/::after` as `border-radius: 50%; radial-gradient(circle, ...)` blobs) adding visual depth without any images. Dark-to-transparent gradient overlay for text readability.

#### Sticky Filter Bar

Horizontally scrollable with `overflow-x: auto`. Filters: All, Politics & Government, Sports, Arts & Entertainment, History & Heritage, Religion, Business. A live "Showing X personalities" badge (`#persCount`) is updated by `filterPersonalities()` on every filter change.

#### Personalities Grid

16 cards in a 3-column grid. Each `.personality-card` has:
- A `.pc-header` — height 160px gradient band. `::before/::after` decorative circles add depth. Contains a `.pc-avatar` 72px circle with initials fallback (or photo), a `.pc-field-badge` frosted glass label top-right, and a `.pc-province-tag` dark label top-left.
- A `.pc-body` — white area with `<h3>` name, `.pc-title` role/title in `#6600b0` purple, `.pc-bio` paragraph, `.pc-tags` keyword chips, and `.pc-meta` birthplace/era line.

Two cards use the `.featured` class, spanning 2 grid columns with `flex-direction: row` — the header becomes a left panel and the body fills the right side. Featured cards use `.pc-featured-label` and `.pc-featured-name` elements inside the header column.

**Featured (2-column) cards:**
- **Emmanuel "Manny" Pacquiao** (Sports) — only 8-division world boxing champion in history, Senator, born in Kibawe / raised in General Santos
- **Rajah Kiling** (History) — Ruler of the Rajahnate of Butuan, first Philippine diplomat to China (1001 AD), one of the earliest named figures in Philippine recorded history

**Other personalities:**
- Jose "Pepe" Aquino — Pioneer Governor of Agusan Province, early 20th century
- Rodolfo Valencia — Long-serving Governor of Oriental Mindoro, born Surigao City
- Glenda Organo — Associate Justice, Supreme Court of the Philippines, from Surigao del Norte
- Mark Magsayo — WBC Featherweight Champion (2022), born Anao-Aon, Surigao del Norte
- Nonito Donaire Jr. — "The Filipino Flash," 4-division world champion, Mindanao-raised
- Nestor Colonia — National Chess Champion & FIDE Master, Butuan City
- Felipe Padilla de León — National Artist for Music, composer of "Bayan Ko," born Surigao City (1912)
- Leah Navarro — Singer, actress, civil society advocate, Butuan City roots
- Romulo Caballero — Acclaimed visual artist, Tandag City, Surigao del Sur
- Rajah Kolambu — Ruler of Butuan at Magellan's arrival (1521), guided fleet to Cebu
- Fr. Saturnino Urios, S.J. — Jesuit missionary, founded modern education in Butuan (arrived 1877)
- Bishop Carmelo Morelos — First Bishop of the Diocese of Butuan (established 1951)
- Andres "Andy" Lim — Pioneer mining & agribusiness entrepreneur, Surigao del Norte

#### Quote Banner

Full-width `linear-gradient(135deg, #1a0050, #3d006e)` section. A large decorative `"` character in near-invisible white. Featured quote about Caraga's people, attribution line.

---

### Contact (`pages/contact.html`)

#### Page Hero

Dark teal-to-cyan gradient. A decorative grid pattern via `::before` using `background-image: linear-gradient(rgba(150,228,176,0.06) 1px, transparent 1px), linear-gradient(90deg, ...)` at `background-size: 48px 48px`. A large faint "XIII" text watermark via `::after`.

#### Info Cards Strip

Four quick-info cards in a `repeat(4, 1fr)` grid. Each has a colored icon box (four variants: `ci-teal`, `ci-green`, `ci-pink`, `ci-mint`), an uppercase label, and a value. Cards: Location (Butuan City, Agusan del Norte), Phone (two numbers with `<a href="tel:..."`), Email (two addresses with `<a href="mailto:..."`), Office Hours (Mon–Fri 8AM–5PM, Sat–Sun Closed).

#### Contact Form Card (Left Column)

A white card (`padding: 42px 38px; box-shadow: var(--shadow-md)`). Form fields with static labels (not floating labels — overrides the global CSS pattern with `position: static`). Fields:
- First Name + Last Name side-by-side (`.form-two-col` grid)
- Email + Phone side-by-side
- Province/City `<select>` with optgroups for Caraga provinces and "Outside Caraga". Custom dropdown arrow via SVG data URL in `background-image`.
- Topic of Inquiry chips — clickable `.topic-chip` elements that toggle `.selected` class. Selected state shows a filled teal checkbox (`.chip-check::after` with SVG checkmark via data URL background)
- Subject text input
- Message textarea (`min-height: 130px; resize: vertical`)
- Full-width gradient submit button with a paper-plane SVG icon

Form validation (`handleSubmit()`): required fields (firstName, lastName, email, subject, message) get a pink border + shadow highlight (`border-color: var(--dark-hot-pink); box-shadow: 0 0 0 4px rgba(228,80,154,0.12)`) that auto-clears after 1.8 seconds. On success, the form hides and `.form-success-msg` shows (`.show` class adds `display: block`).

#### Sidebar (Right Column, 340px)

Four stacked sidebar cards:
1. **Regional Office** — three `office-row` items (address, telephone, email), each with a small icon box
2. **Office Hours** — seven `.hours-row` items (Mon–Sun) with `.badge-open` (green) or `.badge-closed` (pink) pills
3. **Follow Us** — three `.scl-item` social links (Facebook, Instagram, YouTube) with platform-specific icon boxes (`.si-fb` blue, `.si-ig` gradient, `.si-yt` red) using actual SVG-drawn platform icons
4. **Find Us on the Map** — a sidebar card with an embedded Google Maps iframe (190px, Butuan City)

#### FAQ Section

A `repeat(1fr 1fr)` two-column grid (collapses to 1 column on mobile) of 6 accordion items. `toggleFaq()` closes all other items before opening the clicked one. The slide-down effect uses `max-height: 0 → max-height: 220px` with `overflow: hidden` and a 0.35s ease transition. The chevron SVG icon rotates 180° on `.open`. Questions answered:
1. How do I get to Caraga Region XIII?
2. What is the best time to visit Caraga?
3. Is Siargao easy to visit from Butuan?
4. Are there entrance fees for the Enchanted River?
5. Who do I contact for tourism permits or events?
6. How long does it take to explore all five provinces?

---

## Tech Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| **Markup** | HTML5 | Semantic elements throughout: `<nav>`, `<section>`, `<footer>`, `<aside>`. `<article>`, `<figure>`. Minimal `<div>` usage. |
| **Styling** | CSS3 | Single shared `style.css` (~1,400 lines) plus page-level `<style>` blocks. Uses CSS Grid, Flexbox, Custom Properties, `clamp()`, `@keyframes`, `backdrop-filter`, `position: sticky`, and CSS pseudo-elements extensively. |
| **Interactivity** | Vanilla JavaScript ES6+ | Single `main.js` (~400 lines). Uses `IntersectionObserver`, `classList`, `scrollTo()`, `addEventListener`, arrow functions, template literals. No jQuery, no React, no external libraries of any kind. |
| **Fonts** | Google Fonts — Poppins | Weights 300, 400, 500, 600, 700, 800. Loaded via `@import url(...)` in CSS. Used for all text sitewide. Falls back to `sans-serif`. |
| **Maps** | Google Maps Embed API | No API key required for basic embeds. All maps use the `?output=embed` query parameter with specific `q=` search terms and `z=` zoom levels. |
| **Icons** | Inline SVG | Every icon is a hand-written `<svg>` element using `viewBox="0 0 24 24"`, `stroke: currentColor`, `fill: none`, `stroke-linecap: round`. Consistent line-art aesthetic sitewide. Zero HTTP requests for icons. |
| **Images** | Static JPG/PNG files | All referenced by relative path. Every image element has `onerror="this.style.display='none'"` and every image container has a CSS gradient fallback. |

---

## JavaScript Architecture (`js/main.js`)

All interactive behaviour lives in one ~400-line file. No imports, no modules, no bundling step. Every function is global scope and callable from HTML `onclick` attributes.

### Page Loader

```javascript
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');     // CSS: opacity: 0, pointer-events: none
      setTimeout(() => loader.style.display = 'none', 600);  // fully remove after fade
    }
  }, 1100);  // minimum 1.1s ensures animation is always visible
});
```

### Navbar Scroll Behaviour

The scroll listener uses `{ passive: true }` for performance. At `scrollY > 60`, `.scrolled` is added to `#navbar` — CSS responds with a darker background color and box shadow. The back-to-top button (`.visible` class) appears at the same threshold. Both are removed when scrolling back above 60px.

```javascript
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar?.classList.add('scrolled');
    backTop?.classList.add('visible');
  } else {
    navbar?.classList.remove('scrolled');
    backTop?.classList.remove('visible');
  }
  updateActiveNav();
}, { passive: true });
```

### Active Navigation Highlighting

`updateActiveNav()` is called on every scroll event. It iterates through a `navSections` array of section IDs and checks `window.scrollY >= el.offsetTop - 110`. The 110px offset accounts for navbar height so sections are considered "active" before they fully reach the top. The matching nav link gets `.active`, all others lose it.

### Mobile Menu

`toggleMenu()` called from hamburger `onclick` — flips `.open` on the hamburger (animates three lines into an X via CSS transforms) and on the `#mobileMenu` drawer. `closeMenu()` removes both. An outside-click document listener detects clicks outside both elements and calls `closeMenu()`. The nested Provinces submenu accordion is set up as a separate `click` listener in `DOMContentLoaded`.

### Hero Slideshow

Three state variables: `currentSlide` (index, starts at 0), `slideTimer` (interval reference for cleanup), and DOM queries to all `.slide` and `.dot` elements. The core `showSlide(n)` function:

```javascript
function showSlide(n) {
  if (slides.length === 0) return;
  slides[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  // Double modulo handles negative indices correctly (backwards from slide 0 = last slide)
  currentSlide = ((n % slides.length) + slides.length) % slides.length;
  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
}
```

`resetSlideTimer()` clears any existing interval before creating a new one — prevents multiple simultaneous timers from stacking up when the user clicks arrows rapidly. Touch swipe detection compares `touchstart` and `touchend` X coordinates; differences over 50px trigger `changeSlide()`.

### Tourist Spots Carousel

`getCardsPerPage()` returns 1 (width < 600px), 2 (600–900px), or 3 (> 900px). `initCarouselDots()` generates dots: `pages = Math.ceil(cards.length / perPage)`. `scrollCarousel(dir)` calculates pixel offset: `carouselPage * cardW * perPage` where `cardW = card.offsetWidth + 22`. Both the scroll listener and manual navigation maintain `carouselPage` state so dots always reflect the current visible position. `window.addEventListener('resize')` rebuilds dots when viewport changes.

### Province & Spots Filtering

Both `filterProvinces()` and `filterSpots()` follow this pattern:

```javascript
function filterProvinces(category, btn) {
  // 1. Update active button
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // 2. Show/hide cards
  document.querySelectorAll('.province-card').forEach(card => {
    const matches = category === 'all' || card.dataset.category === category;
    if (matches) {
      card.style.display = '';
      // 3. Replay animation on reveal
      card.style.animation = 'none';
      void card.offsetWidth;  // forces browser to process the 'none' before re-adding
      card.style.animation = 'fadeInUp 0.4s ease';
    } else {
      card.style.display = 'none';
    }
  });
}
```

The `void card.offsetWidth` line forces a DOM reflow — without it, setting `animation: none` and then re-setting it in the same JS microtask would be batched and the animation wouldn't restart.

### Scroll-Triggered Animations

```javascript
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);  // stop watching once it has animated
      }
    });
  },
  {
    threshold: 0.08,              // triggers at 8% visibility
    rootMargin: '0px 0px -36px 0px'  // shrinks bottom edge of viewport slightly
  }
);
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
```

`unobserve()` after triggering means each element only animates once, even if the user scrolls back past it — matching the expected UX of scroll reveals.

### Smooth Anchor Scrolling

All `<a href="#...">` links are intercepted by a `querySelectorAll('a[href^="#"]')` listener. For each click: get the target element, calculate `getBoundingClientRect().top + window.scrollY - navbarHeight`, and call `window.scrollTo({ top, behavior: 'smooth' })`. Without the navbar height offset, the target section's heading would be hidden behind the sticky navbar.

### Contact Form Validation

`validateField(id)` checks `el.value.trim()` for emptiness. Email fields also check `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Invalid: add `.error` to wrapper (CSS applies red border), set error text. Valid: remove `.error`, clear text. `submitForm()` runs `.map(validateField).every(Boolean)`. Live removal of errors: each field has an `input` listener that re-validates only if `.error` is currently present, so errors clear the moment the user types a valid value.

### Map Switchers

Homepage uses `switchMap(key, btn)` with an inline `mapUrls` object. Each province page uses `switchProvMap(key, btn)` with that page's own `provMapUrls` object defined in its inline `<script>`. Both: look up URL by key, set `iframe.src`, update `.active` tab state. Falls back to overview URL if key not found.

---

## CSS Architecture (`css/style.css`)

The global stylesheet is organised into clearly commented sections using `/* ─── SECTION NAME ───────── */` separators. Sections (in order):

1. CSS Custom Properties (`:root`)
2. Basic Reset (`*, *::before, *::after`)
3. Typography (h1–h3, p, `.container`)
4. Hero Slideshow
5. Loading Screen (`#loader`)
6. Navbar (`#navbar`)
7. Mobile Menu (`.mobile-menu`)
8. Buttons (`.btn`, `.btn-primary`, `.btn-outline`, `.btn-cta`)
9. Section Headers (`.section-header`, `.section-label`, `.divider`)
10. About Section
11. History Timeline
12. Provinces Section
13. Tourist Spots Carousel
14. Events Section
15. Map Section
16. CTA Banner
17. Back to Top Button
18. Scroll Animations (`.fade-up`)
19. Footer
20. Province Detail Page
21. Tourist Spots Full Listing Page
22. Contact Section
23. Responsive Breakpoints

### CSS Custom Properties

```css
:root {
  --deep-cyan:    #008581;    /* Primary — buttons, headings, nav, active states */
  --med-green:    #4C9C8B;    /* Secondary — hover states, card borders, accents */
  --summer-green: #96E4B0;    /* Mint — slideshow dots, footer accents, festival highlights */
  --mimi-pink:    #FFDAE8;    /* Light pink — backgrounds */
  --amy:          #FE99CB;    /* Mid pink accent */
  --dark-hot-pink:#E4509A;    /* Strong pink — CTAs, era tags, festival months, Dinagat gradients */
  --white:        #ffffff;
  --off-white:    #F6FFFE;    /* Main page background — slightly tinted to avoid pure white */
  --text-dark:    #162928;    /* Headings, important UI text */
  --text-mid:     #3a5654;    /* Body paragraphs */
  --text-light:   #688a88;    /* Captions, labels, metadata, secondary info */
  --border:       #cde8e6;    /* Card borders, input borders, dividers */
  --shadow-sm:    0 2px 14px rgba(0,133,129,0.07);   /* Subtle card elevation */
  --shadow-md:    0 8px 32px rgba(0,133,129,0.13);   /* Hover card elevation */
  --shadow-lg:    0 20px 60px rgba(0,133,129,0.17);  /* Dramatic hover / modal elevation */
  --transition:   0.3s ease;  /* Standard hover speed used everywhere */
  --radius-sm:    6px;        /* Buttons, badges */
  --radius-md:    12px;       /* Most cards */
  --radius-lg:    20px;       /* Large containers, province cards */
}
```

### Typography — Fluid Scaling with `clamp()`

```css
h1 { font-size: clamp(2.4rem, 5vw, 4.2rem);  font-weight: 800; line-height: 1.1; }
h2 { font-size: clamp(1.7rem, 2.8vw, 2.4rem); font-weight: 700; line-height: 1.25; }
h3 { font-size: 1.08rem;                       font-weight: 600; line-height: 1.35; }
p  { font-size: 0.965rem; color: var(--text-mid); line-height: 1.8; }
```

`clamp(min, preferred, max)` lets headings scale fluidly with viewport width between defined bounds — no media queries needed just for font sizes.

### Key Animation Patterns

**Ken Burns (hero & province hero background zoom):**
```css
.slide-bg              { transform: scale(1.05); transition: transform 8s ease; }
.slide.active .slide-bg { transform: scale(1.0); }
```

**Scroll reveal:**
```css
.fade-up         { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }
/* Stagger delays for sibling items */
.fade-up:nth-child(2) { transition-delay: 0.1s; }
.fade-up:nth-child(3) { transition-delay: 0.2s; }
.fade-up:nth-child(4) { transition-delay: 0.3s; }
.fade-up:nth-child(5) { transition-delay: 0.4s; }
```

**Bouncing scroll wheel indicator:**
```css
@keyframes scrollDown {
  0%   { transform: translateY(0); opacity: 1; }
  80%  { transform: translateY(12px); opacity: 0; }
  100% { transform: translateY(0); opacity: 0; }
}
```

**Loading spinner:**
```css
@keyframes spin { to { transform: rotate(360deg); } }
.spinner {
  border: 3px solid rgba(255,255,255,0.2);  /* mostly transparent ring */
  border-top-color: #fff;                   /* one solid arc = spinning effect */
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}
```

### Reusable Component Patterns

**Frosted glass (nav, hero overlays, stats strip, festival badges):**
```css
background: rgba(255,255,255,0.15);
backdrop-filter: blur(8px);
border: 1px solid rgba(255,255,255,0.3);
```

**Left-edge gradient stripe (event cards, indigenous people cards):**
```css
.event-card::before {
  content: '';
  position: absolute; top: 0; left: 0;
  width: 4px; height: 100%;
  background: linear-gradient(to bottom, var(--deep-cyan), var(--summer-green));
}
```

**Gradient border frame (about image, spotlight image wrappers):**
```css
.about-img-frame {
  background: linear-gradient(135deg, var(--summer-green), var(--med-green));
  border-radius: 22px;
  padding: 4px;   /* the 4px gap between gradient container and inner div = visible gradient border */
}
```

**Active nav link underline dot:**
```css
.nav-link.active::after {
  content: '';
  position: absolute; bottom: 5px; left: 50%;
  transform: translateX(-50%);
  width: 16px; height: 2px;
  background: var(--summer-green);
  border-radius: 2px;
}
```

**Dropdown slide-in animation:**
```css
.dropdown-menu {
  opacity: 0; pointer-events: none;
  transform: translateX(-50%) translateY(-8px);
  transition: all var(--transition);
}
.nav-dropdown:hover .dropdown-menu {
  opacity: 1; pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}
```

**Province card gradient fallbacks:**
```css
.prov-an { background: linear-gradient(135deg, #00756f, #4C9C8B); } /* Agusan Norte — teal */
.prov-as { background: linear-gradient(135deg, #2a7a5c, #50b88e); } /* Agusan Sur — forest */
.prov-sn { background: linear-gradient(135deg, #006b6a, #009e98); } /* Surigao Norte — ocean */
.prov-ss { background: linear-gradient(135deg, #006e52, #00a87c); } /* Surigao Sur — deep green */
.prov-dn { background: linear-gradient(135deg, #c93d85, #e4509a); } /* Dinagat — hot pink */
```

**Custom scrollbar:**
```css
::-webkit-scrollbar       { width: 5px; }
::-webkit-scrollbar-track { background: var(--off-white); }
::-webkit-scrollbar-thumb { background: var(--med-green); border-radius: 3px; }
```

---

## Responsive Design

Three main breakpoints in `style.css`. Province and standalone pages add their own breakpoints inside page-level `<style>` blocks.

### `@media (max-width: 1024px)` — Tablets & Small Laptops

| Element | Change |
|---------|--------|
| `.about-grid` | 2-column → 1-column (image stacks above text) |
| `.contact-grid` | 2-column → 1-column |
| `.footer-grid` | 4-column → 2-column |
| Province spotlight sections | 2-column → 1-column |
| Culture/events arts grid | 3-column → 2-column |
| Contact info strip | 4-column → 2-column |
| FAQ grid | 2-column → (inherits, stays 2-column until 768px) |

### `@media (max-width: 768px)` — Mobile & Small Tablets

| Element | Change |
|---------|--------|
| `.nav-menu` | `display: none` |
| `.hamburger` | `display: flex` |
| `section` padding | 84px → 56px |
| Hero content padding | Reduced; title capped at 2.4rem |
| `.hero-region-badge` | Hidden |
| `.scroll-indicator` | Hidden |
| Slide dots | Repositioned to `bottom: 150px; left: 28px` |
| Stats strip items | Tighter padding |
| **Timeline** | Collapses to single column; center line moves to `left: 18px`; all items get `padding-left: 44px`; even/odd column orders reset |
| `.footer-grid` | → 2-column |
| `.cta-banner` | Stacks vertically, centers content and buttons |
| Province hero content | Padding reduced to 28px |
| Spots carousel | `.carousel-nav` hidden; layout stacks; touch scroll takes over |
| Contact info strip | 4 → 2 columns |
| FAQ grid | 2 → 1 column |
| Contact sidebar | Grid collapses to single column |

### `@media (max-width: 480px)` — Very Small Phones

| Element | Change |
|---------|--------|
| `.container` | Padding → `0 16px` |
| `.about-highlights` | 2-column → 1-column |
| `.footer-grid` | → 1-column |
| `.hero-stats-strip` | `display: none` (completely hidden) |
| `.slide-dots` | Move to `bottom: 28px` |
| `.slide-content` | Minimal padding: `28px 20px 80px` |
| Map tabs | Smaller font and padding |

---

## Design System

### Color Philosophy

The palette was chosen to reflect Caraga's natural environment:
- **Deep Cyan / Med Green** — the extraordinary teal waters of Siargao, the Enchanted River, and the Agusan waterways
- **Summer Green (Mint)** — tropical vegetation, the freshness of Caraga's rainforests and wetlands
- **Dark Hot Pink** — a vivid accent that prevents the site from looking generically "nature-themed." Used for CTAs, festival month labels, era tags, Dinagat Islands' province identity, and any element that needs to command attention.
- **Off-White** — the slight warmth of tropical sand and sunlight, rather than clinical white. The subtle teal tint maintains brand cohesion.

### Province Color Identities

Each province has its own gradient pair used consistently across every location it appears in the site (province cards, spot fallback backgrounds, hero gradients, footer highlights):

| Province | Light Stop | Dark Stop | Character & Rationale |
|----------|-----------|-----------|----------------------|
| Agusan del Norte | #4C9C8B | #00756f | Teal — the Agusan River, historical waters |
| Agusan del Sur | #50b88e | #2a7a5c | Forest green — the vast marsh and rainforest |
| Surigao del Norte | #009e98 | #006b6a | Ocean teal — Pacific waters, surfing |
| Surigao del Sur | #00a87c | #006e52 | Deep green — waterfalls, river systems |
| Dinagat Islands | #e4509a | #c93d85 | Hot pink — volcanic, unique, mysterious caves |

### Universal Hover Pattern

All interactive cards share a consistent hover state:
```css
.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--med-green);
}
```
The `-6px` lift, increased shadow depth, and subtle border color change create satisfying, readable feedback without being distracting or changing the card's size.

### Button System

Three button variants defined globally as `.btn-primary`, `.btn-outline`, `.btn-cta`. All use `display: inline-flex; align-items: center; gap: 8px` to naturally accommodate SVG icons beside text. The `.btn-cta` hot pink button is used only for the most critical call-to-action on each page, maintaining its visual weight.

---

## Content Coverage

| Content Category | Count | Notes |
|----------------|-------|-------|
| Total HTML pages | 12 | 1 homepage + 5 province pages + 5 standalone pages + contact |
| Province dedicated pages | 5 | One per province with full sections |
| Tourist spots (detailed cards across all pages) | 50+ | Province pages: 38 cards total; tourist-spots.html: 18 cards; carousel: 9 cards |
| History timeline entries | 17 | From 320 AD to 2015–present |
| Festival / event cards (grid) | 9 | On culture-events.html festivals section |
| Festival / event cards (homepage) | 6 | On index.html events section |
| Annual calendar entries | 24 | 2 per month × 12 months |
| Indigenous peoples profiles | 5 | Full multi-paragraph profiles |
| Arts & traditions cards | 6 | Weaving, boat-building, gold, dance, music, crafts |
| Regional delicacies | 14 | Detailed ingredient/flavour notes |
| Food glossary entries | 9 | Key local food terms defined |
| Where to eat locations | 6 | Specific venues with descriptions |
| Notable personalities | 16 | Across 6 fields; 2 featured 2-column cards |
| Province quick-info fact tiles | 30 | 6 tiles × 5 province pages |
| Google Maps embed locations | 36+ | All unique map tab destinations across all pages |
| FAQ entries | 6 | Contact page accordion |
| Social links | 3 | Facebook, Instagram, YouTube (contact page sidebar) |
| Contact form fields | 7 | First/last name, email, phone, province select, topic chips, subject, message |

---

## How to Run

### Simplest Method

```bash
# Download or clone the project, then open index.html in any browser:
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

This works for all content except Google Maps embeds, which may be blocked by browser security policies when the page is loaded via the `file://` protocol (rather than `http://`).

### Recommended — Local Server

```bash
# Node.js (recommended, no install needed with npx)
npx serve .
# Then visit: http://localhost:3000

# Python 3
python -m http.server 8000
# Then visit: http://localhost:8000

# PHP
php -S localhost:8000
# Then visit: http://localhost:8000

# VS Code — Right-click index.html → "Open with Live Server"
```

### Nothing to Install

Because this project has no build tools, no `package.json`, no `node_modules`, and no compilation step, there is **nothing to install**. The only resources loaded at runtime from external sources are:
- **Google Fonts (Poppins)** — requires internet connection, falls back to system `sans-serif`
- **Google Maps embeds** — requires internet connection, shows a blank iframe offline

The entire site works fully offline when served locally, with font and map as the only degraded elements.

---

## Design Decisions & Philosophy

### Why Pure HTML/CSS/JS?

The competition context rewards clarity and demonstrable craftsmanship. Using React, Vue, or similar frameworks would have added a build step, abstracted the HTML structure from the visible code, and introduced a dependency chain. Vanilla code loads faster, has zero dependency vulnerabilities, requires no environment setup to run, and can be evaluated by any judge by simply opening a file. Every line of the site is written by the team and directly readable.

### Why a Single CSS File?

All 12 pages share the navbar, footer, buttons, section headers, cards, timeline, carousel, and animation patterns. Centralising these in one `style.css` eliminates duplication, ensures visual consistency, and means a design change (like updating `--deep-cyan`) applies everywhere instantly. Page-specific styles go in `<style>` blocks inside each page's `<head>`, keeping them scoped and readable next to the HTML they style.

### Why One JavaScript File?

`main.js` contains all shared behavior. Because it's loaded at the end of every page's `<body>`, it has access to whatever DOM elements exist on that page without needing to know which page it's on. Functions guard against missing elements with null checks (`navbar?.classList.add(...)` optional chaining). Province-specific logic (`switchProvMap()`, local `provMapUrls` object) lives in each province page's own inline `<script>` rather than in `main.js`, keeping province logic co-located with province HTML.

### Why Inline SVGs for All Icons?

Icon libraries (FontAwesome, Heroicons, Feather) add HTTP requests and 100KB+ of fonts/CSS for icons that are mostly unused. Inline SVGs cost nothing at load time — they're part of the HTML, they scale perfectly at any size, they inherit CSS color via `stroke: currentColor`, they can be styled and animated with CSS, and they're self-documenting in the code. Every icon uses `viewBox="0 0 24 24"` with `stroke-width: 2`, `stroke-linecap: round`, and `stroke-linejoin: round` for a consistent visual system.

### Why CSS Gradient Fallbacks for Every Image?

In a competition context, photos may not be available on every machine that evaluates the project. By giving every image container a carefully chosen CSS gradient, the design remains intentional and polished regardless of whether photos load. The gradient colors were chosen to match each destination's actual environment — ocean blue for Siargao, teal for the Enchanted River, deep forest green for the Agusan Marsh, violet for Sohoton Cove. The site never looks broken.

### Content Depth as a Core Feature

The team made a deliberate decision to write long, accurate, detailed descriptions for every tourist spot, personality, delicacy, and historical event rather than placeholder text. The tourist spots page notes dive depths at the Enchanted River, describes the tide schedule requirements for Magpupungko, explains the etymology of "Hagakhak," documents the optimal bioluminescence viewing conditions at Basilisa Bay, and specifies the exact fast craft journey time from Surigao City to Siargao Island. This depth of content transforms the site from a design exercise into a genuinely useful tourism resource for the Caraga region.

### Accessibility Considerations

- All images have `alt` attributes
- All interactive elements (buttons, links, form inputs) are keyboard-accessible via tab navigation
- `aria-label` attributes on slideshow navigation buttons
- Semantic HTML structure throughout (`<nav>`, `<section>`, `<h1>`–`<h3>`, `<footer>`)
- Color contrast between text and backgrounds meets readability standards
- Focus states are visible on form elements (inherited from browser defaults + CSS `:focus` ring styles)

---

## Acknowledgements

Content research drawn from publicly available sources including the National Museum of the Philippines, NCIP Region XIII documentation, the Butuan City Local Government Unit, the Surigao del Norte Tourism Office, and the Philippine Department of Tourism. All written descriptions are original content authored by Team Vertex XIII.

Map embeds powered by Google Maps. Typography by Google Fonts (Poppins, designed by Jonny Pinhorn). All HTML, CSS, and JavaScript is original work by the team.

---

*© 2025 Vertex XIII · WEBster ICT Strand Competition · All rights reserved.*

*Made with ♥ for Caraga, Region XIII — the Land of Promise.*
