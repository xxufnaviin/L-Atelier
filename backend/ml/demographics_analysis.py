"""
Demographics Analysis Script

This script performs demographic analysis on video data from 'analyzed_videos.csv'.
It adds a 'demographics' column containing inferred information like language and
potential audience age group based on the video's text content.
"""

import pandas as pd
import os
import sys
import datetime
import json

try:
    from langdetect import detect, DetectorFactory
    from langdetect.lang_detect_exception import LangDetectException
    # Seed the detector for consistent results
    DetectorFactory.seed = 0
except ImportError:
    print("Error: 'langdetect' library not found.")
    print("Please install it by running: pip install langdetect")
    sys.exit(1)

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

def analyze_demographics(row):
    """
    Analyze text from a video's data to infer demographics.
    
    Args:
        row (pd.Series): A row from the video DataFrame
        
    Returns:
        str: The inferred age group ('gen z', 'millenials', 'all age', or 'unknown')
    """
    # Combine text fields for a comprehensive analysis
    text_parts = [
        str(row.get('transcription', '')),
        str(row.get('description', '')),
        ' '.join(eval(row.get('tags', '[]')) if isinstance(row.get('tags'), str) else row.get('tags', []))
    ]
    full_text = ' '.join(filter(None, text_parts)).strip()

    if not full_text:
        return 'unknown'

    # --- Language Detection ---
    language = 'unknown'
    try:
        language = detect(full_text)
    except LangDetectException:
        # This can happen for very short or ambiguous text
        language = 'unknown'

    # --- Age Group Guessing (Heuristic-based) ---
    age_group_guess = 'all age'
    gen_z_keywords = ['lol', 'omg', 'lit', 'fam', 'bae', 'on fleek', 'vibe', 'aesthetic', 'challenge', 'dance', 'tiktok', 'no cap', 'bet', 'vibe check', 'main character', 'simp', 'stan', 'rizz', 'bussin', 'sheesh', 'slay', 'ate', 'left no crumbs']
    millennial_keywords = ['adulting', 'doggo', 'i can\'t even', 'yas', 'basic', 'squad', 'goals', 'fomo', 'avocado toast', 'side hustle', 'gig economy', 'life hack', 'business', 'finance', 'investing', 'marketing', 'tutorial', 'guide', 'conference', 'webinar']

    lower_text = full_text.lower()
    
    gen_z_score = sum(1 for keyword in gen_z_keywords if keyword in lower_text)
    millennial_score = sum(1 for keyword in millennial_keywords if keyword in lower_text)

    if gen_z_score > millennial_score:
        age_group_guess = 'gen z'
    elif millennial_score > gen_z_score:
        age_group_guess = 'millenials'
    
    return age_group_guess


def save_results(df, output_path):
    """
    Save the processed DataFrame to CSV.
    
    Args:
        df (pd.DataFrame): DataFrame with demographics column
        output_path (str): Path to save the output CSV file
    """
    try:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        df.to_csv(output_path, index=False)
        print(f"✓ Results saved to {output_path}")
    except Exception as e:
        print(f"Error saving results: {e}")
        sys.exit(1)

def main(df):
    """
    Adds a 'demographics' column to the given DataFrame.
    
    Args:
        df (pd.DataFrame): The input DataFrame.
        
    Returns:
        pd.DataFrame: The DataFrame with the 'demographics' column.
    """
    # Analyze demographics and add the new column
    print("Starting demographic analysis...")
    df['demographics'] = df.apply(analyze_demographics, axis=1)
    print("✓ Demographic analysis completed.")
    
    return df

if __name__ == "__main__":
    """
    Main function to orchestrate the demographic analysis process.
    """
    input_file = "ml/data/analyzed_videos.csv"
    output_file = "ml/data/analyzed_videos_with_demographics.csv"
    
    # Load video data
    df = load_video_data(input_file)
    
    # Analyze demographics and add the new column
    df = main(df)
    
    # Save results
    save_results(df, output_file)
    print(f"A new file has been created at {output_file} with the 'demographics' column.")
