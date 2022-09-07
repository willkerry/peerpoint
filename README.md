MSc Project, working title: Peerpoint

- [x] Establish DB design
- [x] Implement ~some~ all APIs/middlewares
- [x] Implement session cookies
- [x] Migrate client-side Judge0 request-response code from trial project
- [x] Implement client requests
- [x] Build frontend views/forms
- [x] End-to-end tests

## To run locally

1. Clone the repo
2. Install dependencies with `npm i`
3. Create a `.env` file in the root directory (see `.env.template` for
   reference). For full functionality, you will need to set up a local database
   and connect to an mock SMTP server.
4. Run `npx prisma generate` to generate the Prisma client
5. Run `npx prisma migrate dev` to create the database
6. Launch the development server with `npm run dev`
7. The application should be available at `localhost:3000`

To generate a production build, run `npm run build`. To start the production
server, run `npm start`.

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
