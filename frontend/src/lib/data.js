export const topTrends = {
  audio: {
    name: "Oh No",
    growth: 72,
    data: [
      { date: '2024-09-01', value: 10 },
      { date: '2024-09-08', value: 25 },
      { date: '2024-09-15', value: 45 },
      { date: '2024-09-22', value: 62 },
      { date: '2024-09-29', value: 72 }
    ],
    platform: 'TikTok',
    demographic: 'Gen Z'
  },
  keyword: {
    name: "Glass Skin",
    growth: 45,
    data: [
      { date: '2024-09-01', value: 20 },
      { date: '2024-09-08', value: 28 },
      { date: '2024-09-15', value: 35 },
      { date: '2024-09-22', value: 40 },
      { date: '2024-09-29', value: 45 }
    ],
    platform: 'Instagram',
    demographic: 'Millennials'
  },
  hashtag: {
    name: "#VanillaGirl",
    views: "2.4M",
    growth: 89,
    data: [
      { date: '2024-09-01', value: 5 },
      { date: '2024-09-08', value: 15 },
      { date: '2024-09-15', value: 35 },
      { date: '2024-09-22', value: 65 },
      { date: '2024-09-29', value: 89 }
    ],
    platform: 'TikTok',
    demographic: 'Gen Z'
  },
  decay: {
    name: "Clean Girl",
    decline: -23,
    data: [
      { date: '2024-09-01', value: 80 },
      { date: '2024-09-08', value: 70 },
      { date: '2024-09-15', value: 60 },
      { date: '2024-09-22', value: 50 },
      { date: '2024-09-29', value: 57 }
    ],
    platform: 'Instagram',
    demographic: 'All'
  }
};

export const comparisonChartData = [
  { date: '2024-09-01', global: 10, malaysia: 5 },
  { date: '2024-09-08', global: 25, malaysia: 12 },
  { date: '2024-09-15', global: 45, malaysia: 25 },
  { date: '2024-09-22', global: 62, malaysia: 40 },
  { date: '2024-09-29', global: 45, malaysia: 62 },
  { date: '2024-10-06', global: 30, malaysia: 75 },
  { date: '2024-10-13', global: 25, malaysia: 68 }
];

export const audios = [
  { id: 'audio_1', name: 'Oh No', platform: 'TikTok', trending: true },
  { id: 'audio_2', name: 'Aesthetic', platform: 'Instagram', trending: true },
  { id: 'audio_3', name: 'Glowing Up', platform: 'TikTok', trending: false },
  { id: 'audio_4', name: 'Skincare Routine', platform: 'YouTube', trending: true },
  { id: 'audio_5', name: 'Makeup Transformation', platform: 'TikTok', trending: false }
];

export const keywords = [
  { id: 'kw_1', name: 'Glass Skin', category: 'skincare', trending: true },
  { id: 'kw_2', name: 'Vanilla Girl', category: 'makeup', trending: true },
  { id: 'kw_3', name: 'Clean Girl', category: 'makeup', trending: false },
  { id: 'kw_4', name: 'Korean Skincare', category: 'skincare', trending: true },
  { id: 'kw_5', name: 'Dewy Makeup', category: 'makeup', trending: true },
  { id: 'kw_6', name: 'Minimalist Beauty', category: 'lifestyle', trending: false }
];

export const videos = [
  {
    id: 'vid_1',
    title: 'Glass Skin Tutorial',
    thumbnailUrl: '/video-thumbnails/glass-skin-tutorial.svg',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    likes: 15000,
    platform: 'TikTok',
    creator: '@skincare_guru',
    duration: '0:45',
    audioId: 'audio_1', // Viral
    keywordId: 'kw_1', // Glass Skin
    tags: ['glass skin', 'skincare', 'korean beauty']
  },
  {
    id: 'vid_2',
    title: 'Vanilla Girl Makeup Look',
    thumbnailUrl: '/video-thumbnails/vanilla-girl-makeup.svg',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    likes: 23000,
    platform: 'Instagram',
    creator: '@makeup_artist',
    duration: '1:20',
    audioId: 'audio_2', // Aesthetic
    keywordId: 'kw_2', // Vanilla Girl
    tags: ['vanilla girl', 'minimal makeup', 'natural beauty']
  },
  {
    id: 'vid_3',
    title: '5-Step Korean Routine',
    thumbnailUrl: '/video-thumbnails/korean-routine.svg',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    likes: 8500,
    platform: 'YouTube',
    creator: '@k_beauty_tips',
    duration: '3:15',
    audioId: 'audio_3', // Trending
    keywordId: 'kw_3', // Korean Skincare
    tags: ['korean skincare', 'routine', 'skincare steps']
  },
  {
    id: 'vid_4',
    title: 'Dewy Skin Secrets',
    thumbnailUrl: '/video-thumbnails/dewy-skin-secrets.svg',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    likes: 12000,
    platform: 'TikTok',
    creator: '@glowup_queen',
    duration: '0:30',
    audioId: 'audio_2', // Aesthetic
    keywordId: 'kw_5', // Dewy Makeup
    tags: ['dewy skin', 'glowing skin', 'makeup']
  },
  {
    id: 'vid_5',
    title: 'Natural Beauty Routine',
    thumbnailUrl: '/video-thumbnails/natural-beauty-routine.svg',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    likes: 9800,
    platform: 'Instagram',
    creator: '@natural_beauty',
    duration: '2:10',
    audioId: 'audio_4', // Chill
    keywordId: 'kw_6', // Minimalist Beauty
    tags: ['natural beauty', 'minimal routine', 'skincare']
  },
  {
    id: 'vid_6',
    title: 'Glass Skin with Aesthetic Vibes',
    thumbnailUrl: '/video-thumbnails/glass-skin-aesthetic.svg',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    likes: 18500,
    platform: 'TikTok',
    creator: '@aesthetic_beauty',
    duration: '1:05',
    audioId: 'audio_2', // Aesthetic
    keywordId: 'kw_1', // Glass Skin
    tags: ['glass skin', 'aesthetic', 'skincare']
  },
  {
    id: 'vid_7',
    title: 'Vanilla Girl Look Tutorial',
    thumbnailUrl: '/video-thumbnails/vanilla-girl-tutorial.svg',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    likes: 31000,
    platform: 'Instagram',
    creator: '@minimal_makeup',
    duration: '0:58',
    audioId: 'audio_1', // Viral
    keywordId: 'kw_2', // Vanilla Girl
    tags: ['vanilla girl', 'tutorial', 'makeup']
  },
  {
    id: 'vid_8',
    title: 'Korean Beauty Secrets',
    thumbnailUrl: '/video-thumbnails/korean-beauty-secrets.svg',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    likes: 14200,
    platform: 'YouTube',
    creator: '@kbeauty_expert',
    duration: '4:20',
    audioId: 'audio_3', // Trending
    keywordId: 'kw_3', // Korean Skincare
    tags: ['korean beauty', 'skincare', 'beauty secrets']
  }
];

// Regional data sets
export const dataByRegion = {
  malaysia: {
    heroInsight: {
      title: "Malaysian Beauty Market Alert",
      description: "The #VanillaGirl trend is peaking in Malaysia, 3 weeks behind global trend cycle. Perfect timing for campaign launch.",
      metric: "89% growth this week",
      action: "Launch recommended within 7 days"
    },
    performanceMetrics: [
      {
        title: "Campaign ROI",
        value: "312%",
        change: "+24%",
        trend: "up",
        color: "text-green-600"
      },
      {
        title: "Engagement Rate",
        value: "4.8%",
        change: "+12%", 
        trend: "up",
        color: "text-blue-600"
      },
      {
        title: "Video Views",
        value: "2.4M",
        change: "+18%",
        trend: "up", 
        color: "text-purple-600"
      },
      {
        title: "Trend Accuracy",
        value: "89%",
        change: "+5%",
        trend: "up",
        color: "text-orange-600"
      }
    ],
    latestTrends: [
      { id: 1, name: "#CleanGirl", engagement: "92%", growth: "+45%", platform: "TikTok" },
      { id: 2, name: "#GlassSkin", engagement: "88%", growth: "+38%", platform: "Instagram" },
      { id: 3, name: "#SkinCycling", engagement: "75%", growth: "+28%", platform: "YouTube" },
      { id: 4, name: "#DewyMakeup", engagement: "82%", growth: "+22%", platform: "TikTok" },
      { id: 5, name: "#NaturalGlow", engagement: "79%", growth: "+19%", platform: "Instagram" },
      { id: 6, name: "#MinimalMakeup", engagement: "71%", growth: "+15%", platform: "TikTok" },
    ],
    trendInsight: {
      title: "Trend Insight",
      message: "Malaysia is now leading the #VanillaGirl trend, showing 62% engagement while global markets are declining to 30%. This presents a unique opportunity for localized campaigns."
    }
  },
  global: {
    heroInsight: {
      title: "Global Beauty Trends Overview",
      description: "Global beauty market shows diverse regional preferences. #CleanGirl leads worldwide with strong momentum in Western markets.",
      metric: "156% global reach",
      action: "Multi-regional campaign recommended"
    },
    performanceMetrics: [
      {
        title: "Global ROI",
        value: "285%",
        change: "+18%",
        trend: "up",
        color: "text-green-600"
      },
      {
        title: "Avg Engagement",
        value: "3.9%",
        change: "+8%", 
        trend: "up",
        color: "text-blue-600"
      },
      {
        title: "Total Views",
        value: "18.7M",
        change: "+25%",
        trend: "up", 
        color: "text-purple-600"
      },
      {
        title: "Market Coverage",
        value: "94%",
        change: "+12%",
        trend: "up",
        color: "text-orange-600"
      }
    ],
    latestTrends: [
      { id: 1, name: "#CleanGirl", engagement: "95%", growth: "+52%", platform: "TikTok" },
      { id: 2, name: "#SkinCare", engagement: "89%", growth: "+41%", platform: "Instagram" },
      { id: 3, name: "#GlowUp", engagement: "84%", growth: "+35%", platform: "YouTube" },
      { id: 4, name: "#Minimalism", engagement: "78%", growth: "+29%", platform: "TikTok" },
      { id: 5, name: "#SelfCare", engagement: "76%", growth: "+26%", platform: "Instagram" },
      { id: 6, name: "#Wellness", engagement: "73%", growth: "+23%", platform: "TikTok" },
    ],
    trendInsight: {
      title: "Global Market Insight",
      message: "Global beauty trends show strong cross-cultural adoption. #CleanGirl maintains 95% engagement across Western markets while Asian markets favor #GlassSkin. Multi-regional campaigns recommended for maximum impact."
    }
  }
};

// Legacy export for backward compatibility
export const heroInsight = dataByRegion.malaysia.heroInsight;

export const predictionData = [
  { day: 1, engagement: 100 },
  { day: 2, engagement: 150 },
  { day: 3, engagement: 280 },
  { day: 4, engagement: 420 },
  { day: 5, engagement: 580 },
  { day: 6, engagement: 720 },
  { day: 7, engagement: 850 },
  { day: 8, engagement: 920 },
  { day: 9, engagement: 980 },
  { day: 10, engagement: 1000 },
  { day: 11, engagement: 950 },
  { day: 12, engagement: 880 },
  { day: 13, engagement: 800 },
  { day: 14, engagement: 720 }
];

export const chatPrompts = [
  "What's trending in beauty?",
  "How does the Malaysian beauty market differ from global trends?",
  "Which L'Oréal products align with current trending keywords?",
  "What's the optimal posting time for beauty content in Malaysia?",
  "Analyze the performance potential of #VanillaGirl trend"
];

export const chatResponses = {
  "What's trending in beauty?": "Based on our analysis, Southeast Asia is seeing a strong rise in 'Glass Skin' and minimalist beauty trends, with a 67% increase in related content. The region shows particular interest in K-beauty influenced routines and natural, dewy finishes. Malaysia specifically is leading in the adoption of the #VanillaGirl aesthetic.",
  
  "How does the Malaysian beauty market differ from global trends?": "Malaysian consumers tend to adopt global beauty trends 2-3 weeks after they peak internationally, but with higher engagement rates (+34% vs global average). They show stronger preference for skincare-focused content and multi-step routines. The market is particularly responsive to influencer-driven trends from Singapore and Thailand.",
  
  "Which L'Oréal products align with current trending keywords?": "For 'Glass Skin': Revitalift Crystal Micro-Essence and Hydra Genius line. For 'Vanilla Girl': True Match foundation in light coverage and Lash Paradise mascara in brown. For 'Dewy Makeup': Glow Mon Amour highlighting drops and Infallible Pro-Glow foundation.",
  
  "What's the optimal posting time for beauty content in Malaysia?": "Peak engagement occurs between 7-9 PM MYT on weekdays, and 2-4 PM on weekends. Tuesday and Thursday show highest engagement for skincare content, while Friday-Sunday perform best for makeup tutorials. Consider Ramadan and local holidays for content calendar planning.",
  
  "Analyze the performance potential of #VanillaGirl trend": "High potential: 89% growth rate, strong demographic alignment with L'Oréal target audience (18-34), and currently at peak adoption phase in Malaysia. Recommended action: Launch campaign within 7 days to maximize trend momentum. Expected reach: 2.4M+ impressions in first week."
};
