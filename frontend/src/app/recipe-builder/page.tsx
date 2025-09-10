"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LineChartComponent from '@/components/LineChartComponent';
import VideoMosaic from '@/components/VideoMosaic';
import { audios, keywords, predictionData } from '@/lib/data';
import { Sparkles, Target, TrendingUp, Play } from 'lucide-react';

export default function RecipeBuilder() {
  const [selectedAudio, setSelectedAudio] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [predictionScore, setPredictionScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recipe Builder</h1>
        <p className="text-muted-foreground">
          Combine trending elements to create high-performing beauty campaigns
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Builder Panel (Left) */}
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

        {/* Results Panel (Right) */}
        <div className="space-y-6">
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
                        stroke="#d41e2c"
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

          {/* Inspiration Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Inspiration Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <VideoMosaic onVideoClick={(videoId) => console.log('Video clicked:', videoId)} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
