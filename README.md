MSc Project, working title: Peerpoint

- [x] Establish DB design
- [x] Implement ~some~ all APIs/middlewares
- [x] Implement session cookies
- [x] Migrate client-side Judge0 request-response code from trial project
- [x] Implement client requests
- [x] Build frontend views/forms
- [x] End-to-end tests
- [ ] Unit tests
## Relevant documentation

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client) (ORM)
- [Mantine](https://mantine.dev) (UI framework)
- [NextAuth.js](https://next-auth.js.org/) (authentication)
- [`node-lru-cache`](https://github.com/isaacs/node-lru-cache) (rate limiting)
- [SWR](https://swr.now.sh/) (efficient client-side data fetching)
- [Cypress](https://www.cypress.io/) (testing)
- Coming soon: [Jest](https://jestjs.io/)
- [CodeMirror](https://codemirror.net/) (code editor)
- [react-charts](https://github.com/TanStack/react-charts) (charts)

## External services

- **Transactional mail:** I’m using a commercial mail delivery service for transactional email. This project accesses it with [Nodemailer](https://nodemailer.com), so any SMTP server could be swapped in.
- A dedicated instance of **Judge0** is running in the cloud separately.
