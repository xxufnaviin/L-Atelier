// MCP (Model Context Protocol) Service for AI Chatbot Integration
// This service handles intelligent recipe building and auto-navigation

interface RecipeParameters {
  audio?: string;
  keyword?: string;
  platform?: string;
  audience?: string;
}

interface MCPResponse {
  action: 'navigate' | 'generate' | 'respond' | 'video_generate' | 'ask_question';
  parameters?: RecipeParameters;
  message?: string;
  confidence?: number;
  videoRequirements?: string;
  conversationState?: ConversationState;
}

interface ConversationState {
  waitingFor?: 'platform' | 'audience' | 'audio' | 'complete';
  collectedParams: RecipeParameters;
  originalIntent: 'recipe' | 'video';
  step: number;
}

interface ChatContext {
  message: string;
  previousMessages: string[];
  currentPage: string;
}

export class MCPService {
  private static instance: MCPService;
  
  static getInstance(): MCPService {
    if (!MCPService.instance) {
      MCPService.instance = new MCPService();
    }
    return MCPService.instance;
  }

  // Analyze user intent and determine appropriate action
  async analyzeIntent(context: ChatContext): Promise<MCPResponse> {
    const { message, previousMessages, currentPage } = context;
    const lowerMessage = message.toLowerCase();

    // Check if we're in a conversation flow
    const conversationState = this.getConversationState(previousMessages);
    
    // Handle conversation flow responses
    if (conversationState.waitingFor) {
      return this.handleConversationResponse(lowerMessage, conversationState);
    }

    // Recipe building intent patterns
    const recipeIntents = this.detectRecipeIntents(lowerMessage);
    
    console.log('MCP Debug - Message:', lowerMessage);
    console.log('MCP Debug - Recipe Intents:', recipeIntents);
    
    if (recipeIntents.shouldNavigate) {
      // Instead of navigating immediately, start a conversation
      return this.startRecipeConversation(recipeIntents);
    }

    // Video generation intent
    const videoIntents = this.detectVideoIntents(lowerMessage);
    if (videoIntents.shouldGenerate) {
      return this.startVideoConversation(videoIntents);
    }

    // Generate prediction intent
    if (this.detectGenerationIntent(lowerMessage)) {
      return {
        action: 'generate',
        message: `Let me generate a prediction for your recipe combination!`,
        confidence: 0.8
      };
    }

    // Default response
    return {
      action: 'respond',
      message: this.generateContextualResponse(lowerMessage, currentPage),
      confidence: 0.6
    };
  }

  private detectRecipeIntents(message: string) {
    const patterns = {
      // Audio patterns
      audio: {
        'aesthetic': 'audio_2',
        'oh no': 'audio_1', 
        'viral': 'audio_1',
        'trending audio': 'audio_2',
        'glowing up': 'audio_3',
        'skincare routine': 'audio_4',
        'makeup transformation': 'audio_5'
      },
      
      // Keyword patterns
      keyword: {
        'vanilla girl': 'kw_2',
        'glass skin': 'kw_1',
        'clean girl': 'kw_3',
        'korean skincare': 'kw_4',
        'dewy makeup': 'kw_5',
        'minimalist beauty': 'kw_6'
      },
      
      // Platform patterns
      platform: {
        'tiktok': 'TikTok',
        'instagram': 'Instagram',
        'youtube': 'YouTube',
        'reels': 'Instagram',
        'shorts': 'YouTube'
      },
      
      // Audience patterns
      audience: {
        'gen z': 'Gen Z',
        'millennials': 'Millennials',
        'young': 'Gen Z',
        'teens': 'Gen Z',
        'adults': 'Millennials'
      }
    };

    const parameters: RecipeParameters = {};
    let confidence = 0;
    let matchCount = 0;

    // Check for audio matches
    Object.entries(patterns.audio).forEach(([key, value]) => {
      if (message.includes(key)) {
        parameters.audio = value;
        confidence += 0.25;
        matchCount++;
      }
    });

    // Check for keyword matches
    Object.entries(patterns.keyword).forEach(([key, value]) => {
      if (message.includes(key)) {
        parameters.keyword = value;
        confidence += 0.25;
        matchCount++;
      }
    });

    // Check for platform matches
    Object.entries(patterns.platform).forEach(([key, value]) => {
      if (message.includes(key)) {
        parameters.platform = value;
        confidence += 0.2;
        matchCount++;
      }
    });

    // Check for audience matches
    Object.entries(patterns.audience).forEach(([key, value]) => {
      if (message.includes(key)) {
        parameters.audience = value;
        confidence += 0.2;
        matchCount++;
      }
    });

    // Intent triggers - more specific patterns
    const intentTriggers = [
      'create recipe', 'build recipe', 'make recipe', 'recipe for',
      'help me create', 'help me build', 'want to make',
      'campaign for', 'content for', 'create a', 'make a',
      'build a', 'generate a', 'help me with', 'create', 'make', 'build'
    ];

    const hasIntent = intentTriggers.some(trigger => message.includes(trigger));
    
    // Also check for specific beauty terms that indicate recipe building
    const beautyTerms = ['vanilla girl', 'glass skin', 'clean girl', 'dewy makeup', 'korean skincare', 'minimalist beauty'];
    const hasBeautyTerm = beautyTerms.some(term => message.includes(term));
    
    const shouldNavigate = (hasIntent && hasBeautyTerm) || matchCount >= 1;
    
    console.log('MCP Debug - Has Intent:', hasIntent);
    console.log('MCP Debug - Has Beauty Term:', hasBeautyTerm);
    console.log('MCP Debug - Match Count:', matchCount);
    console.log('MCP Debug - Should Navigate:', shouldNavigate);

    if (shouldNavigate) {
      confidence = Math.min(confidence + 0.3, 1.0);
    }

    return {
      shouldNavigate,
      parameters,
      confidence,
      matchCount
    };
  }

  private detectVideoIntents(message: string) {
    const videoTriggers = [
      'create video', 'make video', 'generate video', 'video with',
      'film', 'record', 'shoot video', 'video featuring'
    ];

    const hasVideoIntent = videoTriggers.some(trigger => message.includes(trigger));
    
    if (!hasVideoIntent) {
      return { shouldGenerate: false, parameters: {}, requirements: '', confidence: 0 };
    }

    // Extract video requirements from message
    const requirements = this.extractVideoRequirements(message);
    const recipeParams = this.detectRecipeIntents(message);

    return {
      shouldGenerate: true,
      parameters: recipeParams.parameters,
      requirements,
      confidence: 0.8
    };
  }

  private extractVideoRequirements(message: string): string {
    // Extract specific requirements from the message
    const requirements: string[] = [];

    // Style requirements
    if (message.includes('aesthetic') || message.includes('dreamy')) {
      requirements.push('Aesthetic style with soft, dreamy lighting');
    }
    if (message.includes('natural') || message.includes('minimal')) {
      requirements.push('Natural, minimal makeup look');
    }
    if (message.includes('bright') || message.includes('well-lit')) {
      requirements.push('Bright, well-lit setting');
    }

    // Duration requirements
    if (message.includes('short') || message.includes('15') || message.includes('30')) {
      requirements.push('Keep video short (15-30 seconds)');
    }
    if (message.includes('long') || message.includes('detailed')) {
      requirements.push('Detailed, longer format video');
    }

    // Creator requirements
    if (message.includes('female') || message.includes('girl') || message.includes('woman')) {
      requirements.push('Feature female creator');
    }
    if (message.includes('young') || message.includes('20s')) {
      requirements.push('Young creator in their 20s');
    }

    // Setting requirements
    if (message.includes('bedroom') || message.includes('room')) {
      requirements.push('Bedroom or indoor setting');
    }
    if (message.includes('bathroom') || message.includes('mirror')) {
      requirements.push('Bathroom or mirror setting');
    }

    return requirements.length > 0 ? requirements.join('\n') : 'Create engaging video based on recipe parameters';
  }

  private detectGenerationIntent(message: string): boolean {
    const generationTriggers = [
      'generate prediction', 'predict', 'score', 'success rate',
      'how well', 'performance', 'generate', 'calculate'
    ];

    return generationTriggers.some(trigger => message.includes(trigger));
  }

  private generateContextualResponse(message: string, currentPage: string): string {
    const lowerMessage = message.toLowerCase();

    // Trend-related responses
    if (lowerMessage.includes('trend') || lowerMessage.includes('trending')) {
      return "Based on our latest analysis, #VanillaGirl is currently trending with 89% growth in Malaysia! It's perfect for creating natural, effortless beauty content. Would you like me to help you build a recipe using this trend?";
    }

    // Beauty-related responses
    if (lowerMessage.includes('beauty') || lowerMessage.includes('makeup') || lowerMessage.includes('skincare')) {
      return "The beauty landscape is evolving towards more natural, authentic content. Glass skin and vanilla girl aesthetics are dominating social media. I can help you create campaigns that tap into these trends - just let me know what you're looking for!";
    }

    // Platform-specific responses
    if (lowerMessage.includes('tiktok')) {
      return "TikTok is perfect for short-form beauty content! The platform loves authentic tutorials and trending audio. Vanilla Girl content performs exceptionally well there. Want me to create a TikTok-optimized recipe for you?";
    }

    if (lowerMessage.includes('instagram')) {
      return "Instagram Reels are great for polished beauty content! Glass skin tutorials and aesthetic makeup looks perform really well. I can help you build a recipe specifically optimized for Instagram's algorithm.";
    }

    // Default helpful response
    return "I'm here to help you create successful beauty campaigns! I can analyze trends, build recipes, generate predictions, and even help create video content. What would you like to explore?";
  }

  // Get trending recommendations based on current data
  getTrendingRecommendations(): RecipeParameters {
    return {
      audio: 'audio_2', // Aesthetic - currently trending
      keyword: 'kw_2', // Vanilla Girl - 89% growth
      platform: 'TikTok', // Best performing platform
      audience: 'Gen Z' // Primary demographic
    };
  }

  // Format parameters for URL navigation
  formatNavigationParams(parameters: RecipeParameters): string {
    const params = new URLSearchParams();
    
    if (parameters.audio) params.set('audio', parameters.audio);
    if (parameters.keyword) params.set('keyword', parameters.keyword);
    if (parameters.platform) params.set('platform', parameters.platform);
    if (parameters.audience) params.set('audience', parameters.audience);
    
    return params.toString();
  }

  // Conversation flow methods
  private getConversationState(previousMessages: string[]): ConversationState | null {
    if (previousMessages.length < 2) return null;
    
    // Look for conversation state markers in previous messages
    const lastAIMessage = previousMessages[previousMessages.length - 1];
    if (!lastAIMessage) return null;

    // Check if we're waiting for platform
    if (lastAIMessage.includes('Which platform') || lastAIMessage.includes('platform would you like') || lastAIMessage.includes('platform should I optimize')) {
      return {
        waitingFor: 'platform',
        collectedParams: this.extractParamsFromHistory(previousMessages),
        originalIntent: lastAIMessage.includes('video') ? 'video' : 'recipe',
        step: 1
      };
    }

    // Check if we're waiting for audience
    if (lastAIMessage.includes('target audience') || lastAIMessage.includes('audience would you like')) {
      return {
        waitingFor: 'audience',
        collectedParams: this.extractParamsFromHistory(previousMessages),
        originalIntent: lastAIMessage.includes('video') ? 'video' : 'recipe',
        step: 2
      };
    }

    return null;
  }

  private extractParamsFromHistory(messages: string[]): RecipeParameters {
    const params: RecipeParameters = {};
    
    // Extract from conversation history
    const fullHistory = messages.join(' ').toLowerCase();
    
    // Extract keyword from original request
    Object.entries({
      'vanilla girl': 'kw_2',
      'glass skin': 'kw_1',
      'clean girl': 'kw_3',
      'korean skincare': 'kw_4',
      'dewy makeup': 'kw_5',
      'minimalist beauty': 'kw_6'
    }).forEach(([key, value]) => {
      if (fullHistory.includes(key)) {
        params.keyword = value;
      }
    });

    // Extract audio from history
    Object.entries({
      'aesthetic': 'audio_2',
      'oh no': 'audio_1',
      'viral': 'audio_1',
      'trending audio': 'audio_2',
      'glowing up': 'audio_3',
      'skincare routine': 'audio_4',
      'makeup transformation': 'audio_5'
    }).forEach(([key, value]) => {
      if (fullHistory.includes(key)) {
        params.audio = value;
      }
    });

    // Extract platform from history
    Object.entries({
      'tiktok': 'TikTok',
      'instagram': 'Instagram',
      'youtube': 'YouTube',
      'reels': 'Instagram',
      'shorts': 'YouTube'
    }).forEach(([key, value]) => {
      if (fullHistory.includes(key)) {
        params.platform = value;
      }
    });

    // Extract audience from history
    Object.entries({
      'gen z': 'Gen Z',
      'millennials': 'Millennials',
      'young': 'Gen Z',
      'teens': 'Gen Z',
      'adults': 'Millennials',
      'all': 'All'
    }).forEach(([key, value]) => {
      if (fullHistory.includes(key)) {
        params.audience = value;
      }
    });

    return params;
  }

  private startRecipeConversation(recipeIntents: any): MCPResponse {
    const { parameters } = recipeIntents;
    
    // Auto-select trending audio if not specified
    if (!parameters.audio) {
      parameters.audio = 'audio_2'; // Default to Aesthetic
    }

    // For testing - if it's a simple "vanilla girl recipe" request, use defaults
    if (parameters.keyword === 'kw_2' && !parameters.platform && !parameters.audience) {
      return {
        action: 'navigate',
        parameters: { 
          ...parameters, 
          platform: 'TikTok', 
          audience: 'Gen Z',
          action: 'generate' 
        },
        message: `Perfect! Creating your ${this.getKeywordName(parameters.keyword)} recipe with optimal settings for TikTok and Gen Z audience. Generating prediction now! 🚀`,
        confidence: 0.95
      };
    }

    // Determine what we still need to ask
    const missing = [];
    if (!parameters.platform) missing.push('platform');
    if (!parameters.audience) missing.push('audience');

    if (missing.length === 0) {
      // We have everything, navigate and generate
      return {
        action: 'navigate',
        parameters: { ...parameters, action: 'generate' },
        message: `Perfect! I have all the details. Creating your ${this.getKeywordName(parameters.keyword)} recipe for ${parameters.platform} targeting ${parameters.audience}. Generating prediction now!`,
        confidence: 0.95
      };
    }

    // Ask for the first missing parameter
    if (missing.includes('platform')) {
      return {
        action: 'ask_question',
        parameters,
        message: `Great! I'll help you create a ${this.getKeywordName(parameters.keyword)} recipe with ${this.getAudioName(parameters.audio)} audio. Which platform would you like to target?\n\n• TikTok (short-form, viral content)\n• Instagram (polished, aesthetic content)\n• YouTube (longer tutorials)`,
        confidence: 0.9,
        conversationState: {
          waitingFor: 'platform',
          collectedParams: parameters,
          originalIntent: 'recipe',
          step: 1
        }
      };
    }

    if (missing.includes('audience')) {
      return {
        action: 'ask_question',
        parameters,
        message: `Excellent choice! Now, what target audience would you like to focus on?\n\n• Gen Z (18-24) - loves authentic, trendy content\n• Millennials (25-40) - prefers polished, informative content\n• All Ages - broader appeal`,
        confidence: 0.9,
        conversationState: {
          waitingFor: 'audience',
          collectedParams: parameters,
          originalIntent: 'recipe',
          step: 2
        }
      };
    }

    return {
      action: 'respond',
      message: 'Something went wrong with the recipe conversation flow.',
      confidence: 0.3
    };
  }

  private startVideoConversation(videoIntents: any): MCPResponse {
    const { parameters } = videoIntents;
    
    // Auto-select trending audio if not specified
    if (!parameters.audio) {
      parameters.audio = 'audio_2'; // Default to Aesthetic
    }

    // For video, we need all parameters
    const missing = [];
    if (!parameters.platform) missing.push('platform');
    if (!parameters.audience) missing.push('audience');

    if (missing.length === 0) {
      // We have everything, create video
      return {
        action: 'video_generate',
        parameters: { ...parameters, action: 'video' },
        message: `Perfect! Creating your ${this.getKeywordName(parameters.keyword)} video for ${parameters.platform} targeting ${parameters.audience}!`,
        confidence: 0.95
      };
    }

    // Ask for platform first
    if (missing.includes('platform')) {
      return {
        action: 'ask_question',
        parameters,
        message: `I'll create a ${this.getKeywordName(parameters.keyword)} video with ${this.getAudioName(parameters.audio)} audio! Which platform should I optimize it for?\n\n• TikTok (vertical, 15-60s)\n• Instagram (square/vertical, stories/reels)\n• YouTube (horizontal, longer format)`,
        confidence: 0.9,
        conversationState: {
          waitingFor: 'platform',
          collectedParams: parameters,
          originalIntent: 'video',
          step: 1
        }
      };
    }

    return {
      action: 'respond',
      message: 'Something went wrong with the video conversation flow.',
      confidence: 0.3
    };
  }

  private handleConversationResponse(message: string, state: ConversationState): MCPResponse {
    const lowerMessage = message.toLowerCase();
    let updatedParams = { ...state.collectedParams };

    if (state.waitingFor === 'platform') {
      // Extract platform from response
      if (lowerMessage.includes('tiktok')) {
        updatedParams.platform = 'TikTok';
      } else if (lowerMessage.includes('instagram')) {
        updatedParams.platform = 'Instagram';
      } else if (lowerMessage.includes('youtube')) {
        updatedParams.platform = 'YouTube';
      } else {
        return {
          action: 'ask_question',
          message: `I didn't catch that. Please choose one of these platforms:\n\n• TikTok\n• Instagram\n• YouTube`,
          confidence: 0.5,
          conversationState: state
        };
      }

      // Now ask for audience
      return {
        action: 'ask_question',
        parameters: updatedParams,
        message: `Great choice! ${updatedParams.platform} it is. Now, what target audience would you like to focus on?\n\n• Gen Z (18-24)\n• Millennials (25-40)\n• All Ages`,
        confidence: 0.9,
        conversationState: {
          ...state,
          waitingFor: 'audience',
          collectedParams: updatedParams,
          step: 2
        }
      };
    }

    if (state.waitingFor === 'audience') {
      // Extract audience from response
      if (lowerMessage.includes('gen z') || lowerMessage.includes('18') || lowerMessage.includes('young')) {
        updatedParams.audience = 'Gen Z';
      } else if (lowerMessage.includes('millennials') || lowerMessage.includes('25') || lowerMessage.includes('30')) {
        updatedParams.audience = 'Millennials';
      } else if (lowerMessage.includes('all') || lowerMessage.includes('everyone')) {
        updatedParams.audience = 'All';
      } else {
        return {
          action: 'ask_question',
          message: `Please choose your target audience:\n\n• Gen Z (18-24)\n• Millennials (25-40)\n• All Ages`,
          confidence: 0.5,
          conversationState: state
        };
      }

      // We have everything now!
      if (state.originalIntent === 'video') {
        return {
          action: 'navigate',
          parameters: { ...updatedParams, action: 'video' },
          message: `Perfect! Creating your ${this.getKeywordName(updatedParams.keyword)} video for ${updatedParams.platform} targeting ${updatedParams.audience}. Let's make some magic! 🎬✨`,
          confidence: 0.95
        };
      } else {
        return {
          action: 'navigate',
          parameters: { ...updatedParams, action: 'generate' },
          message: `Excellent! I have everything I need. Creating your ${this.getKeywordName(updatedParams.keyword)} recipe for ${updatedParams.platform} targeting ${updatedParams.audience}. Generating prediction now! 🚀`,
          confidence: 0.95
        };
      }
    }

    return {
      action: 'respond',
      message: 'Something went wrong in our conversation. Let\'s start over!',
      confidence: 0.3
    };
  }

  private getKeywordName(keywordId: string): string {
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

  private getAudioName(audioId: string): string {
    const audioMap: Record<string, string> = {
      'audio_1': 'Oh No',
      'audio_2': 'Aesthetic',
      'audio_3': 'Glowing Up',
      'audio_4': 'Skincare Routine',
      'audio_5': 'Makeup Transformation'
    };
    return audioMap[audioId] || 'trending';
  }
}

export const mcpService = MCPService.getInstance();
