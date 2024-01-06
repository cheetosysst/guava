# Guava

Guava is a ecommerce demo written as a web development course's final project. It's not meant for production, just a demo.

It's written in typescript, using bun, elysia, htmx, tailwind, daisyui, drizzle, etc. Currently there are bugs with drizzle and bun's sqlite driver, I had to use some less efficient work arounds to make it work, but it's good enough for this project imo.

## Getting Started

You need to create a dotenv file using the provided example, and initialize a new sqlite3 database file.

```bash
sqlite3 db.sqlite3 ""
```

There's not difference in prod and dev, just run the dev command and you're good to go. 

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.