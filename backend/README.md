# Backend

This directory contains the backend services for the L'Atelier project.

## Structure

The backend is organized into the following directories:

-   `ai/`: Contains AI-related utilities.
-   `airflow/`: Contains Apache Airflow DAGs for orchestrating data pipelines.
-   `api/`: Holds API-related files.
-   `audios/`: Stores audio files.
-   `bigquery/`: Contains scripts and files related to Google BigQuery.
-   `configs/`: For configuration files.
-   `mcp-server/`: A server component, likely for message passing or control.
-   `ml/`: Contains machine learning models, training scripts, and related data. This includes sentiment analysis, demographic analysis, and engagement prediction.
-   `pipeline/`: Contains data pipeline scripts for collecting and processing data from sources like TikTok and YouTube.

## Getting Started

### Prerequisites

-   Python 3.12
-   `pip` for package management

### Installation

Each module within the backend has its own `requirements.txt` file. To install the dependencies for a specific module, navigate to its directory and run:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Running the services

To run the main application, execute the `main.py` script in the `backend` directory:

```bash
python main.py
```

