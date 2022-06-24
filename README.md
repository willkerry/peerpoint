MSc Project, working title: Code Clicker

- [x] Establish DB design
- [ ] Implement all APIs/middlewares
- [ ] Implement session cookies
- [ ] Migrate client-side Judge0 request-response code from trial project
- [ ] Tests
- [ ] Implement client requests
- [ ] Build frontend views/forms

Maybe also:

- [ ] Replace Mantine with homemade styling (benefit: smaller bundle size, cost:  accessibility woes)

## Relevant documentation

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Next.js API routes](https://nextjs.org/docs/api-routes/introduction)
- [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client)
- [Mantine](https://mantine.dev)
- [NextAuth.js](https://next-auth.js.org/)
- Coming soon: [SWR](https://swr.now.sh/)
- Coming soon: [`node-lru-cache`](https://github.com/isaacs/node-lru-cache), [like this](https://github.com/vercel/next.js/tree/canary/examples/api-routes-rate-limit).
- Coming soon: [Cypress](https://www.cypress.io/)

## External services

- **SMTP:** I’m using mail delivery service subscription from another project of mine (accessed with [Nodemailer](https://nodemailer.com), so any SMTP server can be swapped in).
- The official distribution image of **Judge0** is running on a cloud machine separately.

## On DBs

Right now, we’re using a local SQLite database (this won't carry into production). Use `npx prisma migrate` and `npx prisma migrate dev` to create a new DB with the right tables.

### Note to self:

Just change Prisma provider when I want to migrate to a production database, e.g.

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
}
```

or...

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://USER:PASSWORD@HOST:PORT/DATABASE"
}
```
