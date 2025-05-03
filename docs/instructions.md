## ⚙️ Implementation Instructions – Arabic Event Discovery App

### General Setup

- **Language**: Arabic (RTL support using Tailwind's `dir="rtl"`)
- **Framework**: Next.js
- **Styling**: TailwindCSS
- **Font**: Rubik
- **Icons**: Lucide-react
- **Animations**: Framer Motion
- **Smooth Scrolling**: Optional with Lenis
- **SEO**: Use `next-seo`
- **Sitemap**: Use `next-sitemap`
- **Analytics**: Google Analytics (track button clicks and form submissions)

- **Linear Gradient**: [#FF6542, #FFCF5E, #83E98D]
- **Action/important stuff color**: [#FF7B5A]
- **secondary color for text**: [#FFEDE5]
- **Website background**: [#FDF6F3]

---

### Section-Specific Instructions

#### 1. Header

- Use sticky positioning
- Add scroll-based background color animation using Framer Motion
- Use anchor links to scroll to each section
- Ensure RTL alignment

#### 2. Hero Section

- Use a responsive flex layout (Image left, text right in RTL)
- Animate headline, text, and button with staggered entrance
- Track CTA clicks with Google Analytics
- **Load dynamic content**: The headline, sub-headline, and call-to-action button text should be dynamically pulled from the `data/app-details.json` file. Use `getStaticProps` or `getServerSideProps` to load this data.

#### 3. Nearby Hangout Areas

- Create a grid layout with cards
- Animate each card on scroll
- Include Lucide location icons
- Add distance info (e.g., "يبعد 1.2 كم")
- **Load dynamic content**: Nearby hangout areas should be dynamically fetched from `data/app-details.json`. Render these as cards with relevant details like name, location, distance, and an image.

#### 4. Discover Events

- Use horizontal scrolling or Swiper.js for categories
- Add fade or slide animations with Framer Motion
- Display event name, date, and action button/icon
- **Load dynamic content**: Event details should be dynamically fetched from `data/app-details.json`. Render each event with the event name, date, and an action button/icon.

#### 5. Contact / Sign-Up Form

- Validate required fields on client side
- Animate form appearance
- Send GA event on successful form submit
- Form style: rounded, shadowed, full width on mobile

#### 6. Footer

- Align RTL content properly
- Reuse navigation links from header
- Add Lucide icons for social media
- Include structured metadata if applicable

---

### Performance & SEO Notes

- Optimize all images and use `<Image />` from Next.js
- Add alt tags to every image
- Use `next-seo` for open graph, title, description, locale
- Generate sitemap.xml using `next-sitemap`
- Use lazy loading and dynamic imports for performance

### Optional Enhancements

- Implement Lenis for smoother scroll experience
- Add reveal-on-scroll for each section
- Collapse/expand blocks for FAQs or categories

---

### **Loading Dynamic Data from JSON**

- **File Location**: Store the dynamic content in a `data/app-details.json` file within the project. This file will contain the necessary data for each section (Hero, Nearby Hangout Areas, Events, etc.).
- **Loading the Data**: In your Next.js pages, use either `getStaticProps` (for static generation) or `getServerSideProps` (for server-side rendering) to fetch this data and pass it to the component as props. For example:

```js
// Example of using getStaticProps in a page

import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/app-details.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);

  return {
    props: {
      appDetails: data.appDetails,
    },
  };
}
```
