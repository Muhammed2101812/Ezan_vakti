# 🕌 Prayer Times Lite

A minimal, distraction-free web application that displays prayer times with a clean, modern interface. Built with React and Vite, featuring responsive design and multilingual support.

## ✨ Features

- **6 Prayer Times:** Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha
- **Real-time Countdown:** Visual countdown with progress bar to next prayer
- **Location Services:** GPS and manual location selection
- **Dark/Light Mode:** System preference aware with manual toggle
- **Multilingual:** Turkish, English, and Arabic support
- **Offline Ready:** LocalStorage caching for prayer times
- **Responsive Design:** Mobile-first approach with responsive layout

## 🛠 Tech Stack

- **Framework:** React 18.3+ with Vite 6.x
- **Styling:** TailwindCSS 4.x with CSS-first configuration
- **Date Library:** day.js for lightweight date/time operations
- **Icons:** lucide-react for consistent UI icons
- **API:** ezanvakti.imsakiyem.com (primary) and aladhan.com (fallback)
- **Build:** Vite for fast development server and optimized builds

## 📁 Project Structure

```
prayer-times-lite/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Design System

### Color Palette

- **Primary Green:** #10b981 (main UI elements)
- **Accent Amber:** #f59e0b (active prayer highlights)
- **Dark Mode:** Gray-900 background, Gray-50 text

### Typography

- **Display:** Inter (Google Fonts)
- **Arabic:** Noto Naskh Arabic (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js version 16 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd prayer-times-lite
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 📱 Usage

1. **Select Location:** Choose between GPS or manual location selection
2. **View Prayer Times:** See all 6 daily prayer times in a clean grid
3. **Track Progress:** Follow the visual countdown to next prayer
4. **Switch Languages:** Toggle between Turkish, English, and Arabic
5. **Theme Toggle:** Switch between light and dark modes

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛡️ Privacy

This application uses browser LocalStorage to cache prayer times and user preferences. No personal data is collected or stored on any external server.

## 🚧 Roadmap (V2 Features)

- PWA Support for installable app
- Browser notifications for prayer times
- Qibla direction indicator
- Prayer tracking features
- Custom calculation methods
- Nearby mosques finder
- Special prayers and duas
