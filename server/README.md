## Getting Started
- Rename `.env.example` to `.env.local` and add the variables.

Use the following scripts to spin up your app.

> ⚠️ Only use npm while building your app
```bash
# dev server
pnpm dev

# production build
npm run build

# will build and deploy to vercel.
pnpm deploy:vercel

# running in production
pnpm start

```

## Tech stack
- **TypeScript** - Static type checking
- **Express.js** - Route handling and middleware
- **PostgreSQL** - Storing and managing data
- **Prisma** - Data modeling and querying
- **Zod** - Validating and parsing incoming and inferring types
- **JSON Web Token** - Authenticating users
