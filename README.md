# Modern Dashboard Template

A professional, clean, and highly scalable dashboard template built with the latest web technologies. This project is designed to be a solid foundation for building complex admin panels, SaaS dashboards, or internal tools.

## 🚀 Features

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Theme**: Emerald Green primary theme with full Dark/Light mode support.
- **Responsive**: Fully optimized for Desktop, Tablet, and Mobile.
- **Authentication Flow**: Complete set of auth pages (Login, Forgot Password, Verify OTP, Reset Password).
- **Dashboard Layout**: 
  - Collapsible sidebar with smooth transitions.
  - Interactive overview stats cards.
  - Custom scrollbars for a premium feel.

## 🛠️ Tech Stack

- **Next.js 16+** - Server Components & Server Actions.
- **TypeScript** - For type safety and better developer experience.
- **Shadcn UI** - Beautifully designed components.
- **Lucide Icons** - Clean and consistent icon set.
- **Oklch Colors** - Modern color space for better gradients and consistency.

## 📁 Project Structure

```text
src/
├── app/               # App Router pages and layouts
│   ├── auth/          # Authentication pages (Login, OTP, etc.)
│   ├── dashboard/     # Dashboard pages and sub-routes
│   └── globals.css    # Global styles and theme configuration
├── components/        # Reusable UI components
│   ├── layout/        # Sidebar, Header, and Main Layout
│   └── ui/            # Shadcn UI base components
├── hooks/             # Custom React hooks (useCountdown, etc.)
├── lib/               # Utility functions (cn, etc.)
└── schemas/           # Zod validation schemas
```

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Theme Customization

The theme is controlled via CSS variables in `src/app/globals.css`. You can easily change the primary color by updating the `--primary` variable using Oklch values.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

---

Built with ❤️ for speed and scalability.
