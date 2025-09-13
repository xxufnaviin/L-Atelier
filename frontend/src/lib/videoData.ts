// Sample video data with embedded video URLs for demo purposes
// In production, these would be actual video files or streaming URLs

export interface VideoContent {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  creator: string;
  likes: number;
  platform: string;
  audioId: string;
  keywordId: string;
  tags: string[];
}

// Using working sample videos for demo
export const sampleVideos: VideoContent[] = [
  {
    id: 'vid_1',
    title: 'Glass Skin Tutorial',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&crop=face',
    duration: '0:45',
    creator: '@skincare_guru',
    likes: 15000,
    platform: 'TikTok',
    audioId: 'audio_1',
    keywordId: 'kw_1',
    tags: ['glass skin', 'skincare', 'korean beauty']
  },
  {
    id: 'vid_2',
    title: 'Vanilla Girl Makeup Look',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop&crop=face',
    duration: '1:20',
    creator: '@makeup_artist',
    likes: 23000,
    platform: 'Instagram',
    audioId: 'audio_2',
    keywordId: 'kw_2',
    tags: ['vanilla girl', 'minimal makeup', 'natural beauty']
  },
  {
    id: 'vid_3',
    title: 'Dewy Skin Secrets',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop&crop=face',
    duration: '0:30',
    creator: '@glowup_queen',
    likes: 12000,
    platform: 'TikTok',
    audioId: 'audio_2',
    keywordId: 'kw_5',
    tags: ['dewy skin', 'glowing skin', 'makeup']
  },
  {
    id: 'vid_4',
    title: 'Vanilla Girl Look Tutorial',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=300&fit=crop&crop=face',
    duration: '0:58',
    creator: '@minimal_makeup',
    likes: 31000,
    platform: 'Instagram',
    audioId: 'audio_1',
    keywordId: 'kw_2',
    tags: ['vanilla girl', 'tutorial', 'makeup']
  }
];

// Generate video based on recipe parameters
export function generateVideoForRecipe(audioId: string, keywordId: string, platform: string): VideoContent {
  const baseVideos = sampleVideos.filter(v => 
    v.audioId === audioId || v.keywordId === keywordId || v.platform === platform
  );
  
  const selectedVideo = baseVideos[0] || sampleVideos[0];
  
  // Create a new video based on the recipe
  return {
    ...selectedVideo,
    id: `generated_${Date.now()}`,
    title: `Generated ${getKeywordName(keywordId)} Tutorial`,
    creator: '@ai_generated',
    likes: Math.floor(Math.random() * 50000) + 10000,
    platform: platform || selectedVideo.platform
  };
}

function getKeywordName(keywordId: string): string {
  const keywordMap: Record<string, string> = {
    'kw_1': 'Glass Skin',
    'kw_2': 'Vanilla Girl',
    'kw_3': 'Clean Girl',
    'kw_4': 'Korean Skincare',
    'kw_5': 'Dewy Makeup',
    'kw_6': 'Minimalist Beauty'
  };
  return keywordMap[keywordId] || 'Beauty';
}

// Fallback placeholder video URLs for when external videos fail
export const fallbackVideoUrls = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
];

// Create a video element with proper attributes
export function createVideoElement(videoUrl: string, thumbnailUrl: string): string {
  return `
    <video 
      width="100%" 
      height="100%" 
      poster="${thumbnailUrl}"
      controls
      muted
      loop
      style="object-fit: cover; border-radius: 8px;"
    >
      <source src="${videoUrl}" type="video/mp4">
      <p>Your browser doesn't support HTML5 video. Here is a <a href="${videoUrl}">link to the video</a> instead.</p>
    </video>
  `;
}
