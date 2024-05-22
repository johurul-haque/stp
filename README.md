## Getting Started
After installing all of the dependencies change the `.env.example` file `.env` and add the necessary variables.

```ini
DATABASE_URL="postgres://..."

NODE_ENV= # 'development' | 'production'
JWT_SECRET=
```

Use the following scripts to spin up your app.

> ⚠️ Only use npm while building your app
```bash
# dev server
pnpm dev

# production build
npm run build

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
