# NetNext - Premium Software Development Studio

A modern, full-featured website for NetNext software development studio built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Supabase.

## Features

### Core Functionality
- 🌐 **Multi-language Support** - Russian and English with easy language switching
- 💱 **Multi-currency** - BYN, RUB, USD with automatic conversion
- 🔐 **Authentication System** - Email/password auth with Supabase
- 🤖 **AI Chat Assistant** - Integrated AI chatbot using Vercel AI SDK
- 📊 **Project Calculator** - Interactive price estimation tool
- 💼 **Portfolio Showcase** - Dynamic project gallery with filtering
- 📝 **Contact Forms** - Multiple contact and application forms
- 🎨 **Modern Design** - Unique, responsive design with smooth animations
- 📱 **Telegram Integration** - Instant notifications for new inquiries

### Pages
- **Home** - Hero section, services, stats, technologies, CTA
- **Portfolio** - Project showcase with category filtering
- **Calculator** - Interactive project cost calculator
- **Careers** - Job listings with application system
- **Freelance** - Information for freelance developers
- **Partnership** - Partnership opportunities and request form
- **Contacts** - Contact information and inquiry form
- **Auth** - Login and registration
- **Profile** - User profile management
- **404** - Custom error page

### Technical Features
- ⚡ Next.js 15 with App Router
- 🎨 Tailwind CSS v4 with custom design tokens
- 🗄️ Supabase for database and authentication
- 🔒 Row Level Security (RLS) policies
- 📱 Fully responsive mobile-first design
- 🎭 Smooth animations and transitions (float, glow, shimmer, fadeInUp)
- 🔍 SEO optimized with metadata and structured data
- 🚀 Performance optimized
- 📊 Analytics integration
- 🌙 Dark premium theme with glass morphism effects
- 💬 Telegram bot integration for instant notifications

## Getting Started

### Prerequisites
- Node.js 18+ 
- Supabase account
- OpenAI API key (for AI chat)
- Telegram Bot Token (optional, for notifications)

### Installation

1. Clone the repository
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables in the Vars section:
   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_ANON_KEY` - Your Supabase anon key
   - `TELEGRAM_BOT_TOKEN` - Your Telegram bot token (optional)
   - `TELEGRAM_CHAT_ID` - Your Telegram chat ID (optional)

4. Run database migrations from the `scripts` folder
5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## Telegram Bot Setup (Optional)

To receive instant notifications about new contact form submissions:

1. Create a new bot with [@BotFather](https://t.me/botfather) on Telegram
2. Get your bot token
3. Get your chat ID by messaging [@userinfobot](https://t.me/userinfobot)
4. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to your environment variables in the Vars section

## Database Schema

The project includes the following tables:
- `profiles` - User profiles
- `projects` - Portfolio projects
- `contact_submissions` - Contact form submissions
- `vacancies` - Job listings
- `job_applications` - Job applications
- `price_calculations` - Calculator results
- `partnership_requests` - Partnership inquiries

All tables have RLS policies for security.

## Design System

### Color Palette
- **Background**: Almost black (oklch 0.08) for premium feel
- **Primary**: Soft blue-purple (oklch 0.75)
- **Accent**: Pink-purple gradient
- **Glass Effects**: Subtle transparency with backdrop blur

### Typography
- **Headings**: 5xl-9xl for dramatic impact
- **Body**: Relaxed leading for readability
- **Font**: Geist Sans & Geist Mono

### Animations
- Float: Smooth floating elements
- Glow: Pulsing glow effects
- Shimmer: Subtle shimmer on hover
- FadeInUp: Entrance animations
- ScaleIn: Scale entrance effects

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Vercel AI SDK with OpenAI
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Notifications**: Telegram Bot API

## Contact

- **Phone**: +375 29 141 45 55
- **Email (Support)**: info@netnext.site
- **Email (Partnership)**: team@netnext.site
- **Instagram**: @netnext.site
- **Telegram**: https://t.me/+375291414555
- **Website**: https://www.netnext.site

## License

© 2025 NetNext. All rights reserved.
