# 🌟 LumiCrypto - AI-Powered Crypto Insights

A modern, full-featured cryptocurrency analysis platform powered by artificial intelligence. Built with Next.js, TypeScript, and cutting-edge technologies.

## ✨ Features

### 🏠 Landing Page
- **Stunning Hero Section** with animated gradients and floating elements
- **Trending Tokens Carousel** with real-time data from CoinGecko
- **Feature Highlights** with smooth animations
- **Responsive Design** that works on all devices

### 🔍 Explore & Search
- **Advanced Token Search** with real-time suggestions
- **Smart Filtering** by category, chain, and market metrics
- **Grid/List View Toggle** for optimal viewing
- **Infinite Scroll** with smooth loading animations
- **Market Statistics** dashboard

### 📊 Token Analysis
- **Detailed Token Information** with comprehensive market data
- **Interactive Price Charts** using Recharts
- **AI-Powered Risk Analysis** with confidence scoring
- **Community Sentiment Analysis**
- **Strength & Risk Factor Identification**
- **Social Links & Project Information**

### 👛 Wallet Integration
- **Connect Multiple Wallets** (MetaMask, WalletConnect, etc.)
- **Portfolio Overview** with real-time valuations
- **Asset Distribution Charts** with beautiful visualizations
- **AI Portfolio Analysis** with risk assessment
- **Performance Tracking** and insights

### 📈 Dashboard
- **Personalized Overview** with portfolio performance
- **AI-Generated Insights** and market alerts
- **Top Gainers/Losers** tracking
- **Market Overview** with key statistics
- **Quick Actions** for common tasks

### ⚙️ Settings
- **Theme Toggle** (Light/Dark mode)
- **Profile Management** with user preferences
- **Wallet Management** and connection status
- **Data Export/Import** functionality
- **Privacy Controls** and security settings

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Beautiful data visualizations
- **Lucide React** - Modern icon library

### State Management & Data
- **Zustand** - Lightweight state management
- **React Query** - Server state management
- **Axios** - HTTP client for API requests

### Web3 Integration
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum
- **RainbowKit** - Wallet connection UI

### APIs & Data Sources
- **CoinGecko API** - Cryptocurrency market data
- **DeFiLlama API** - DeFi protocol information
- **Mock AI Analysis** - Simulated AI insights (ready for real AI integration)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lumicrypto.git
   cd lumicrypto
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   ```env
   NEXT_PUBLIC_COINGECKO_API_KEY=your_coingecko_api_key
   NEXT_PUBLIC_AI_API_URL=your_ai_api_endpoint
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Screenshots

### Landing Page
![Landing Page](screenshots/landing.png)
*Beautiful hero section with trending tokens carousel*

### Token Analysis
![Token Analysis](screenshots/token-analysis.png)
*Comprehensive AI-powered token analysis*

### Portfolio Dashboard
![Portfolio](screenshots/portfolio.png)
*Wallet integration with portfolio analytics*

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#7c3aed) - Main brand color
- **Secondary**: Pink (#ec4899) - Accent color
- **Success**: Green (#10b981) - Positive indicators
- **Warning**: Yellow (#f59e0b) - Caution states
- **Error**: Red (#ef4444) - Negative indicators

### Typography
- **Font**: Inter - Clean, modern typeface
- **Headings**: Bold weights with gradient effects
- **Body**: Regular weight for readability

### Animations
- **Page Transitions**: Smooth fade and slide effects
- **Hover States**: Scale and glow effects
- **Loading States**: Skeleton loaders and shimmer effects
- **Stagger Animations**: Sequential element appearances

## 🔧 Configuration

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- **Custom Colors** - Brand-specific color palette
- **Extended Animations** - Custom keyframes and transitions
- **Glass Morphism** - Modern glassmorphic design patterns
- **Responsive Breakpoints** - Mobile-first design approach

### API Integration
- **Rate Limiting** - Intelligent request throttling
- **Error Handling** - Graceful fallbacks and user feedback
- **Caching** - Optimized data fetching with React Query
- **Mock Data** - Development-friendly fallbacks

## 🤖 AI Integration

The platform is designed to integrate with various AI services:

### Current Implementation
- **Mock AI Analysis** - Simulated responses for development
- **Risk Scoring** - Algorithm-based risk assessment
- **Sentiment Analysis** - Community sentiment evaluation

### Ready for Integration
- **OpenAI GPT** - Natural language analysis
- **Custom ML Models** - Specialized crypto analysis
- **Real-time Processing** - Live market analysis
- **Confidence Scoring** - AI prediction confidence

## 🔒 Security & Privacy

### Data Protection
- **Client-side State** - No sensitive data stored on servers
- **Wallet Security** - Read-only access to wallet data
- **API Key Protection** - Environment variable management
- **Privacy Controls** - User-controlled data sharing

### Best Practices
- **Type Safety** - TypeScript for runtime error prevention
- **Input Validation** - Sanitized user inputs
- **Error Boundaries** - Graceful error handling
- **Rate Limiting** - API abuse prevention

## 📊 Performance

### Optimization Features
- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic route-based splitting
- **Lazy Loading** - On-demand component loading
- **Caching** - Intelligent data and asset caching

### Metrics
- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Core Web Vitals**: Excellent ratings
- **Bundle Size**: Optimized for fast loading

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```bash
docker build -t lumicrypto .
docker run -p 3000:3000 lumicrypto
```

### Environment Variables
```env
NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key
NEXT_PUBLIC_AI_API_URL=your_ai_endpoint
NEXT_PUBLIC_WALLET_CONNECT_ID=your_wallet_connect_id
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- **TypeScript** - All code must be type-safe
- **ESLint** - Follow the configured linting rules
- **Prettier** - Code formatting consistency
- **Component Tests** - Write tests for new components

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CoinGecko** - Cryptocurrency market data
- **DeFiLlama** - DeFi protocol information  
- **Framer Motion** - Beautiful animations
- **Tailwind CSS** - Styling framework
- **Lucide** - Icon library
- **Next.js Team** - Amazing React framework

## 📞 Support

- **Documentation**: [docs.lumicrypto.com](https://docs.lumicrypto.com)
- **Discord**: [Join our community](https://discord.gg/lumicrypto)
- **Twitter**: [@lumicrypto](https://twitter.com/lumicrypto)
- **Email**: hello@lumicrypto.com

---

<div align="center">
  <strong>Built with ❤️ for the crypto community</strong>
  <br>
  <sub>Made by developers, for developers</sub>
</div> 