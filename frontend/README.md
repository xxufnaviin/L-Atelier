# L'Atelier - Beauty Trend Intelligence Platform

A Next.js 14 frontend prototype for L'Oréal's beauty trend analysis dashboard, focusing on the Malaysian market with global insights.

## Features

- **Dashboard**: Overview of trending beauty elements with key insights and comparative analysis
- **Recipe Builder**: Interactive tool to combine trending elements and predict campaign success
- **Trend Analyst**: AI-powered chat interface for beauty trend insights
- **Global/Malaysia View Toggle**: Switch between global and Malaysia-specific data

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with L'Oréal brand colors
- **UI Components**: Shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── page.tsx           # Dashboard
│   ├── recipe-builder/    # Recipe Builder page
│   └── trend-analyst/     # Trend Analyst chat
├── components/            # Reusable components
│   ├── ui/               # Shadcn/ui components
│   ├── TrendCard.tsx     # Trend display cards
│   ├── LineChartComponent.tsx # Chart wrapper
│   └── VideoMosaic.tsx   # Video gallery
├── lib/                  # Utilities and data
│   ├── data.js          # Mock data
│   ├── store.ts         # Global state
│   └── utils.ts         # Utility functions
└── globals.css          # Global styles
```

## Key Components

### Dashboard
- Hero banner with dynamic insights
- Trend cards (audio, keywords, hashtags, decay alerts)
- Comparative trend charts (Malaysia vs Global)
- Quick action buttons

### Recipe Builder
- Two-column layout with builder and results panels
- Dropdowns for audio, keywords, platform, and audience selection
- Prediction score with circular progress indicator
- Performance forecast chart
- Video inspiration gallery

### Trend Analyst
- Chat interface with AI responses
- Pre-defined prompt suggestions
- Message history with timestamps
- Typing indicators

## Color Palette

- Primary Black: `#000`
- White: `#fff`
- L'Oréal Red: `#d41e2c`
- L'Oréal Red Light: `#ff2d4a`

## Mock Data

The application uses mock data located in `src/lib/data.js` including:
- Trending audio tracks
- Popular keywords
- Viral hashtags
- Video content
- Chart data for visualizations
- Chat responses

## Future Enhancements

- Real API integration
- User authentication
- Advanced analytics
- Export functionality
- Mobile optimization
- Real-time data updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

© 2024 L'Oréal. All rights reserved.
