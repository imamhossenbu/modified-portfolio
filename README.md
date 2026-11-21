# Imam Hossen — Portfolio

Personal portfolio of Imam Hossen, a Full Stack Developer based in Barishal, Bangladesh. It presents my experience, the technologies I work with, and 19 projects, each with its own case-study page.

**Live site:** [imamhossen.vercel.app](https://imamhossen.vercel.app)

## Highlights

- **Physics-driven skills section** — every technology is a pill that falls, piles up and can be grabbed and thrown, built on Matter.js. Selecting a group lights up its pills.
- **Scroll-led motion** — section reveals, a velocity-reactive marquee, a scroll-filled work pipeline and smooth scrolling, using GSAP and Lenis.
- **Project case studies** — one statically generated page per project, with a screenshot gallery, feature list, tech stack and links to the live site and source.
- **Light and dark themes** — switchable, and follows the system setting by default.
- **Working contact form** — validated with React Hook Form and delivered through a server route.
- **SEO** — per-page metadata, Open Graph and Twitter images, JSON-LD structured data, breadcrumbs, a generated sitemap and `robots.txt`.
- **Accessible motion** — animations and physics are switched off for visitors who prefer reduced motion.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, custom CSS |
| Motion | GSAP, Lenis, Matter.js, cobe |
| Forms and feedback | React Hook Form, React Hot Toast |
| Icons | Lucide, React Icons |
| Theming | next-themes |
| Hosting | Vercel |

## Getting started

You need Node.js 20 or newer.

```bash
git clone https://github.com/imamhossenbu/imam-portfolio.git
cd imam-portfolio
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates the production build |
| `npm run start` | Serves the production build |
| `npm run lint` | Runs ESLint |

### Environment variables

None are required. One is optional:

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The site's public origin, used for canonical URLs, the sitemap and structured data. Set it when hosting on a different domain. | `https://imamhossen.vercel.app` |

## Project structure

```
app/
  page.tsx               Home page: the sections in order
  layout.tsx             Fonts, metadata, structured data, providers
  projects/[slug]/       Project case-study pages
  api/contact/           Contact form endpoint
  sitemap.ts, robots.ts  Generated SEO files
components/              Page sections (Hero, About, Skills, Projects, ...)
components/motion/       Reusable animation pieces and the scroll-reveal hook
data/projects.ts         All project content
lib/site.ts              Site name, URL, description and social links
public/                  Images and the résumé PDF
```

## Editing content

- **Projects** — add or change entries in [data/projects.ts](data/projects.ts). Each entry becomes a card on the home page and a page at `/projects/<slug>`, and is added to the sitemap automatically. Gallery screenshots are listed in [data/projectShots.ts](data/projectShots.ts).
- **Site details** — name, description, social links and keywords live in [lib/site.ts](lib/site.ts), which feeds the metadata and structured data.
- **Skills** — the groups and their technologies are defined at the top of [components/Skills.tsx](components/Skills.tsx).

## Contact form

The form posts to [app/api/contact/route.ts](app/api/contact/route.ts), which forwards the message to a Google Apps Script web app. To receive messages yourself, deploy your own Apps Script and replace the script URL in that file.

## Deployment

The site is deployed on Vercel: every push to `main` triggers a new production build. A `netlify.toml` is also included for deploying on Netlify.

## Contact

- Website: [imamhossen.vercel.app](https://imamhossen.vercel.app)
- GitHub: [@imamhossenbu](https://github.com/imamhossenbu)
- LinkedIn: [imam-hossen-ub](https://linkedin.com/in/imam-hossen-ub)
