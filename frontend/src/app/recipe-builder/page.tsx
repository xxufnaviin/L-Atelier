"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LineChartComponent from '@/components/LineChartComponent';
import VideoMosaic from '@/components/VideoMosaic';
import VideoRequirementsChat from '@/components/VideoRequirementsChat';
import { audios, keywords, predictionData } from '@/lib/data';
import { generateVideoForRecipe, sampleVideos } from '@/lib/videoData';
import { Sparkles, Target, TrendingUp, Play, Crown, Video, Download, Share, Wand2, User, Heart, Zap, MessageSquare } from 'lucide-react';

export default function RecipeBuilder() {
  const [selectedAudio, setSelectedAudio] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [predictionScore, setPredictionScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showVanillaGirlPreset, setShowVanillaGirlPreset] = useState(false);
  
  // Video Generator States
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);
  const [videoPrompt, setVideoPrompt] = useState('');
  const [showVideoGenerator, setShowVideoGenerator] = useState(false);
  
  // Video Requirements States
  const [showRequirementsChat, setShowRequirementsChat] = useState(false);
  const [videoRequirements, setVideoRequirements] = useState<any[]>([]);
  const [requirementsSummary, setRequirementsSummary] = useState('');

  // Check for URL parameters to auto-apply filters and actions
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Handle legacy trend parameter
    const trend = urlParams.get('trend');
    if (trend === 'VanillaGirl') {
      setShowVanillaGirlPreset(true);
    }

    // Handle MCP-generated parameters
    const audio = urlParams.get('audio');
    const keyword = urlParams.get('keyword');
    const platform = urlParams.get('platform');
    const audience = urlParams.get('audience');
    const action = urlParams.get('action');

    // Auto-apply filters from chatbot
    if (audio) setSelectedAudio(audio);
    if (keyword) setSelectedKeyword(keyword);
    if (platform) setSelectedPlatform(platform);
    if (audience) {
      // Map audience values properly
      const audienceMap: Record<string, string> = {
        'Gen Z': 'Gen Z',
        'Millennials': 'Millennials', 
        'All': 'All'
      };
      setSelectedAudience(audienceMap[audience] || audience);
    }

    // Auto-execute actions
    if (action === 'generate' && audio && keyword && platform && audience) {
      setTimeout(() => {
        generatePrediction();
      }, 500); // Small delay to let state update
    }

    if (action === 'video' && audio && keyword && platform && audience) {
      setTimeout(() => {
        generatePrediction();
        setTimeout(() => {
          generateVideoWithRequirements();
        }, 1000);
      }, 500);
    }

    // Clean URL after processing
    if (audio || keyword || platform || audience || action) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  const applyVanillaGirlPreset = () => {
    setSelectedAudio('audio_2'); // Aesthetic
    setSelectedKeyword('kw_2'); // Vanilla Girl
    setSelectedPlatform('TikTok');
    setSelectedAudience('Gen Z');
    setShowVanillaGirlPreset(false);
    
    // Auto-generate prediction for this optimal combination
    setPredictionScore(94);
    setShowResults(true);
  };

  const generatePrediction = () => {
    // Simple scoring algorithm based on selections
    let score = 60; // Base score
    
    if (selectedAudio) score += 10;
    if (selectedKeyword) score += 15;
    if (selectedPlatform === 'TikTok') score += 10;
    if (selectedAudience === 'Gen Z') score += 5;
    
    // Add some randomness for demo
    score += Math.random() * 10;
    
    setPredictionScore(Math.min(100, Math.round(score)));
    setShowResults(true);
  };

  const getScoreColor = () => {
    if (predictionScore >= 80) return 'text-green-500';
    if (predictionScore >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreGradient = () => {
    if (predictionScore >= 80) return 'from-green-500 to-green-600';
    if (predictionScore >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  // Requirements handling functions
  const handleRequirementsComplete = (requirements: any, summary: string) => {
    setVideoRequirements(requirements);
    setRequirementsSummary(summary);
    setShowRequirementsChat(false);
    // Automatically start video generation with requirements
    generateVideoWithRequirements(summary);
  };

  const openRequirementsChat = () => {
    setShowRequirementsChat(true);
  };

  // Enhanced video generation function
  const generateVideoWithRequirements = async (customRequirements = '') => {
    if (!showResults) return;
    
    setIsGeneratingVideo(true);
    setShowVideoGenerator(true);
    
    // Build enhanced prompt based on current recipe and requirements
    const audioName = audios.find(a => a.id === selectedAudio)?.name || 'trending audio';
    const keywordName = keywords.find(k => k.id === selectedKeyword)?.name || 'trending keyword';
    
    let basePrompt = `Create a ${selectedPlatform || 'social media'} influencer video featuring ${audioName} and ${keywordName} for ${selectedAudience || 'young adults'}`;
    
    // Add requirements summary if available
    if (customRequirements || requirementsSummary) {
      basePrompt += `\n\nAdditional Requirements:\n${customRequirements || requirementsSummary}`;
    }
    
    setVideoPrompt(basePrompt);
    
    // Generate AI video using actual video content (3 seconds)
    setTimeout(() => {
      const generatedVideoData = generateVideoForRecipe(selectedAudio, selectedKeyword, selectedPlatform);
      
      const mockVideo = {
        id: Date.now(),
        title: `${keywordName} Tutorial`,
        thumbnail: generatedVideoData.thumbnailUrl,
        videoUrl: generatedVideoData.videoUrl,
        duration: generatedVideoData.duration,
        prompt: basePrompt,
        requirements: customRequirements || requirementsSummary,
        status: 'ready',
        creator: generatedVideoData.creator,
        likes: generatedVideoData.likes
      };
      
      setGeneratedVideo(mockVideo);
      setIsGeneratingVideo(false);
    }, 3000);
  };

  // Legacy video generation function for preset prompts
  const generateVideo = async (promptAddition = '') => {
    const fullRequirements = promptAddition ? `${requirementsSummary}\n\n${promptAddition}` : requirementsSummary;
    generateVideoWithRequirements(fullRequirements);
  };

  // Preset prompts for video generation
  const videoPresetPrompts = [
    {
      id: 'female',
      label: 'Female Creator',
      prompt: 'featuring a female influencer with natural makeup',
      icon: User,
      color: 'text-pink-600'
    },
    {
      id: 'aesthetic',
      label: 'Aesthetic Vibes',  
      prompt: 'with dreamy, aesthetic lighting and soft pastel colors',
      icon: Heart,
      color: 'text-purple-600'
    },
    {
      id: 'energetic',
      label: 'High Energy',
      prompt: 'with upbeat, energetic transitions and dynamic movements',
      icon: Zap,
      color: 'text-yellow-600'
    },
    {
      id: 'tutorial',
      label: 'Tutorial Style',
      prompt: 'in step-by-step tutorial format with clear instructions',
      icon: Target,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recipe Builder</h1>
        <p className="text-muted-foreground">
          Combine trending elements to create high-performing beauty campaigns
        </p>
      </div>

      {/* #VanillaGirl Preset Banner */}
      {showVanillaGirlPreset && (
        <Card className="mb-8 bg-gradient-to-r from-rose-50 to-rose-100 border-rose-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-rose-600" />
              <span className="text-rose-800">Recommended #VanillaGirl Recipe</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-rose-700">
                Our AI has analyzed the trending <span className="font-bold">#VanillaGirl</span> movement and created the optimal combination for maximum engagement in Malaysia.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-900">Audio</div>
                  <div className="text-rose-700">Aesthetic</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-900">Keyword</div>
                  <div className="text-rose-700">Vanilla Girl</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-900">Platform</div>
                  <div className="text-rose-700">TikTok</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-gray-900">Audience</div>
                  <div className="text-rose-700">Gen Z</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={applyVanillaGirlPreset}
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Apply This Recipe
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowVanillaGirlPreset(false)}
                  className="border-rose-300 text-rose-700 hover:bg-rose-50"
                >
                  Build My Own
                </Button>
                <div className="text-xs text-rose-600 ml-auto">
                  <span className="font-semibold">94% predicted success rate</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Filters + Score */}
        <div className="space-y-6">
          {/* Builder Panel - Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Craft Your Trend Recipe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Audio Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select a Trending Audio</label>
                <Select value={selectedAudio} onValueChange={setSelectedAudio}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an audio track..." />
                  </SelectTrigger>
                  <SelectContent>
                    {audios.map((audio) => (
                      <SelectItem key={audio.id} value={audio.id}>
                        <div className="flex items-center gap-2">
                          <Play className="h-3 w-3" />
                          {audio.name}
                          <span className="text-xs text-muted-foreground">({audio.platform})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Keyword Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Add a Keyword</label>
                <Select value={selectedKeyword} onValueChange={setSelectedKeyword}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a trending keyword..." />
                  </SelectTrigger>
                  <SelectContent>
                    {keywords.map((keyword) => (
                      <SelectItem key={keyword.id} value={keyword.id}>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3" />
                          {keyword.name}
                          <span className="text-xs text-muted-foreground">({keyword.category})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Platform Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select a Platform</label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your platform..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="Instagram">Instagram Reels</SelectItem>
                    <SelectItem value="YouTube">YouTube Shorts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Audience Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your audience..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gen Z">Gen Z (18-24)</SelectItem>
                    <SelectItem value="Millennials">Millennials (25-40)</SelectItem>
                    <SelectItem value="All">All Ages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={generatePrediction}
                className="w-full"
                variant="loreal"
                disabled={!selectedAudio || !selectedKeyword || !selectedPlatform || !selectedAudience}
              >
                Generate Prediction
              </Button>
            </CardContent>
          </Card>

          {/* Prediction Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Prediction Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showResults ? (
                <div className="text-center space-y-4">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeDasharray={`${predictionScore}, 100`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-3xl font-bold ${getScoreColor()}`}>
                        {predictionScore}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {predictionScore >= 80 && "Excellent potential! This combination is highly likely to succeed."}
                    {predictionScore >= 60 && predictionScore < 80 && "Good potential. Consider optimizing some elements."}
                    {predictionScore < 60 && "Moderate potential. Try different combinations for better results."}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Generate a prediction to see your success score</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Forecast */}
          {showResults && (
            <Card>
              <CardHeader>
                <CardTitle>Performance Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Projected engagement over 14 days
                  </p>
                  <div className="h-64">
                    <LineChartComponent
                      data={predictionData}
                      dataKey="engagement"
                      height={256}
                      showAxis={true}
                      showGrid={true}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Side: Mosaic + Preview */}
        <div className="space-y-6">
          {/* AI Video Generator - Always Available */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-loreal-red" />
                AI Video Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {showResults 
                    ? "Generate an influencer video based on your recipe. Add specific requirements for better results!"
                    : "Create a recipe first, then generate AI videos"
                  }
                </p>

                {/* Requirements Summary */}
                {requirementsSummary && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-blue-800 mb-1">Your Requirements:</p>
                        <p className="text-xs text-blue-700 whitespace-pre-line">{requirementsSummary}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={openRequirementsChat}
                          className="text-blue-600 hover:text-blue-800 p-0 h-auto mt-2"
                        >
                          Edit requirements
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {!showVideoGenerator && (
                  <div className="grid gap-2">
                    <Button 
                      onClick={openRequirementsChat}
                      className="w-full bg-loreal-red hover:bg-loreal-red/90"
                      size="lg"
                      disabled={!showResults}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {showResults ? "Add Requirements & Create Video" : "Create Recipe First"}
                    </Button>
                    <Button 
                      onClick={() => generateVideoWithRequirements()}
                      variant="outline"
                      className="w-full"
                      size="sm"
                      disabled={!showResults}
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      Quick Generate (No Custom Requirements)
                    </Button>
                  </div>
                )}

                {showVideoGenerator && (
                  <div className="space-y-4">
                    {/* Video Generation Status */}
                    {isGeneratingVideo && (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-loreal-red mx-auto mb-4"></div>
                        <p className="text-sm text-muted-foreground">
                          AI is crafting your video...
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {videoPrompt}
                        </p>
                      </div>
                    )}

                    {/* Generated Video Preview */}
                    {generatedVideo && !isGeneratingVideo && (
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            {generatedVideo.videoUrl ? (
                              <video 
                                width="100%" 
                                height="100%" 
                                poster={generatedVideo.thumbnail}
                                controls
                                muted
                                loop
                                className="w-full h-full object-cover"
                              >
                                <source src={generatedVideo.videoUrl} type="video/mp4" />
                                <p>Your browser doesn't support HTML5 video.</p>
                              </video>
                            ) : (
                              <>
                                <img 
                                  src={generatedVideo.thumbnail} 
                                  alt={generatedVideo.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <Play className="h-12 w-12 text-white" />
                                </div>
                              </>
                            )}
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {generatedVideo.duration}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">{generatedVideo.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Generated with: "{generatedVideo.prompt}"
                          </p>
                          {generatedVideo.requirements && (
                            <div className="bg-green-50 border border-green-200 rounded p-2">
                              <p className="text-xs font-medium text-green-800 mb-1">Custom Requirements Applied:</p>
                              <p className="text-xs text-green-700 whitespace-pre-line">{generatedVideo.requirements}</p>
                            </div>
                          )}
                          
                          {/* Video Actions */}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setGeneratedVideo(null);
                                setShowVideoGenerator(false);
                              }}
                            >
                              Create New
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Preset Prompts */}
                    {!isGeneratingVideo && !generatedVideo && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Quick Style Options:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {videoPresetPrompts.map((preset) => (
                            <Button
                              key={preset.id}
                              variant="outline"
                              size="sm"
                              onClick={() => generateVideo(preset.prompt)}
                              className="text-left justify-start h-auto py-3"
                            >
                              <preset.icon className={`h-4 w-4 mr-2 ${preset.color}`} />
                              <div>
                                <div className="font-medium text-xs">{preset.label}</div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {preset.prompt.split(' ').slice(0, 4).join(' ')}...
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Inspiration Gallery - Only show when recipe is created */}
          {showResults && (
            <Card>
              <CardHeader>
                <CardTitle>Related Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Videos using similar combinations
                    </p>
                    {/* Show active filters */}
                    <div className="flex flex-wrap gap-2">
                      {selectedAudio && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          Audio: {audios.find(a => a.id === selectedAudio)?.name}
                        </span>
                      )}
                      {selectedKeyword && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Keyword: {keywords.find(k => k.id === selectedKeyword)?.name}
                        </span>
                      )}
                      {selectedPlatform && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                          Platform: {selectedPlatform}
                        </span>
                      )}
                    </div>
                  </div>
                  <VideoMosaic 
                    onVideoClick={(videoId) => console.log('Video clicked:', videoId)}
                    filterBy={{
                      audio: selectedAudio,
                      keyword: selectedKeyword,
                      platform: selectedPlatform
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Video Requirements Chat Modal */}
      <VideoRequirementsChat
        isOpen={showRequirementsChat}
        onClose={() => setShowRequirementsChat(false)}
        onRequirementsComplete={handleRequirementsComplete}
        initialRequirements={videoRequirements}
      />
    </div>
  );
}
