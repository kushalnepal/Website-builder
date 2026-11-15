# 🇳🇵 AI Website Builder - Empowering Nepal's Web Community

<div align="center">
  <img src="https://flagcdn.com/w320/np.png" alt="Nepal Flag" width="120" height="90" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  
  <h3>Built with ❤️ for Nepal's Digital Future</h3>
  
  <p>
    <strong>Supporting Web Community Nepal</strong> • <strong>Proudly Supporting Balen City</strong>
  </p>
  
  <img src="https://img.shields.io/badge/Nepal-🇳🇵-DC143C?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgOTAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iOTAiIGZpbGw9IiNEQzE0M0MiLz48cGF0aCBkPSJNNjAgMTFMNzUgNDVIMTA1TDAgOTBIMzBMMTUgNTZIMzVMNjAgMjFaIiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+" alt="Nepal">
  <img src="https://img.shields.io/badge/Balen%20City-Supported-00A651?style=for-the-badge" alt="Balen City">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma">
  <img src="https://img.shields.io/badge/Express.js-4-lightgrey?style=for-the-badge&logo=express" alt="Express.js">
</div>

---

## 🎯 Mission

**AI Website Builder** is a modern, AI-powered platform designed to empower Nepal's web development community. We're building tools that make website creation accessible to everyone—from students in Kathmandu to entrepreneurs in Balen City and beyond.

### 🌟 Why Nepal? Why Balen?

<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <img src="https://flagcdn.com/w160/np.png" alt="Nepal Flag" width="80"><br>
        <strong>Web Community Nepal</strong><br>
        <em>Growing together, building the future</em>
      </td>
      <td align="center" width="50%">
        <img src="https://raw.githubusercontent.com/kushalnepal/Website-builder/main/Balen.webp" alt="Balen Shah - Mayor of Kathmandu" width="120" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"><br>
        <strong>Balen City</strong><br>
        <em>Innovation meets tradition</em>
      </td>
    </tr>
  </table>
</div>

> **Note**: Add your `Balen.webp` photo to the repository root for the image above to display. The URL uses GitHub's raw file serving.

- **🇳🇵 Nepal Flag** - Represents our pride and commitment to the Nepali tech ecosystem
- **🏙️ Balen City** - Inspired by the transformative leadership of Balen Shah, Mayor of Kathmandu, symbolizing innovation, transparency, and digital progress

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI-Powered Generation** | Create websites instantly with natural language prompts |
| 🎨 **Modern Tech Stack** | Next.js 14, TypeScript, Tailwind CSS, Prisma |
| 🔐 **Authentication** | Secure JWT-based auth with bcrypt password hashing |
| 📱 **Responsive Design** | Mobile-first, works beautifully on all devices |
| 🌙 **Dark Mode** | Built-in dark/light theme support |
| ⚡ **Real-time Preview** | See changes instantly as you build |
| 🚀 **One-Click Deploy** | Deploy to Vercel, Netlify, or any platform |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      AI Website Builder                      │
├─────────────────────────┬───────────────────────────────────┤
│      Frontend           │           Backend                  │
│  (Next.js + React)      │      (Express + TypeScript)       │
├─────────────────────────┼───────────────────────────────────┤
│  • App Router           │  • RESTful API                    │
│  • Server Components    │  • Prisma ORM                     │
│  • Tailwind CSS         │  • PostgreSQL/SQLite              │
│  • Framer Motion        │  • JWT Authentication             │
│  • Lucide Icons         │  • AI Integration                 │
└─────────────────────────┴───────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm / npm / yarn
- PostgreSQL (or SQLite for development)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-website-builder.git
cd ai-website-builder

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Initialize database
npm run prisma:generate
npm run prisma:migrate

# Start development servers
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd ../frontend
npm run dev
```

Visit `http://localhost:3000` 🎉

---

## 📁 Project Structure

```
website-builder/
├── frontend/                 # Next.js 14 Frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── dashboard/   # User dashboard
│   │   │   ├── login/       # Authentication
│   │   │   └── register/    # User registration
│   │   ├── components/      # Reusable UI components
│   │   │   ├── WebsiteRenderer.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── DarkModeToggle.tsx
│   │   │   └── AuthProvider.tsx
│   │   └── lib/             # Utilities & API client
│   └── package.json
│
├── backend/                  # Express.js Backend
│   ├── src/
│   │   ├── index.ts         # Entry point
│   │   ├── services/        # Business logic
│   │   │   └── aiService.ts # AI integration
│   │   └── ...
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
│
└── README.md                # This file
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: React Context + Hooks

### Backend
- **Runtime**: Node.js + Express
- **Language**: TypeScript 5
- **Database**: Prisma ORM (PostgreSQL/SQLite)
- **Auth**: JWT + bcryptjs
- **AI**: Custom AI service integration

### DevOps
- **Package Manager**: npm
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode
- **Database Migrations**: Prisma Migrate

---

## 🤝 Contributing

We welcome contributions from the **Web Community Nepal** and developers worldwide!

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful and inclusive

---

## 🌍 Community

<div align="center">
  <h3>Join the Movement</h3>
  
  <p>
    <a href="https://github.com/web-community-nepal"><strong>Web Community Nepal</strong></a> •
    <a href="https://github.com/balen-city"><strong>Balen City Initiatives</strong></a> •
    <a href="https://discord.gg/nepal-dev"><strong>Discord Community</strong></a>
  </p>
  
  <p>
    <img src="https://flagcdn.com/w40/np.png" alt="Nepal"> 
    <strong>Proudly built in Nepal, for Nepal</strong> 
    <img src="https://flagcdn.com/w40/np.png" alt="Nepal">
  </p>
</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Web Community Nepal** - For fostering an incredible developer ecosystem
- **Balen Shah & Balen City** - For inspiring digital transformation in Kathmandu
- **Next.js Team** - For the amazing React framework
- **Vercel** - For hosting and deployment platform
- **Open Source Community** - For the tools that make this possible

---

<div align="center">
  <img src="https://flagcdn.com/w80/np.png" alt="Nepal Flag" width="60">
  
  <h3>Made with 💜 in Nepal</h3>
  
  <p>
    <strong>AI Website Builder</strong> — Empowering every Nepali to build their digital presence
  </p>
  
  <p>
    <a href="#top">⬆️ Back to Top</a>
  </p>
</div>

---

<div align="center">
  <sub>
    🇳🇵 <strong>Jai Nepal!</strong> 🇳🇵<br>
    Supporting <strong>Web Community Nepal</strong> & <strong>Balen City</strong>
  </sub>
</div>