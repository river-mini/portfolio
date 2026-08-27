# Cindy Truong — Portfolio

Multidisciplinary design portfolio built with Next.js (App Router), React,
TypeScript and Tailwind CSS v4.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

## Where to edit

| What | File |
| --- | --- |
| Projects (titles, years, categories, thumbnails, hover videos) | `src/data/projects.ts` |
| Case-study content | `src/data/case-studies.ts` |
| Colour, type, spacing and motion tokens | `src/app/globals.css` |
| Hero copy | `src/components/Hero.tsx` |
| About copy | `src/app/about/page.tsx` |
| Contact / social links | `src/components/Footer.tsx` |
| Site metadata + domain | `src/app/layout.tsx` |
| Resume PDF | `public/resume.pdf` |

Project thumbnails live in `public/images/projects/`. Preview and case-study
videos are referenced by URL and are intentionally **not** stored in this repo.
