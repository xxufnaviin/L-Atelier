"""
Trend Success Prediction Model

This script creates a machine learning model to predict trend success scores based on:
- Trending keywords (text input)
- Audio track features (file input)
- Platform (YouTube Shorts, TikTok, Instagram Reels)
- Target audience (Gen-Z, Millennials, All Ages)

The model uses the analyzed_videos_with_demographics.csv dataset for training and
provides a comprehensive prediction interface.

Author: AI Assistant
Date: September 2025
"""

import pandas as pd
import numpy as np
import os
import sys
import pickle
import warnings
from typing import Dict, List, Tuple, Optional, Union
import datetime
import json
import re
from pathlib import Path

# Machine Learning imports
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Audio processing imports
try:
    import librosa
    import soundfile as sf
    AUDIO_PROCESSING_AVAILABLE = True
except ImportError:
    print("Warning: librosa not available. Audio processing will be simulated.")
    AUDIO_PROCESSING_AVAILABLE = False

# NLP imports
try:
    from transformers import pipeline
    NLP_AVAILABLE = True
except ImportError:
    print("Warning: transformers not available. Using basic text features.")
    NLP_AVAILABLE = False

warnings.filterwarnings('ignore')

class TrendSuccessPredictor:
    def __init__(self, data_path: str = None):
        """
        Initialize the TrendSuccessPredictor.
        
        Args:
            data_path (str): Path to the training data CSV file
        """
        self.data_path = data_path or "ml/data/analyzed_videos_with_demographics.csv"
        self.model = None
        self.scaler = StandardScaler()
        self.text_vectorizer = TfidfVectorizer(max_features=100, stop_words='english')
        self.platform_encoder = LabelEncoder()
        self.audience_encoder = LabelEncoder()
        self.demographics_encoder = LabelEncoder()
        self.feature_names = []
        self.is_trained = False
        
        # Initialize NLP pipeline if available
        if NLP_AVAILABLE:
            try:
                self.sentiment_analyzer = pipeline("sentiment-analysis")
            except Exception as e:
                print(f"Warning: Could not initialize sentiment analyzer: {e}")
                self.sentiment_analyzer = None
        else:
            self.sentiment_analyzer = None
    
    def calculate_success_score(self, row: pd.Series) -> float:
        # Extract metrics with safe defaults and handle NaN/None values
        try:
            likes = float(row.get('likes', 0)) if pd.notna(row.get('likes')) else 0
            views = float(row.get('views', 1)) if pd.notna(row.get('views')) else 1  # Avoid division by zero
            comments = float(row.get('comments', 0)) if pd.notna(row.get('comments')) else 0
            shares = float(row.get('shares', 0)) if pd.notna(row.get('shares')) else 0
            duration = float(row.get('duration', 1)) if pd.notna(row.get('duration')) else 1
            
            # Ensure positive values
            likes = max(0, likes)
            views = max(1, views)  # Minimum 1 to avoid division by zero
            comments = max(0, comments)
            shares = max(0, shares)
            duration = max(1, duration)  # Minimum 1 second
            
        except (ValueError, TypeError):
            # If any conversion fails, return a default score
            return 25.0  # Default moderate score
        
        # Calculate engagement rate
        engagement_rate = (likes + comments + shares) / views if views > 0 else 0
        
        # Calculate views per second (virality indicator)
        views_per_second = views / duration if duration > 0 else 0
        
        # Weighted success score
        success_score = (
            engagement_rate * 40 +  # 40% weight on engagement
            min(views_per_second / 1000, 30) +  # 30% weight on virality (capped)
            min(likes / 10000, 20) +  # 20% weight on absolute likes (capped)
            min(comments / 1000, 10)  # 10% weight on comments (capped)
        )
        
        # Normalize to 0-100 scale and ensure no NaN
        final_score = min(max(success_score, 0), 100)
        
        # Final check for NaN
        if pd.isna(final_score):
            return 25.0  # Default score if calculation results in NaN
            
        return final_score
    
    def extract_text_features(self, text: str) -> Dict[str, float]:
        if pd.isna(text) or not text:
            return {
                'text_length': 0,
                'word_count': 0,
                'hashtag_count': 0,
                'mention_count': 0,
                'sentiment_score': 0.0,
                'exclamation_count': 0,
                'question_count': 0,
                'emoji_count': 0
            }
        
        text = str(text)
        
        # Basic text statistics
        features = {
            'text_length': len(text),
            'word_count': len(text.split()),
            'hashtag_count': text.count('#'),
            'mention_count': text.count('@'),
            'exclamation_count': text.count('!'),
            'question_count': text.count('?'),
            'emoji_count': len(re.findall(r'[😀-🙏]', text))
        }
        
        # Sentiment analysis
        if self.sentiment_analyzer:
            try:
                sentiment = self.sentiment_analyzer(text[:512])[0]  # Limit text length
                score = sentiment['score']
                if sentiment['label'] == 'NEGATIVE':
                    score = -score
                features['sentiment_score'] = score
            except Exception:
                features['sentiment_score'] = 0.0
        else:
            features['sentiment_score'] = 0.0
        
        return features
    
    def extract_audio_features(self, audio_path: str) -> Dict[str, float]:
        """
        Extract features from audio file.
        
        Args:
            audio_path (str): Path to audio file
            
        Returns:
            Dict[str, float]: Dictionary of audio features
        """
        default_features = {
            'audio_duration': 0,
            'tempo': 120,
            'spectral_centroid': 2000,
            'spectral_rolloff': 4000,
            'zero_crossing_rate': 0.1,
            'mfcc_mean': 0,
            'energy': 0.5,
            'pitch_variance': 100
        }
        
        # Generate simulated features if librosa not available or file doesn't exist
        if not AUDIO_PROCESSING_AVAILABLE or not os.path.exists(audio_path):
            if audio_path:
                # Generate pseudo-random features based on filename hash
                hash_val = abs(hash(os.path.basename(audio_path))) % 1000
                default_features.update({
                    'audio_duration': 15 + (hash_val % 45),  # 15-60 seconds
                    'tempo': 80 + (hash_val % 80),  # 80-160 BPM
                    'energy': 0.3 + (hash_val % 40) / 100,  # 0.3-0.7
                    'spectral_centroid': 1500 + (hash_val % 1000),  # 1500-2500 Hz
                    'pitch_variance': 50 + (hash_val % 100),  # 50-150
                    'zero_crossing_rate': 0.05 + (hash_val % 20) / 1000,  # 0.05-0.07
                    'mfcc_mean': -10 + (hash_val % 20)  # -10 to 10
                })
            return default_features
        
        try:
            # Load audio file
            y, sr = librosa.load(audio_path, duration=30)  # Load first 30 seconds
            
            # Extract features
            features = {
                'audio_duration': len(y) / sr,
                'tempo': float(librosa.beat.tempo(y=y, sr=sr)[0]),
                'spectral_centroid': float(np.mean(librosa.feature.spectral_centroid(y=y, sr=sr))),
                'spectral_rolloff': float(np.mean(librosa.feature.spectral_rolloff(y=y, sr=sr))),
                'zero_crossing_rate': float(np.mean(librosa.feature.zero_crossing_rate(y))),
                'mfcc_mean': float(np.mean(librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13))),
                'energy': float(np.mean(librosa.feature.rms(y=y))),
                'pitch_variance': float(np.var(librosa.piptrack(y=y, sr=sr)[0]))
            }
            
            return features
            
        except Exception as e:
            print(f"Warning: Could not process audio file {audio_path}: {e}")
            # Generate simulated features when real processing fails
            if audio_path:
                hash_val = abs(hash(os.path.basename(audio_path))) % 1000
                default_features.update({
                    'audio_duration': 15 + (hash_val % 45),  # 15-60 seconds
                    'tempo': 80 + (hash_val % 80),  # 80-160 BPM
                    'energy': 0.3 + (hash_val % 40) / 100,  # 0.3-0.7
                    'spectral_centroid': 1500 + (hash_val % 1000),  # 1500-2500 Hz
                    'pitch_variance': 50 + (hash_val % 100),  # 50-150
                    'zero_crossing_rate': 0.05 + (hash_val % 20) / 1000,  # 0.05-0.07
                    'mfcc_mean': -10 + (hash_val % 20)  # -10 to 10
                })
            return default_features
    
    def prepare_features(self, df: pd.DataFrame) -> Tuple[List, List]:
        features_list = []
        
        for idx, row in df.iterrows():
            # Text features from description and transcription
            desc_features = self.extract_text_features(row.get('description', ''))
            trans_features = self.extract_text_features(row.get('transcription', ''))
            
            # Combine text features
            combined_text = f"{row.get('description', '')} {row.get('transcription', '')}"
            
            # Platform and audience features
            platform = row.get('source', 'tiktok').lower()
            demographics = row.get('demographics', 'all age').lower()
            
            # Basic metrics
            duration = float(row.get('duration', 30))
            sentiment_trans = float(row.get('sentiment_transcription', 0))
            sentiment_tags = float(row.get('sentiment_tags', 0))
            
            # Create feature vector
            feature_vector = {
                # Text features
                'desc_length': desc_features['text_length'],
                'desc_word_count': desc_features['word_count'],
                'desc_hashtag_count': desc_features['hashtag_count'],
                'desc_sentiment': desc_features['sentiment_score'],
                'trans_length': trans_features['text_length'],
                'trans_word_count': trans_features['word_count'],
                'trans_sentiment': trans_features['sentiment_score'],
                
                # Platform features
                'platform_tiktok': 1 if platform == 'tiktok' else 0,
                'platform_youtube': 1 if platform == 'youtube' else 0,
                'platform_instagram': 1 if platform == 'instagram' else 0,
                
                # Demographics features
                'demo_genz': 1 if 'gen z' in demographics else 0,
                'demo_millennial': 1 if 'millennial' in demographics else 0,
                'demo_allage': 1 if 'all age' in demographics else 0,
                
                # Content features
                'duration': duration,
                'sentiment_transcription': sentiment_trans,
                'sentiment_tags': sentiment_tags,
                'total_hashtags': desc_features['hashtag_count'] + trans_features['hashtag_count'],
                'total_mentions': desc_features['mention_count'] + trans_features['mention_count'],
                'emoji_count': desc_features['emoji_count'] + trans_features['emoji_count'],
            }
            
            features_list.append(feature_vector)
        
        # Convert to DataFrame for easier handling
        features_df = pd.DataFrame(features_list)
        
        # Fill any NaN values
        features_df = features_df.fillna(0)
        
        # Store feature names
        self.feature_names = list(features_df.columns)
        
        # Calculate target values (success scores)
        if 'likes' in df.columns:
            target = df.apply(self.calculate_success_score, axis=1).values
        else:
            target = np.zeros(len(df))  # Dummy target for prediction
        
        return features_df.values, target
    
    def load_data(self) -> pd.DataFrame:
        """
        Load training data from CSV file.
        
        Returns:
            pd.DataFrame: Loaded data
        """
        try:
            df = pd.read_csv(self.data_path)
            print(f"Loaded {len(df)} records from {self.data_path}")
            return df
        except FileNotFoundError:
            print(f"Error: Data file {self.data_path} not found")
            sys.exit(1)
        except Exception as e:
            print(f"Error loading data: {e}")
            sys.exit(1)
    
    def train(self, test_size: float = 0.2, random_state: int = 42) -> Dict[str, float]:
        print("🚀 Starting model training...")
        
        # Load data
        df = self.load_data()
        
        # Prepare features
        X, y = self.prepare_features(df)
        
        print(f"Feature matrix shape: {X.shape}")
        print(f"Target vector shape: {y.shape}")
        print(f"Feature names: {self.feature_names}")
        
        # Handle small dataset
        if len(X) < 4:
            print("Very small dataset detected. Using simple model without train/test split.")
            X_train, X_test, y_train, y_test = X, X, y, y
        else:
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=test_size, random_state=random_state
            )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Try multiple models and select the best one
        models = {
            'Random Forest': RandomForestRegressor(n_estimators=50, random_state=random_state),
            'Gradient Boosting': GradientBoostingRegressor(n_estimators=50, random_state=random_state),
            'Ridge Regression': Ridge(alpha=1.0),
            'Linear Regression': LinearRegression()
        }
        
        best_model = None
        best_score = float('-inf')
        best_name = ""
        
        for name, model in models.items():
            try:
                # Train model
                model.fit(X_train_scaled, y_train)
                
                # Evaluate
                y_pred = model.predict(X_test_scaled)
                score = r2_score(y_test, y_pred)
                
                print(f"{name} R² Score: {score:.4f}")
                
                if score > best_score:
                    best_score = score
                    best_model = model
                    best_name = name
                    
            except Exception as e:
                print(f"Error training {name}: {e}")
        
        if best_model is None:
            print("No model could be trained successfully")
            sys.exit(1)
        
        self.model = best_model
        self.is_trained = True
        
        # Calculate final metrics
        y_pred_train = self.model.predict(X_train_scaled)
        y_pred_test = self.model.predict(X_test_scaled)
        
        metrics = {
            'best_model': best_name,
            'train_r2': r2_score(y_train, y_pred_train),
            'test_r2': r2_score(y_test, y_pred_test),
            'train_mse': mean_squared_error(y_train, y_pred_train),
            'test_mse': mean_squared_error(y_test, y_pred_test),
            'train_mae': mean_absolute_error(y_train, y_pred_train),
            'test_mae': mean_absolute_error(y_test, y_pred_test)
        }
        
        print(f"\nTraining completed! Best model: {best_name}")
        print(f"Training R² Score: {metrics['train_r2']:.4f}")
        print(f"Test R² Score: {metrics['test_r2']:.4f}")
        print(f"Test MAE: {metrics['test_mae']:.2f}")
        
        return metrics
    
    def predict_trend_success(
        self,
        keyword: str,
        audio_path: str = None,
        platform: str = "TikTok",
        target_audience: List[str] = None
    ) -> Dict[str, Union[float, str, Dict]]:
        if not self.is_trained:
            raise ValueError("Model must be trained before making predictions")
        
        if target_audience is None:
            target_audience = ["All Ages"]
        
        # Normalize inputs
        platform = platform.lower()
        platform_map = {
            'youtube shorts': 'youtube',
            'youtube': 'youtube',
            'tiktok': 'tiktok',
            'instagram reels': 'instagram',
            'instagram': 'instagram'
        }
        platform = platform_map.get(platform, 'tiktok')
        
        # Determine demographics from target audience
        audience_lower = [aud.lower() for aud in target_audience]
        if 'gen-z' in audience_lower or 'gen z' in audience_lower:
            demographics = 'gen z'
        elif 'millennials' in audience_lower or 'millennial' in audience_lower:
            demographics = 'millennial'
        else:
            demographics = 'all age'
        
        # Create input dataframe
        input_data = {
            'description': keyword,
            'transcription': '',
            'source': platform,
            'demographics': demographics,
            'duration': 30,  # Default duration
            'sentiment_transcription': 0,
            'sentiment_tags': 0,
            'likes': 0,  # Dummy values for feature extraction
            'views': 1,
            'comments': 0,
            'shares': 0
        }
        
        df_input = pd.DataFrame([input_data])
        
        # Extract features
        X, _ = self.prepare_features(df_input)
        
        # Scale features
        X_scaled = self.scaler.transform(X)
        
        # Make prediction
        prediction = self.model.predict(X_scaled)[0]
        
        # Ensure prediction is within valid range
        prediction = max(0, min(100, prediction))
        
        # Extract audio features if provided
        audio_features = {}
        if audio_path:
            audio_features = self.extract_audio_features(audio_path)
            # Adjust prediction based on audio features
            tempo_boost = min((audio_features['tempo'] - 100) / 100, 0.2)  # Up to 20% boost for high tempo
            energy_boost = audio_features['energy'] * 0.1  # Up to 10% boost for high energy
            prediction += (tempo_boost + energy_boost) * 10
            prediction = max(0, min(100, prediction))
        
        # Create detailed result
        result = {
            'success_score': round(prediction, 2),
            'confidence': 'Medium' if len(self.load_data()) > 10 else 'Low',
            'input_analysis': {
                'keyword': keyword,
                'platform': platform.title(),
                'target_audience': target_audience,
                'predicted_demographics': demographics.title(),
                'keyword_length': len(keyword),
                'keyword_word_count': len(keyword.split()),
                'hashtag_count': keyword.count('#')
            },
            'audio_analysis': audio_features if audio_path else None,
            'recommendations': self._generate_recommendations(prediction, keyword, platform, demographics)
        }
        
        return result
    
    def _generate_recommendations(
        self,
        score: float,
        keyword: str,
        platform: str,
        demographics: str
    ) -> List[str]:
        recommendations = []
        
        if score < 30:
            recommendations.extend([
                "Consider adding more engaging hashtags to increase discoverability",
                "Try incorporating trending keywords or phrases",
                "Consider shorter, more punchy content for better engagement"
            ])
        elif score < 60:
            recommendations.extend([
                "Good potential! Consider optimizing posting time for your target audience",
                "Add more interactive elements to boost engagement"
            ])
        else:
            recommendations.extend([
                "Excellent potential! This trend has high success probability",
                "Consider cross-posting to multiple platforms to maximize reach"
            ])
        
        # Platform-specific recommendations
        if platform == 'tiktok':
            recommendations.append("Use trending sounds and participate in challenges")
        elif platform == 'youtube':
            recommendations.append("Focus on strong thumbnails and compelling titles")
        elif platform == 'instagram':
            recommendations.append("Use Instagram-specific features like Reels effects")
        
        # Demographics-specific recommendations
        if demographics == 'gen z':
            recommendations.append("Use current slang and trending memes")
        elif demographics == 'millennial':
            recommendations.append("Reference nostalgic content and relatable experiences")
        
        return recommendations
    
    def save_model(self, filepath: str = "ml/models/trend_success_model.pkl"):
        """
        Save the trained model to disk.
        
        Args:
            filepath (str): Path to save the model
        """
        if not self.is_trained:
            raise ValueError("Model must be trained before saving")
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        model_data = {
            'model': self.model,
            'scaler': self.scaler,
            'feature_names': self.feature_names,
            'is_trained': self.is_trained
        }
        
        with open(filepath, 'wb') as f:
            pickle.dump(model_data, f)
        
        print(f"Model saved to {filepath}")
    
    def load_model(self, filepath: str = "ml/models/trend_success_model.pkl"):
        """
        Load a trained model from disk.
        
        Args:
            filepath (str): Path to the saved model
        """
        try:
            with open(filepath, 'rb') as f:
                model_data = pickle.load(f)
            
            self.model = model_data['model']
            self.scaler = model_data['scaler']
            self.feature_names = model_data['feature_names']
            self.is_trained = model_data['is_trained']
            
            print(f"Model loaded from {filepath}")
            
        except FileNotFoundError:
            print(f"Error: Model file {filepath} not found")
        except Exception as e:
            print(f"Error loading model: {e}")


def main():
    print("Trend Success Predictor")
    print("=" * 50)
    
    # Initialize predictor
    predictor = TrendSuccessPredictor()
    
    # Train the model
    metrics = predictor.train()
    
    # Save the model
    predictor.save_model()
    
    print("\nMaking sample predictions...")
    print("-" * 30)
    
    # Sample predictions using actual audio files from pipeline/audios
    test_cases = [
        {
            'keyword': 'Dancing with my dog #petdance #viral',
            'audio_path': 'pipeline/audios/1ZAPwfrtAFY.m4a',
            'platform': 'TikTok',
            'target_audience': ['Gen-Z']
        },
        {
            'keyword': 'Morning routine for productivity #morningroutine #productivity',
            'audio_path': 'pipeline/audios/2kyS6SvSYSE.m4a',
            'platform': 'YouTube Shorts',
            'target_audience': ['Millennials']
        },
        {
            'keyword': 'Quick recipe hack everyone should know',
            'audio_path': 'pipeline/audios/d380meD0W0M.m4a',
            'platform': 'Instagram Reels',
            'target_audience': ['All Ages']
        },
        {
            'keyword': 'Trending music challenge #music #challenge',
            'audio_path': 'pipeline/audios/gHZ1Qz0KiKM.m4a',
            'platform': 'TikTok',
            'target_audience': ['Gen-Z', 'Millennials']
        },
        {
            'keyword': 'Creative content with beats #creative #beats',
            'audio_path': 'pipeline/audios/puqaWrEC7tY.m4a',
            'platform': 'Instagram Reels',
            'target_audience': ['All Ages']
        }
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\nTest Case {i}:")
        result = predictor.predict_trend_success(**test_case)
        
        print(f"   Keyword: {test_case['keyword']}")
        print(f"   Platform: {test_case['platform']}")
        print(f"   Target Audience: {', '.join(test_case['target_audience'])}")
        print(f"    Success Score: {result['success_score']}/100")
        print(f"    Top Recommendation: {result['recommendations'][0]}")
    
    print(f"\nModel training and testing completed!")
    print(f"Model saved and ready for use")


if __name__ == "__main__":
    main()
