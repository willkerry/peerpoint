MSc Project, working title: Peerpoint

- [x] Establish DB design
- [x] Implement ~all~ some APIs/middlewares
- [x] Implement session cookies
- [x] Migrate client-side Judge0 request-response code from trial project
- [x] Implement client requests
- [x] Build frontend views/forms
- [ ] Tests

## Relevant documentation

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Next.js API routes](https://nextjs.org/docs/api-routes/introduction)
- [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client)
- [Mantine](https://mantine.dev)
- [NextAuth.js](https://next-auth.js.org/)
- [`node-lru-cache`](https://github.com/isaacs/node-lru-cache), [like this](https://github.com/vercel/next.js/tree/canary/examples/api-routes-rate-limit).
- [SWR](https://swr.now.sh/)
- Coming soon: [Cypress](https://www.cypress.io/)
- Coming soon: [Jest](https://jestjs.io/)

## External services

- **Transactional mail:** I’m using a commercial mail delivery service for transactional email. This project accesses it with [Nodemailer](https://nodemailer.com), so any SMTP server could be swapped in.
- A dedicated instance of **Judge0** is running in the cloud separately.
