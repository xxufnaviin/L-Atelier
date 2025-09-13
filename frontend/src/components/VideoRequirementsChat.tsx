"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Send, 
  X, 
  Sparkles, 
  Video, 
  User, 
  Clock,
  Target,
  Palette,
  Music,
  Users,
  MapPin,
  Wand2,
  CheckCircle
} from 'lucide-react';

interface VideoRequirement {
  id: string;
  category: string;
  text: string;
  timestamp: Date;
}

interface VideoRequirementsChatProps {
  onRequirementsComplete: (requirements: VideoRequirement[], summary: string) => void;
  initialRequirements?: VideoRequirement[];
  isOpen: boolean;
  onClose: () => void;
}

const REQUIREMENT_CATEGORIES = [
  { key: 'style', label: 'Visual Style', icon: Palette, color: 'text-purple-600' },
  { key: 'talent', label: 'Talent/Creator', icon: User, color: 'text-blue-600' },
  { key: 'duration', label: 'Duration', icon: Clock, color: 'text-green-600' },
  { key: 'music', label: 'Audio/Music', icon: Music, color: 'text-pink-600' },
  { key: 'audience', label: 'Target Audience', icon: Users, color: 'text-orange-600' },
  { key: 'location', label: 'Setting/Location', icon: MapPin, color: 'text-red-600' },
  { key: 'goal', label: 'Campaign Goal', icon: Target, color: 'text-indigo-600' }
];

const QUICK_PROMPTS = [
  { category: 'style', text: "I want a dreamy, aesthetic video with soft lighting" },
  { category: 'talent', text: "Feature a female creator in their 20s with natural makeup" },
  { category: 'duration', text: "Keep it short, around 15-30 seconds for maximum engagement" },
  { category: 'music', text: "Use trending audio that matches the vanilla girl aesthetic" },
  { category: 'audience', text: "Target Gen Z audience, especially Malaysian users" },
  { category: 'location', text: "Film in a bright, minimalist bedroom or bathroom setting" },
  { category: 'goal', text: "Focus on showcasing the natural, effortless beauty look" }
];

export default function VideoRequirementsChat({ 
  onRequirementsComplete, 
  initialRequirements = [],
  isOpen,
  onClose
}: VideoRequirementsChatProps) {
  const [requirements, setRequirements] = useState<VideoRequirement[]>(initialRequirements);
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [requirements]);

  const addRequirement = (text: string, category?: string) => {
    if (!text.trim()) return;

    const newRequirement: VideoRequirement = {
      id: Date.now().toString(),
      category: category || selectedCategory || 'general',
      text: text.trim(),
      timestamp: new Date()
    };

    setRequirements(prev => [...prev, newRequirement]);
    setInputText('');
    setSelectedCategory(null);
    setShowQuickPrompts(false);
  };

  const removeRequirement = (id: string) => {
    setRequirements(prev => prev.filter(req => req.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      addRequirement(inputText);
    }
  };

  const handleQuickPrompt = (prompt: { category: string; text: string }) => {
    addRequirement(prompt.text, prompt.category);
  };

  const generateVideoSummary = (): string => {
    if (requirements.length === 0) {
      return "Create a basic video following the selected recipe parameters.";
    }

    const categories = REQUIREMENT_CATEGORIES.reduce((acc, cat) => {
      const reqs = requirements.filter(req => req.category === cat.key);
      if (reqs.length > 0) {
        acc[cat.key] = reqs.map(req => req.text).join(', ');
      }
      return acc;
    }, {} as Record<string, string>);

    let summary = "Create a video with the following specifications:\n";
    
    Object.entries(categories).forEach(([key, value]) => {
      const category = REQUIREMENT_CATEGORIES.find(cat => cat.key === key);
      if (category) {
        summary += `\n${category.label}: ${value}`;
      }
    });

    return summary;
  };

  const handleComplete = () => {
    const summary = generateVideoSummary();
    onRequirementsComplete(requirements, summary);
  };

  const getCategoryIcon = (category: string) => {
    const cat = REQUIREMENT_CATEGORIES.find(c => c.key === category);
    return cat ? cat.icon : MessageCircle;
  };

  const getCategoryColor = (category: string) => {
    const cat = REQUIREMENT_CATEGORIES.find(c => c.key === category);
    return cat ? cat.color : 'text-gray-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-loreal-red to-loreal-red-light text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Video Requirements</CardTitle>
                <p className="text-sm opacity-90">Tell us more about your ideal video</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Welcome message */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-loreal-red/10 rounded-full">
                  <Sparkles className="h-4 w-4 text-loreal-red" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Let's customize your video! 
                  </p>
                  <p className="text-sm text-gray-600">
                    Share any specific requirements, preferences, or ideas for your video. 
                    You can add details about style, talent, duration, music, and more.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick prompts */}
            {showQuickPrompts && requirements.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Quick suggestions:</p>
                <div className="grid gap-2">
                  {QUICK_PROMPTS.slice(0, 3).map((prompt, index) => {
                    const category = REQUIREMENT_CATEGORIES.find(cat => cat.key === prompt.category);
                    const Icon = category?.icon || MessageCircle;
                    return (
                      <button
                        key={index}
                        onClick={() => handleQuickPrompt(prompt)}
                        className="flex items-start gap-3 p-3 text-left bg-white border border-gray-200 hover:border-loreal-red/30 hover:bg-loreal-red/5 rounded-lg transition-all duration-200"
                      >
                        <Icon className={`h-4 w-4 mt-0.5 ${category?.color || 'text-gray-600'}`} />
                        <span className="text-sm text-gray-700">{prompt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Requirements list */}
            {requirements.map((requirement) => {
              const Icon = getCategoryIcon(requirement.category);
              const color = getCategoryColor(requirement.category);
              const category = REQUIREMENT_CATEGORIES.find(cat => cat.key === requirement.category);
              
              return (
                <div key={requirement.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-gray-50`}>
                      <Icon className={`h-4 w-4 ${color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-500 uppercase">
                          {category?.label || requirement.category}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRequirement(requirement.id)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-900">{requirement.text}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {requirement.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Category selector */}
          <div className="border-t border-gray-100 p-4 pb-2">
            <p className="text-xs text-gray-500 mb-2">Select category (optional):</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {REQUIREMENT_CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.key ? null : category.key
                    )}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                      selectedCategory === category.key
                        ? 'bg-loreal-red text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input area */}
          <div className="border-t border-gray-100 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
              <Input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Describe any specific requirements..."
                className="flex-1 text-sm"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!inputText.trim()}
                className="bg-loreal-red hover:bg-loreal-red/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>

            {/* Action buttons */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {requirements.length} requirement{requirements.length !== 1 ? 's' : ''} added
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleComplete}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Create Video
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
