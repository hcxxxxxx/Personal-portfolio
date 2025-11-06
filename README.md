# Modern Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features smooth scroll-snap navigation, interactive AI chat assistant, and pixel-perfect design.

## ✨ Features

- **Smooth Scroll Navigation**: Single-page application with scroll-snap functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Sections**:
  - Hero section with animated profile photo and social links
  - Experience & Projects with tabbed interface
  - AI Chat Assistant with simulated conversations
  - Contact form with validation and success states
- **Side Navigation**: Floating navigation dots with active states and tooltips
- **Modern Animations**: Powered by Framer Motion for smooth transitions
- **Dark Theme**: Professional dark color scheme with blue accents

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **Icons**: [Lucide React](https://lucide.dev)
- **Fonts**: Google Fonts (Poppins, Inter)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and design system
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page with section management
├── components/
│   ├── SideNav.tsx          # Floating navigation component
│   ├── HeroSection.tsx      # Introduction section
│   ├── ExperienceSection.tsx # Experience and projects
│   ├── AIChatSection.tsx    # Interactive chat interface
│   └── ContactSection.tsx   # Contact form
public/
├── profile.jpg              # Profile photo
└── ...                      # Other static assets
```

## 🎨 Design System

The website uses a carefully crafted design system:

### Color Palette
- **Background**: `#111827` (Dark blue-gray)
- **Content Background**: `#1F2937` (Lighter gray for cards)
- **Primary**: `#38BDF8` (Bright sky blue)
- **Secondary**: `#818CF8` (Soft indigo)
- **Text Primary**: `#F9FAFB` (Near white)
- **Text Secondary**: `#9CA3AF` (Medium gray)
- **Border**: `#374151` (Low contrast gray)

### Typography
- **Headings**: Poppins (700 weight)
- **Body**: Inter (400/600 weight)
- **Fluid scaling**: Responsive font sizes using clamp()

### Spacing
- **Base unit**: 8px
- **Container**: Max-width 1100px with 24px horizontal padding
- **Sections**: Full viewport height (100vh)

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🤖 AI Chat Feature

The AI chat assistant includes:
- Welcome message on load
- Simulated typing indicators
- Context-aware responses about experience, projects, and skills
- Smooth message animations
- Mobile-optimized chat interface

## 📝 Customization

To customize the website for your own use:

1. **Update personal information** in `HeroSection.tsx`:
   - Name, title, description
   - Social media links
   - Profile photo (`public/profile.jpg`)

2. **Add your experience** in `ExperienceSection.tsx`:
   - Update the `experiences` and `projects` arrays
   - Modify technologies, descriptions, and links

3. **Customize AI responses** in `AIChatSection.tsx`:
   - Update the `simulateAIResponse` function
   - Add your specific information and personality

4. **Update contact information** in `ContactSection.tsx`:
   - Change email address
   - Integrate with your preferred form service

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with each push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

Build the project:
```bash
npm run build
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).

## 📞 Support

If you have any questions or need help customizing the website, feel free to reach out or create an issue.
