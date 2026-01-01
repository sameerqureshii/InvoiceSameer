# InvoiceSameer

A modern, full-stack invoice management system built with Next.js 14, featuring automated email notifications, PDF generation, and a beautiful dashboard interface.

## Features

- **Next.js App Router** - Leveraging the latest Next.js features for optimal performance
- **Invoice Management** - Create, edit, and manage invoices with ease
- **Payment Tracking** - Mark invoices as paid and track payment status
- **Email Integration** - Send professional emails using Mailtrap Email API with beautiful templates
- **PDF Generation** - Real custom PDF generation for invoices
- **Client Communication** - Send invoices directly to clients and automated reminder emails
- **Authentication** - Custom auth implementation using Auth.js with Magic Link authentication
- **Database** - Neon Postgres Database with Prisma ORM
- **Beautiful UI** - Stunning dashboard with animated charts and modern design
- **Form Validation** - Server-side validation using Zod and Conform
- **Styling** - Built with Tailwind CSS and Shadcn UI components
- **Multi-Currency Support** - Format currency with support for Euros, Dollars, and more
- **Production Ready** - Optimized for deployment on Vercel

## Important Note About Email Functionality

**You will need your own domain name to use this project in production.**

This project uses Mailtrap for email sending. While Mailtrap provides a demo domain for local development and testing, it does not work in production environments. To deploy this application and have functional email features, you must:

1. Obtain your own domain name
2. Configure it with Mailtrap or another email service provider
3. Update the email configuration in the project settings

Without a custom domain, the email functionality (invoice delivery, reminders, magic link authentication) will not work in production.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Email Service:** [Mailtrap](https://l.rw.rw/jan_marshal)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) & [Shadcn UI](https://ui.shadcn.com)
- **Database:** [Neon Postgres](https://neon.tech)
- **ORM:** [Prisma](https://prisma.io)
- **Authentication:** [Auth.js](https://authjs.dev/)
- **Validation:** [Zod](https://zod.dev/) & [Conform](https://conform.guide/)
- **Deployment:** [Vercel](https://vercel.com/)
- **UI Components:** [Background Patterns by ibelick](https://ui.ibelick.com/)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sameerqureshii/InvoiceSameer.git
cd InvoiceSameer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add your configuration:
```env
DATABASE_URL="your-neon-database-url"
AUTH_SECRET="your-auth-secret"
EMAIL_SERVER_USER=smtp@mailtrap.io
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_SERVER_HOST=live.smtp.mailtrap.io
EMAIL_SERVER_PORT=940
EMAIL_FROM="your-email"
MAILTRAP_TOKEN"your-mailtrap-api-key"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This application is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure environment variables
4. Set up your custom domain for email functionality
5. Deploy

Remember to configure your domain name with Mailtrap before deploying to production to ensure email features work correctly.

## License

This project is open source and available under the [MITLicense].

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sameerqureshii/InvoiceSameer/issues).

## Author

**Sameer Qureshi**

- GitHub: [@sameerqureshii](https://github.com/sameerqureshii)
- Website: [Sameer Ahmed Qureshi](https://sameer-personall-portfolio.vercel.app)
## Support

Give a star if this project helped you!
