import os
import pandas as pd
import yt_dlp as youtube_dl
import whisper
from datetime import datetime
import numpy as np

# Constants
TIKTOK_CSV = "data/tiktok_collected_liked_videos.csv"
YOUTUBE_CSV = "data/USvideos.csv"
AUDIO_DIR = "audios"
OUTPUT_DIR = "../ml/data"  # Changed output directory

# Ensure directories exist
os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

def extract_hashtags(text):
    """Extract hashtags from text"""
    if pd.isna(text):
        return []
    return [tag.strip() for tag in str(text).split() if tag.startswith('#')]

def load_tiktok():
    """Load and process TikTok data"""
    df = pd.read_csv(TIKTOK_CSV, nrows=5)
    
    # Select and rename relevant columns
    tiktok_columns = {
        'user_name': 'creator',
        'video_id': 'video_id',
        'video_desc': 'description',
        'video_time': 'publish_time',
        'video_length': 'duration',
        'video_link': 'url',
        'n_likes': 'likes',
        'n_shares': 'shares',
        'n_comments': 'comments',
        'n_plays': 'views'
    }
    
    df = df[tiktok_columns.keys()].rename(columns=tiktok_columns)
    df['source'] = 'tiktok'
    df['transcription'] = None
    
    # Extract hashtags from description
    df['tags'] = df['description'].apply(extract_hashtags)
    
    # Convert Unix timestamp to datetime
    df['publish_time'] = pd.to_datetime(df['publish_time'], unit='s', utc=True)
    
    return df

def load_youtube():
    """Load and process YouTube data"""
    df = pd.read_csv(YOUTUBE_CSV, nrows=5)
    
    # Select and rename relevant columns
    youtube_columns = {
        'video_id': 'video_id',
        'title': 'description',
        'channel_title': 'creator',
        'publish_time': 'publish_time',
        'views': 'views',
        'likes': 'likes',
        'comment_count': 'comments',
        'tags': 'tags'
    }
    
    df = df[youtube_columns.keys()].rename(columns=youtube_columns)
    
    # Convert YouTube tags from string to list
    df['tags'] = df['tags'].apply(lambda x: [] if pd.isna(x) else str(x).split('|'))
    
    df['shares'] = np.nan
    df['source'] = 'youtube'
    df['url'] = 'https://youtube.com/watch?v=' + df['video_id']
    df['duration'] = None
    
    # Convert publish_time to datetime
    df['publish_time'] = pd.to_datetime(df['publish_time'])
    
    return df

def get_video_info(url: str):
    """Get video information using yt-dlp"""
    ydl_opts = {
        "format": "bestaudio/best",
        "noplaylist": True,
        "quiet": True
    }
    
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        try:
            result = ydl.extract_info(url, download=False)
            return result
        except:
            return None

def process_youtube_metadata(df):
    """Add duration and transcription to YouTube videos"""
    model = whisper.load_model("base")
    
    def process_single_video(row):
        info = get_video_info(row['url'])
        if info:
            row['duration'] = info.get('duration', None)
            try:
                audio_path = f"{AUDIO_DIR}/{row['video_id']}.m4a"
                if not os.path.exists(audio_path):
                    ydl_opts = {
                        "format": "bestaudio/best",
                        "outtmpl": audio_path,
                        "quiet": True
                    }
                    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                        ydl.download([row['url']])
                
                if os.path.exists(audio_path):
                    result = model.transcribe(audio_path, fp16=False)
                    row['transcription'] = result["text"]
            except:
                row['transcription'] = None
        return row
    
    return df.apply(process_single_video, axis=1)

def main():
    # Load data
    print("Loading TikTok data...")
    tiktok_df = load_tiktok()
    
    print("Loading YouTube data...")
    youtube_df = load_youtube()
    
    print("Processing YouTube metadata...")
    youtube_df = process_youtube_metadata(youtube_df)
    
    # Combine datasets
    combined_df = pd.concat([tiktok_df, youtube_df], ignore_index=True)
    
    # Ensure consistent column order
    final_columns = [
        'video_id',
        'creator',
        'description',
        'publish_time',
        'duration',
        'url',
        'likes',
        'shares',
        'comments',
        'views',
        'source',
        'transcription',
        'tags'
    ]
    
    combined_df = combined_df[final_columns]
    
    # Save combined data
    output_path = os.path.join(OUTPUT_DIR, "combined_videos.csv")
    combined_df.to_csv(output_path, index=False)
    print(f"Combined data saved to {output_path}")
    
    # Update BigQuery schema template
    '''
    from google.cloud import bigquery

    job_config = bigquery.LoadJobConfig(
        schema=[
            bigquery.SchemaField("tags", "STRING", mode="REPEATED"),
            bigquery.SchemaField("video_id", "STRING"),
            bigquery.SchemaField("creator", "STRING"),
            bigquery.SchemaField("description", "STRING"),
            bigquery.SchemaField("publish_time", "TIMESTAMP"),
            bigquery.SchemaField("duration", "INTEGER"),
            bigquery.SchemaField("url", "STRING"),
            bigquery.SchemaField("likes", "INTEGER"),
            bigquery.SchemaField("shares", "INTEGER"),
            bigquery.SchemaField("comments", "INTEGER"),
            bigquery.SchemaField("views", "INTEGER"),
            bigquery.SchemaField("source", "STRING"),
            bigquery.SchemaField("transcription", "STRING"),
        ]
    )
    
    job = client.load_table_from_dataframe(combined_df, table_id, job_config=job_config)
    job.result()
    '''

if __name__ == "__main__":
    main()