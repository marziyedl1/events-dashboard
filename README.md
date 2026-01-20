# Event Management Dashboard (Nuxt 4)

A modern **Event Management Dashboard** built with **Nuxt 4 + TypeScript**, featuring event listing, detail views, statistics integration, local event management, and automated testing.

---

## ✨ Features

* 📋 **Event List**

  * Fetches events from backend API
  * Filter by event type (Online / OnSite / Hybrid)
  * Click to view event details new : /event  ---- edit : /event:id

## 📌 Notes

* Backend API is expected to run separately on (https://localhost:7087)

* Local events are stored in browser storage and merged with API data

* Naming: use+Name+Query : API Calls

* I created only one /event?:id and handle create/edit mode with flag

* components are separated base feature and I keep them simple 

* One small unit test and simple e2e test

* 🧪 **Testing**

  * Unit tests with **Vitest**
  * End-to-end tests with **Playwright**

* 💾 **Local Event Management**

  * Create, edit, delete events locally (Get from API and save on localStorage )
  * Persisted via Pinia + Local Storage

* 🎨 **Styling**

  * Tailwind CSS

---

## 🧱 Project Structure

```txt
app/
assets/
  css/
    main.css

components/
  event/
  form/
  modal/
  Loading.vue

composables/
  useEventStatistics.ts
  useGetEventByIdQuery.ts
  useGetEventListQuery.ts
  useGetOnlineStatsQuery.ts
  useGetOnsiteStatsQuery.ts

configs/
  queryKeys.ts

layouts/
  default.vue

pages/
  index.vue        # Event list
  event.vue        # Event detail

stores/
  localEvents.ts   # Pinia store for local events

types/
  event.ts
  statistics.ts
  index.ts

utils/

tests/
  e2e/
    index.test.ts  # Playwright E2E tests
  unit/            # Unit tests

app.vue
```

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
pnpm install
```

---

### 2️⃣ Run the development server

```bash
pnpm dev
```

App will be available at:

```
http://localhost:3000
```

---

### 3️⃣ Build for production

```bash
pnpm build
```

Preview production build:

```bash
pnpm preview
```

---

## 🧪 Testing

### Unit tests

```bash
pnpm test
```

### Watch mode

```bash
pnpm test:watch
```

### Unit-only tests

```bash
pnpm test:unit
```

### Nuxt-related tests

```bash
pnpm test:nuxt
```

---

## 🌐 End-to-End Tests (Playwright)

### Run E2E tests

```bash
pnpm e2e
```


## 🧠 Technical Decisions

* **Pinia** for local state & persistence
* **Playwright** used only where real browser interaction is required

---



---
