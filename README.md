# Linkly - URL Shortener Frontend

A modern, responsive Next.js 13+ (App Router) frontend for a URL shortener web application. Built with TypeScript, Tailwind CSS, and React Hooks.

## ✨ Features

- Beautiful, animated navbar with glassmorphism and gradient effects
- Responsive design for desktop and mobile
- URL input bar with icon and "Shorten Now" button
- Tabbed interface for History and Statistics
- History table with sorting and actions (edit/delete)
- Clean, dark UI with Tailwind CSS
- No authentication required (friendly welcome message)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MuhammadYasinSaleem/muhammad-innovaxel-yasin-frontend.git
cd muhammad-innovaxel-yasin-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 🗂️ Project Structure

```
client/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── HistoryTable.tsx
│   ├── page.tsx
│   └── ...
├── public/
│   ├── link.png
│   └── ...
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## 🛠️ Tech Stack
- [Next.js 13+ (App Router)](https://nextjs.org/docs/app)
- [React 18+](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/icons/)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

This project is deployed on Vercel:

👉 [https://linkly-innovaxel.vercel.app/](https://linkly-innovaxel.vercel.app/)

## ⚙️ CI/CD Pipeline

This project includes a CI/CD pipeline for automated testing and deployment. The pipeline is configured to:

- Run tests checks on every push and pull request
- Build the Next.js application
- Deploy to the configured hosting environment automatically after a successful build

You can find the pipeline configuration in the `.github/workflows/` directory (or your CI/CD provider's config location).





