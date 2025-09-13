from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
import sys

sys.path.append(".")
from pipeline.data_pipeline import extract, transform, load

# Define default arguments
default_args = {
    'owner': 'naviin',
    'depends_on_past': False,
    'start_date': datetime(2025, 9, 13),
    'email': ['naviin2373@gmail.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

# Create DAG
dag = DAG(
    dag_id= 'trendspotter_etl',
    default_args=default_args,
    description='ETL pipeline for trendspotter data',
    schedule_interval=timedelta(days=1),
    catchup=False
)

# Define tasks
def transform_wrapper(**context):
    """Wrapper function to handle XCom data passing"""
    ti = context['task_instance']
    tiktok_df, youtube_df = ti.xcom_pull(task_ids='extract_task')
    return transform(tiktok_df, youtube_df)

def load_wrapper(**context):
    """Wrapper function to handle XCom data passing"""
    ti = context['task_instance']
    combined_df = ti.xcom_pull(task_ids='transform_task')
    load(combined_df)

# Create tasks
extract_task = PythonOperator(
    task_id='extract_task',
    python_callable=extract,
    dag=dag,
)

transform_task = PythonOperator(
    task_id='transform_task',
    python_callable=transform_wrapper,
    provide_context=True,
    dag=dag,
)

load_task = PythonOperator(
    task_id='load_task',
    python_callable=load_wrapper,
    provide_context=True,
    dag=dag,
)

# Set task dependencies
extract_task >> transform_task >> load_task