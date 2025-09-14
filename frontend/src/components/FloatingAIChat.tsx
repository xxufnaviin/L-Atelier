"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, MessageCircle, X, Send, Sparkles, TrendingUp, BarChart3, Users, Navigation, Wand2, Video, Target, Maximize2 } from 'lucide-react';
import { chatPrompts, chatResponses } from '@/lib/data';
import { useGlobalStore } from '@/lib/store';
import { mcpService } from '@/lib/mcpService';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ChartModal from './ChartModal';

// Dynamically import the chart component to avoid SSR issues
const AIChatChart = dynamic(() => import('./AIChatChart'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-sm text-gray-500">Loading chart...</div>
});

interface ChartData {
  type: 'line' | 'bar' | 'doughnut' | 'pie';
  data: any;
  options?: any;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  chartData?: ChartData;
  action?: 'navigate' | 'generate' | 'video_generate' | 'ask_question';
  parameters?: any;
  confidence?: number;
  conversationState?: any;
}

export default function FloatingAIChat() {
  const { isChatOpen, openChat, closeChat } = useGlobalStore();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI Trend Analyst. I can help you understand beauty trends, build recipes, generate predictions, and create videos. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [selectedChartData, setSelectedChartData] = useState<ChartData | null>(null);
  const [selectedChartTitle, setSelectedChartTitle] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle chart click to open modal
  const handleChartClick = (chartData: ChartData, title: string) => {
    setSelectedChartData(chartData);
    setSelectedChartTitle(title);
    setIsChartModalOpen(true);
  };

  // Close chart modal
  const closeChartModal = () => {
    setIsChartModalOpen(false);
    setSelectedChartData(null);
    setSelectedChartTitle('');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateChartData = (message: string): ChartData | null => {
    const lowerMessage = message.toLowerCase();
    
    // Detect chart requests
    if (lowerMessage.includes('chart') || lowerMessage.includes('graph') || lowerMessage.includes('trend') || lowerMessage.includes('data') || lowerMessage.includes('analytics')) {
      
      if (lowerMessage.includes('growth') || lowerMessage.includes('trend') || lowerMessage.includes('vanilla girl')) {
        // Generate trend line chart
        return {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
              label: '#VanillaGirl Trend Growth',
              data: [12, 19, 35, 48, 65, 89, 94],
              borderColor: '#d41e2c',
              backgroundColor: 'rgba(212, 30, 44, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top' as const
              },
              title: {
                display: true,
                text: 'Trend Growth Analysis'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: function(value: any) {
                    return value + '%';
                  }
                }
              }
            }
          }
        };
      }
      
      if (lowerMessage.includes('demographic') || lowerMessage.includes('audience') || lowerMessage.includes('age')) {
        // Generate demographic pie chart
        return {
          type: 'doughnut',
          data: {
            labels: ['18-24', '25-34', '35-44', '45+'],
            datasets: [{
              label: 'Target Demographics',
              data: [35, 40, 20, 5],
              backgroundColor: [
                '#d41e2c',
                '#ff6b6b',
                '#ffa726',
                '#66bb6a'
              ],
              borderWidth: 2,
              borderColor: '#fff'
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'bottom' as const
              },
              title: {
                display: true,
                text: 'Audience Demographics'
              }
            }
          }
        };
      }
      
      if (lowerMessage.includes('comparison') || lowerMessage.includes('vs') || lowerMessage.includes('compare')) {
        // Generate comparison bar chart
        return {
          type: 'bar',
          data: {
            labels: ['VanillaGirl', 'GlassSkin', 'KoreanSkincare', 'DewySkin', 'CleanGirl'],
            datasets: [{
              label: 'Engagement %',
              data: [94, 89, 91, 87, 82],
              backgroundColor: [
                '#d41e2c',
                '#ff6b6b',
                '#ffa726',
                '#66bb6a',
                '#42a5f5'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: 'Trend Comparison Analysis'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: function(value: any) {
                    return value + '%';
                  }
                }
              }
            }
          }
        };
      }
      
      // Default trend chart for generic requests
      return {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [{
            label: 'Beauty Trends Performance',
            data: [45, 67, 78, 89],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top' as const
            },
            title: {
              display: true,
              text: 'Trend Performance'
            }
          }
        }
      };
    }
    
    return null;
  };

  const sendMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Use MCP service to analyze intent
      console.log('Chatbot Debug - Analyzing message:', message);
      const mcpResponse = await mcpService.analyzeIntent({
        message,
        previousMessages: messages.map(m => m.text),
        currentPage: window.location.pathname
      });
      
      console.log('Chatbot Debug - MCP Response:', mcpResponse);

      // Generate chart data if applicable
      const chartData = generateChartData(message);
      
      // Get response text
      let responseText = mcpResponse.message || chatResponses[message as keyof typeof chatResponses];
      
      if (!responseText) {
        if (chartData) {
          responseText = "Here's the visual analysis you requested. The chart below shows the key insights from our trend data analysis.";
        } else {
          responseText = "I understand you're interested in beauty trends. Let me analyze the current data for you. Based on our latest insights, I recommend focusing on emerging trends like 'Vanilla Girl' aesthetic and 'Glass Skin' techniques, which are showing strong growth in the Malaysian market.";
        }
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        chartData: chartData || undefined,
        action: mcpResponse.action,
        parameters: mcpResponse.parameters,
        confidence: mcpResponse.confidence,
        conversationState: mcpResponse.conversationState
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMessage]);

      // Execute actions based on MCP response
      if (mcpResponse.action === 'navigate' && mcpResponse.parameters) {
        setTimeout(() => {
          const params = mcpService.formatNavigationParams(mcpResponse.parameters);
          const action = mcpResponse.parameters.action ? `&action=${mcpResponse.parameters.action}` : '';
          router.push(`/recipe-builder?${params}${action}`);
        }, 1500); // Small delay to let user read the message
      }

    } catch (error) {
      console.error('MCP Service error:', error);
      
      // Fallback to original behavior
      const chartData = generateChartData(message);
      const response = chatResponses[message as keyof typeof chatResponses] || 
        "I'm here to help you with beauty trends and campaign strategies. What would you like to explore?";
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
        chartData: chartData || undefined
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMessage]);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
          <Button
            onClick={openChat}
            size="lg"
            className="rounded-full h-14 w-14 bg-loreal-red hover:bg-loreal-red/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative">
              <Bot className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </Button>
        )}
      </div>

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]">
          <Card className="w-full h-full flex flex-col shadow-2xl border-loreal-red/20">
            {/* Header */}
            <CardHeader className="pb-4 bg-gradient-to-r from-loreal-red to-loreal-red-light text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/20 rounded-full">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">AI Trend Analyst</CardTitle>
                    <p className="text-xs opacity-90">Always learning, always helping</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeChat}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-4 pt-2 pb-4 space-y-4 scroll-smooth"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.isUser
                          ? 'bg-loreal-red text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {!message.isUser && (
                        <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
                          <Sparkles className="h-3 w-3" />
                          AI Analysis
                        </div>
                      )}
                      <p className="leading-relaxed">{message.text}</p>
                      
                      {/* Action Buttons */}
                      {message.action && !message.isUser && (
                        <div className="mt-3 flex gap-2">
                          {message.action === 'navigate' && (
                            <Button
                              size="sm"
                              onClick={() => {
                                const params = mcpService.formatNavigationParams(message.parameters);
                                router.push(`/recipe-builder?${params}`);
                              }}
                              className="bg-loreal-red hover:bg-loreal-red/90 text-white text-xs"
                            >
                              <Navigation className="h-3 w-3 mr-1" />
                              Go to Recipe Builder
                            </Button>
                          )}
                          {message.action === 'generate' && (
                            <Button
                              size="sm"
                              onClick={() => {
                                router.push('/recipe-builder?action=generate');
                              }}
                              className="bg-green-600 hover:bg-green-700 text-white text-xs"
                            >
                              <Wand2 className="h-3 w-3 mr-1" />
                              Generate Prediction
                            </Button>
                          )}
                          {message.action === 'video_generate' && (
                            <Button
                              size="sm"
                              onClick={() => {
                                const params = mcpService.formatNavigationParams(message.parameters);
                                router.push(`/recipe-builder?${params}&action=video`);
                              }}
                              className="bg-purple-600 hover:bg-purple-700 text-white text-xs"
                            >
                              <Wand2 className="h-3 w-3 mr-1" />
                              Create Video
                            </Button>
                          )}
                          {message.confidence && (
                            <span className="text-xs text-gray-500 self-center">
                              {Math.round(message.confidence * 100)}% confident
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Chart Display */}
                      {message.chartData && !message.isUser && (
                        <div className="mt-4 p-3 bg-white rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Trend Analysis Chart</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleChartClick(message.chartData!, "Trend Analysis Chart")}
                              className="text-loreal-red hover:text-loreal-red/80 hover:bg-loreal-red/10"
                            >
                              <Maximize2 className="h-4 w-4 mr-1" />
                              Expand
                            </Button>
                          </div>
                          <div 
                            className="h-64 w-full cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => handleChartClick(message.chartData!, "Trend Analysis Chart")}
                          >
                            <AIChatChart chartData={message.chartData} />
                          </div>
                        </div>
                      )}
                      
                      <p className={`text-xs mt-2 ${message.isUser ? 'text-white/70' : 'text-gray-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg text-sm bg-gray-100 text-gray-900">
                      <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
                        <Sparkles className="h-3 w-3" />
                        AI Analysis
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>


              {/* Quick Questions - Above Input */}
              <div className="px-4 py-2 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-500">Quick questions:</p>
                  <Sparkles className="h-3 w-3 text-loreal-red" />
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {chatPrompts.slice(0, 2).map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="flex-shrink-0 flex items-center gap-2 px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors whitespace-nowrap"
                    >
                      {index === 0 && <TrendingUp className="h-3 w-3 text-loreal-red" />}
                      {index === 1 && <Users className="h-3 w-3 text-loreal-red" />}
                      <span>{prompt}</span>
                    </button>
                  ))}
                  {/* Chart-specific prompts */}
                  <button
                    onClick={() => handleQuickPrompt("Show me trend growth chart")}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors whitespace-nowrap"
                  >
                    <BarChart3 className="h-3 w-3 text-loreal-red" />
                    <span>Trend growth chart</span>
                  </button>
                  <button
                    onClick={() => handleQuickPrompt("Compare beauty trends")}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors whitespace-nowrap"
                  >
                    <BarChart3 className="h-3 w-3 text-loreal-red" />
                    <span>Compare trends</span>
                  </button>
                </div>
                
                {/* Smart Recipe Building Prompts */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mt-2">
                  <button
                    onClick={() => {
                      // Direct navigation for quick actions
                      router.push('/recipe-builder?audio=audio_2&keyword=kw_2&platform=TikTok&audience=Gen Z&action=generate');
                    }}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-2 text-xs bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors whitespace-nowrap"
                  >
                    <Wand2 className="h-3 w-3 text-rose-600" />
                    <span>Vanilla Girl Recipe</span>
                  </button>
                  <button
                    onClick={() => {
                      // Direct navigation for glass skin video
                      router.push('/recipe-builder?audio=audio_2&keyword=kw_1&platform=Instagram&audience=Millennials&action=video');
                    }}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-2 text-xs bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors whitespace-nowrap"
                  >
                    <Video className="h-3 w-3 text-blue-600" />
                    <span>Glass Skin Video</span>
                  </button>
                  <button
                    onClick={() => {
                      // Direct navigation for dewy makeup prediction
                      router.push('/recipe-builder?audio=audio_2&keyword=kw_5&platform=TikTok&audience=Gen Z&action=generate');
                    }}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-2 text-xs bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors whitespace-nowrap"
                  >
                    <Target className="h-3 w-3 text-green-600" />
                    <span>Dewy Makeup Prediction</span>
                  </button>
                </div>
              </div>

              {/* Input Area */}
              <div className="px-4 py-3 pt-2">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about trends..."
                    className="flex-1 text-sm"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!inputMessage.trim()}
                    className="bg-loreal-red hover:bg-loreal-red/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-400 mt-2">
                  AI responses are based on current trend data and analysis
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chart Modal */}
      <ChartModal
        isOpen={isChartModalOpen}
        onClose={closeChartModal}
        chartData={selectedChartData}
        title={selectedChartTitle}
      />
    </>
  );
}
