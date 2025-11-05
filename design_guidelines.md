# Design Guidelines: Financial Management Dashboard

## Design Approach

**Selected Approach**: Design System - Modern SaaS Dashboard
**Reference**: Stripe Dashboard + Linear's clean aesthetic for data-heavy financial applications
**Justification**: This is a utility-focused, information-dense productivity tool where clarity, efficiency, and data accuracy are paramount. A modern dashboard system provides the necessary structure for complex financial data while maintaining usability.

**Core Principles**:
- Data clarity over visual flourishes
- Instant comprehension of financial metrics
- Efficient data input workflows
- Predictable, consistent patterns

## Typography

**Font System** (via Google Fonts CDN):
- Primary: Inter (forms, data, UI)
- Accent: JetBrains Mono (currency values, numbers)

**Hierarchy**:
- Page Headers: text-3xl font-semibold
- Section Titles: text-xl font-semibold
- Card Headers: text-lg font-medium
- Body Text: text-base font-normal
- Data Labels: text-sm font-medium
- Helper Text: text-sm text-gray-500
- Currency/Numbers: font-mono text-lg font-semibold

## Layout System

**Spacing Primitives**: Use Tailwind units of 3, 4, 6, 8, and 12
- Component padding: p-6
- Section gaps: gap-6 or gap-8
- Page margins: p-8
- Card spacing: space-y-4
- Form field gaps: gap-4

**Grid Structure**:
- Dashboard: Sidebar (w-64) + Main content (flex-1)
- KPI Cards: 3-column grid (grid-cols-3 gap-6)
- Client Table: Full-width with responsive scrolling
- Chart Section: 2-column on desktop (grid-cols-2), stacked on mobile

## Component Library

### Navigation
**Sidebar** (fixed left, vertical):
- Logo/Brand area (h-16)
- Navigation items with icons (Heroicons)
- Active state indication
- Footer with user info

**Top Bar**:
- Page title
- Quick action buttons (Adicionar Cliente)
- Search/filter controls

### Dashboard Components

**KPI Cards**:
- Large metric display (font-mono text-3xl)
- Label above (text-sm font-medium)
- Subtle trend indicator
- Consistent height (h-32)
- Border treatment for separation

**Revenue Chart**:
- 12-month bar/line chart
- Month labels (Jan-Dez in Portuguese)
- Y-axis: currency formatted (R$)
- Interactive tooltips on hover
- Use Chart.js via CDN

**Client Table**:
- Columns: Nome, Plano, Valor Mensal, Próxima Renovação, Ações
- Sortable headers
- Row hover states
- Action buttons (Editar, Excluir) with icon buttons
- Zebra striping for readability

**Calendar View**:
- Month grid showing renewal dates
- Day cells with client indicators
- Color-coded by proximity (urgent vs. upcoming)
- Modal on click for day details

### Forms

**Add/Edit Client Modal**:
- Overlay backdrop with blur
- Centered modal (max-w-lg)
- Form fields: Nome (text), Plano (text), Valor (currency input with R$ prefix), Data de Renovação (date picker)
- Form spacing: space-y-4
- Buttons: Cancelar (secondary), Salvar (primary)

**Input Fields**:
- Label above (text-sm font-medium mb-2)
- Input height: h-12
- Rounded corners: rounded-lg
- Border treatment for focus states
- Currency inputs with proper formatting (R$ 0,00)

### Buttons
- Primary: Full solid, px-6 py-3, rounded-lg, font-medium
- Secondary: Border style, same padding
- Icon buttons: Square (w-10 h-10), rounded-md
- Destructive actions: Separate visual treatment

### Empty States
- Centered content with icon
- Descriptive text (text-gray-500)
- Primary action button
- For zero clients or no data scenarios

## Portuguese Language Integration
- All labels, buttons, and text in Brazilian Portuguese
- Date format: DD/MM/AAAA
- Currency: R$ with comma separator (1.234,56)
- Month names: Jan, Fev, Mar, Abr, Mai, Jun, Jul, Ago, Set, Out, Nov, Dez

## Icons
**Library**: Heroicons (via CDN)
- Navigation: home, users, calendar, chart-bar
- Actions: plus, pencil, trash, x-mark
- Data: currency-dollar, clock, chart-line

## Animations
**Minimal, purposeful only**:
- Modal fade-in/scale
- Table row hover
- Button press states
- NO scroll animations or excessive transitions

## Images
**Not applicable** - This is a data-focused dashboard without hero sections or marketing imagery. All visual interest comes from data visualization, typography hierarchy, and clean component design.