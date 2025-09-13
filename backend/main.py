from fastapi import FastAPI
import uvicorn
from google_bigquery import main as bigqueryClient

app = FastAPI(title="Modular Backend API")

@app.get("/")
def read_root():
    """
    This is the root endpoint of the application.
    It's separate from the /api endpoint.
    """
    return {"message": "Welcome to the main backend app!"}

@app.get("/trend/analytics")
def trend_analysis():
    query = """
    SELECT json_data FROM analyzed_data.trend_analytics LIMIT 1
    """
    data = bigqueryClient.query(query)
    # print(type(data)) # dict
    return {"data":data,
            "message": "ok"}






if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)