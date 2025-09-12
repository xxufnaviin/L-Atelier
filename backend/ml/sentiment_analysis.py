"""
Video Sentiment Analysis Script

This script performs sentiment analysis on video transcriptions from a CSV dataset
using VADER (Valence Aware Dictionary and sEntiment Reasoner) sentiment analyzer.

Requirements:
- pandas: for data manipulation
- nltk: for VADER sentiment analysis
- vaderSentiment: VADER sentiment analyzer

The script reads video data from 'data/combined_videos.csv', analyzes the sentiment 
of the transcription text for each video, and saves the results to 'data/analyzed_videos.csv'.
"""

import pandas as pd
import nltk
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import os
import sys

def setup_nltk():
    """
    Download required NLTK data if not already present.
    """
    try:
        # Try to download VADER lexicon if not already present
        nltk.download('vader_lexicon', quiet=True)
        print("✓ NLTK VADER lexicon ready")
    except Exception as e:
        print(f"Warning: Could not download NLTK data: {e}")
        print("VADER sentiment analysis may still work with vaderSentiment package")

def load_video_data(file_path):
    """
    Load video data from CSV file.
    
    Args:
        file_path (str): Path to the CSV file
        
    Returns:
        pd.DataFrame: Loaded video data
    """
    try:
        df = pd.read_csv(file_path)
        print(f"✓ Successfully loaded {len(df)} video records from {file_path}")
        return df
    except FileNotFoundError:
        print(f"Error: File {file_path} not found")
        sys.exit(1)
    except Exception as e:
        print(f"Error loading data: {e}")
        sys.exit(1)

def analyze_sentiment(text):
    """
    Analyze sentiment of given text using VADER sentiment analyzer.
    
    Args:
        text (str): Text to analyze
        
    Returns:
        float: Compound sentiment score (-1 to 1)
    """
    # Handle empty or NaN text
    if pd.isna(text) or text == "":
        return 0.0
    
    # Convert to string in case of non-string input
    text = str(text)
    
    # Initialize VADER sentiment analyzer
    analyzer = SentimentIntensityAnalyzer()
    
    # Get sentiment scores
    scores = analyzer.polarity_scores(text)
    
    return scores['compound']

def process_video_sentiment(df):
    """
    Process sentiment analysis for video transcriptions in the DataFrame.
    
    Args:
        df (pd.DataFrame): DataFrame containing video data
        
    Returns:
        pd.DataFrame: DataFrame with added sentiment column
    """
    
    # Create a copy of the DataFrame to avoid modifying the original
    df_processed = df.copy()
    
    # Apply sentiment analysis to the transcription column only
    df_processed['sentiment'] = df_processed['transcription'].apply(analyze_sentiment)
    
    print(f" Sentiment analysis completed for {len(df_processed)} records")
    
    # Count sentiment categories
    positive_count = (df_processed['sentiment'] > 0.05).sum()
    negative_count = (df_processed['sentiment'] < -0.05).sum()
    neutral_count = len(df_processed) - positive_count - negative_count
    
    return df_processed

def save_results(df, output_path):
    """
    Save the processed DataFrame with sentiment scores to CSV.
    
    Args:
        df (pd.DataFrame): DataFrame with sentiment scores
        output_path (str): Path to save the output CSV file
    """
    try:
        # Ensure the directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Save to CSV
        df.to_csv(output_path, index=False)
        print(f"✓ Results saved to {output_path}")
        
    except Exception as e:
        print(f"Error saving results: {e}")
        sys.exit(1)

def main(df):
    """
    Main function to orchestrate the sentiment analysis process.
    """
    # Set up paths
    # input_file = "ml/data/combined_videos.csv"  # not using anymore but passing df as params
    output_file = "ml/data/analyzed_videos.csv" # i run from root backend
    
    # Setup NLTK
    setup_nltk()
    
    # Load video data
    df = df
    
    # Check if transcription column exists
    if 'transcription' not in df.columns:
        print("Error: 'transcription' column not found in the dataset")
        print(f"Available columns: {list(df.columns)}")
        sys.exit(1)
    
    # Show info about the transcription data
    trans_count = df['transcription'].notna().sum()
    empty_trans_count = len(df) - trans_count
    
    print(f"📊 Transcription data overview:")
    print(f"   Records with transcriptions: {trans_count}/{len(df)}")
    print(f"   Records without transcriptions: {empty_trans_count}/{len(df)}")
    
    # Process sentiment analysis
    df_with_sentiment = process_video_sentiment(df)
    
    # Save results
    save_results(df_with_sentiment, output_file)
    
if __name__ == "__main__":
    main()
