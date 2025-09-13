import os
import pandas as pd
import yt_dlp as youtube_dl
import whisper
from datetime import datetime
import numpy as np
from dotenv import load_dotenv
from google.cloud import bigquery
import sys

sys.path.append(".")
from ml.sentiment_analysis import main as tag_videos
from ml.demographics_analysis import main as get_demographics

load_dotenv()

# Constants
TIKTOK_CSV = "pipeline/data/tiktok_collected_liked_videos.csv"
YOUTUBE_CSV = "pipeline/data/USvideos.csv"
AUDIO_DIR = "pipeline/audios"
OUTPUT_DIR = "ml/data"

# Ensure directories exist
os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

client = bigquery.Client.from_service_account_json(os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))

def extract_hashtags(text):
    """Extract hashtags from text"""
    if pd.isna(text):
        return []
    return [tag.strip() for tag in str(text).split() if tag.startswith('#')]

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

def extract():
    """Extract data from sources"""
    # Load TikTok data
    tiktok_df = pd.read_csv(TIKTOK_CSV, nrows=5)
    
    # Load YouTube data
    youtube_df = pd.read_csv(YOUTUBE_CSV, nrows=1)
    
    return tiktok_df, youtube_df

def transform(tiktok_df, youtube_df):
    """Transform extracted data"""
    # Transform TikTok data
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
    
    tiktok_df = tiktok_df[tiktok_columns.keys()].rename(columns=tiktok_columns)
    tiktok_df['source'] = 'tiktok'
    tiktok_df['transcription'] = None
    tiktok_df['tags'] = tiktok_df['description'].apply(extract_hashtags)
    tiktok_df['publish_time'] = pd.to_datetime(tiktok_df['publish_time'], unit='s', utc=True)

    # Transform YouTube data
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
    
    youtube_df = youtube_df[youtube_columns.keys()].rename(columns=youtube_columns)
    youtube_df['tags'] = youtube_df['tags'].apply(lambda x: [] if pd.isna(x) else str(x).split('|'))
    youtube_df['shares'] = np.nan
    youtube_df['source'] = 'youtube'
    youtube_df['url'] = 'https://youtube.com/watch?v=' + youtube_df['video_id']
    youtube_df['publish_time'] = pd.to_datetime(youtube_df['publish_time'])

    # Process YouTube metadata
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
    
    youtube_df = youtube_df.apply(process_single_video, axis=1)

    # Combine datasets
    combined_df = pd.concat([tiktok_df, youtube_df], ignore_index=True)
    
    # Ensure consistent column order
    final_columns = [
        'video_id', 'creator', 'description', 'publish_time', 'duration',
        'url', 'likes', 'shares', 'comments', 'views', 'source',
        'transcription', 'tags'
    ]
    
    return combined_df[final_columns]

def load(df, dataset_id="analyzed_data", table_id="trends"):
    """Load data into BigQuery"""
    # Tag videos with sentiment
    df = tag_videos(df)

    # Get demographics
    df = get_demographics(df)
    
    output_path = "ml/data/analyzed_videos_with_demographics.csv"
    df.to_csv(output_path, index=False)
    print(f"Combined data saved to {output_path}")

    # Ensure dataset exists
    dataset_ref = f"{client.project}.{dataset_id}"
    try:
        client.get_dataset(dataset_ref)
        print(f"Dataset {dataset_id} already exists.")
    except Exception:
        dataset = bigquery.Dataset(dataset_ref)
        dataset.location = "US"
        client.create_dataset(dataset)
        print(f"Created dataset {dataset_id}.")

    # Upload to BigQuery
    table_ref = client.dataset(dataset_id).table(table_id)
    job_config = bigquery.LoadJobConfig(
        source_format=bigquery.SourceFormat.CSV,
        skip_leading_rows=1,
        autodetect=True,
        write_disposition="WRITE_APPEND",
    )
    
    with open(output_path, "rb") as f:
        job = client.load_table_from_file(f, table_ref, job_config=job_config)
    job.result()
    print(f"Loaded {job.output_rows} rows into {dataset_id}:{table_id}.")

def main():
    # Extract
    print("Extracting data...")
    tiktok_df, youtube_df = extract()
    
    # Transform
    print("Transforming data...")
    combined_df = transform(tiktok_df, youtube_df)
    
    # Load
    print("Loading data...")
    load(combined_df)


if __name__ == "__main__":
    main()
