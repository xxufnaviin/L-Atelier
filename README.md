# L'Atelier

L'Atelier is a trend analysis platform that leverages data from video platforms like TikTok and YouTube to provide insights into emerging trends. It uses a combination of data pipelines, machine learning, and a web interface to deliver real-time analytics.

## Features

-   **Trend Analysis:** Identifies trending keywords, hashtags, and audio.
-   **Engagement Prediction:** Predicts the potential engagement of a video based on its features.
-   **Sentiment Analysis:** Analyzes the sentiment of video comments and descriptions.
-   **Demographic Analysis:** Provides demographic insights into the audience of a video.
-   **Data Visualization:** A user-friendly web interface for visualizing trend data.

## Project Structure

The project is divided into two main components:

### Frontend

The `frontend/` directory contains a Next.js application that provides the user interface for the platform. It includes components for visualizing trends, analyzing video performance, and building video recipes.

-   **Framework:** Next.js
-   **Styling:** Tailwind CSS
-   **UI Components:** Shadcn UI, Radix UI
-   **Charts:** Chart.js, Recharts

### Backend

The `backend/` directory contains the backend services, including data pipelines, machine learning models, and APIs.

-   **`ai/`**: AI-related utilities.
-   **`airflow/`**: Apache Airflow DAGs for orchestrating data pipelines.
-   **`api/`**: API-related files.
-   **`audios/`**: Stores audio files.
-   **`bigquery/`**: Scripts and files related to Google BigQuery.
-   **`configs/`**: Configuration files.
-   **`mcp-server/`**: A server component, likely for message passing or control.
-   **`ml/`**: Machine learning models for sentiment analysis, demographic analysis, and engagement prediction.
-   **`pipeline/`**: Data pipeline scripts for collecting and processing data.

## Getting Started

### Frontend

To run the frontend development server:

```bash
cd frontend
npm install
npm run dev
```

### Backend

To run the backend services, refer to the `README.md` file in the `backend/` directory for detailed instructions.
