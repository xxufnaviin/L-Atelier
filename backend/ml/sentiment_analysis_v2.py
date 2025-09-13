"""
Video Sentiment Analysis Script (Hugging Face version, float output)

This script performs sentiment analysis on video transcriptions and tags
using Hugging Face Transformers, returning only float sentiment values.

- Positive sentiment ≈ closer to +1
- Negative sentiment ≈ closer to -1
- Neutral sentiment ≈ around 0
"""

import pandas as pd
import os
import sys
import datetime
import numpy as np
from transformers import pipeline

# Initialize Hugging Face sentiment pipeline once
sentiment_pipeline = pipeline("sentiment-analysis")

def analyze_text_as_float(text, chunk_size: int = 512) -> float:
    """
    Analyze text sentiment and return a single float value.
    
    Args:
        text (str): Input text
        chunk_size (int): Max characters per chunk
    
    Returns:
        float: Sentiment score (-1 = very negative, +1 = very positive, 0 = neutral)
    """
    if pd.isna(text) or not text:
        return 0.0

    text = str(text)

    try:
        # Split into chunks
        chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
        results = sentiment_pipeline(chunks)

        # Map labels to signed scores
        mapped_scores = []
        for res in results:
            label = res["label"].upper()
            score = res["score"]

            if "POSITIVE" in label:
                mapped_scores.append(score)         # keep positive
            elif "NEGATIVE" in label:
                mapped_scores.append(-score)        # flip negative
            else:
                mapped_scores.append(0.0)           # neutral or other

        return float(np.mean(mapped_scores)) if mapped_scores else 0.0

    except Exception as e:
        print(f"Error analyzing text: {e}")
        return 0.0

def process_video_sentiment(df: pd.DataFrame) -> pd.DataFrame:
    """
    Process sentiment analysis for video transcriptions and tags.
    Returns only float values for sentiment columns.
    """
    df_processed = df.copy()

    # Sentiment for transcriptions
    df_processed['sentiment_transcription'] = df_processed['transcription'].apply(analyze_text_as_float)

    # Sentiment for tags
    def analyze_tags(tags):
        if isinstance(tags, list):
            return analyze_text_as_float(" ".join(tags))
        return 0.0

    df_processed['sentiment_tags'] = df_processed['tags'].apply(analyze_tags)

    print(f"✓ Sentiment analysis completed for {len(df_processed)} records")
    return df_processed

def save_results(df, output_path):
    """Save processed DataFrame with sentiment scores to CSV."""
    try:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        df.to_csv(output_path, index=False)
        print(f"✓ Results saved to {output_path}")
    except Exception as e:
        print(f"Error saving results: {e}")
        sys.exit(1)

def main(df):
    """Main function to orchestrate the sentiment analysis process."""
    output_file = "ml/data/analyzed_videos.csv"

    if 'transcription' not in df.columns:
        print("Error: 'transcription' column not found in dataset")
        print(f"Available columns: {list(df.columns)}")
        sys.exit(1)

    if 'tags' not in df.columns:
        print("Error: 'tags' column not found in dataset")
        print(f"Available columns: {list(df.columns)}")
        sys.exit(1)

    # Info about transcription data
    trans_count = df['transcription'].notna().sum()
    empty_trans_count = len(df) - trans_count

    print(f"📊 Transcription data overview:")
    print(f"   Records with transcriptions: {trans_count}/{len(df)}")
    print(f"   Records without transcriptions: {empty_trans_count}/{len(df)}")

    # Run sentiment analysis
    df_with_sentiment = process_video_sentiment(df)
    df_with_sentiment['timestamp'] = datetime.datetime.now()

    # Save results
    save_results(df_with_sentiment, output_file)

if __name__ == "__main__":
    print("⚠️ This script is meant to be imported and run with a DataFrame (not standalone).")

